export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "image"; src: string; alt: string; caption: string };

export const caseStudies: Record<string, ContentBlock[]> = {
  "nba-matchup-predictor": [
    {
      type: "paragraph",
      text: "A personal project built to predict NBA game outcomes from historical form — and, just as importantly, to build the kind of data pipeline that doesn't quietly leak the answer into its own training set.",
    },
    { type: "heading", text: "Building a clean dataset" },
    {
      type: "paragraph",
      text: "I joined game-level and team-statistics sources into a single historical dataset covering 66,738 games, standardizing fields across sources and applying duplicate, null, range, and matchup-quality checks before any modeling started. Most of the early effort went into validation, not modeling — a plausible-looking row is worthless if the join silently duplicated a game or mismatched a team ID.",
    },
    { type: "heading", text: "Features and leakage control" },
    {
      type: "paragraph",
      text: "I engineered rolling performance windows, rest-day counts, back-to-back game flags, and home/away splits as predictors. The harder problem was temporal validation: naive random train/test splits let a model see a team's late-season form when predicting an early-season game, which inflates accuracy in a way that falls apart in production. I implemented season-based splits so the model is always trained only on information that would have actually been available at prediction time.",
    },
    { type: "heading", text: "Automation and results" },
    {
      type: "paragraph",
      text: "Data preparation, model training, resumable experiment sweeps, reporting, and matchup prediction are all automated end to end via CLI, so a new season's data can be pulled through the whole pipeline without manual intervention. I trained and compared XGBoost, CatBoost, and scikit-learn models across sweeps; the latest checkpoint reached 64.6% accuracy and a 0.684 ROC-AUC on held-out games.",
    },
    {
      type: "stats",
      items: [
        { label: "Historical games", value: "66,738" },
        { label: "Accuracy", value: "64.6%" },
        { label: "ROC-AUC", value: "0.684" },
      ],
    },
  ],

  "bank-marketing-dml": [
    {
      type: "paragraph",
      text: "A causal inference study for a course project asking a deceptively simple question: does contacting a customer again actually make them more likely to subscribe to a term deposit, or are banks just re-contacting people who were already going to say yes? I led the Double Machine Learning subgroup analysis within a larger group project on the UCI Bank Marketing dataset.",
    },
    { type: "heading", text: "The endogeneity problem" },
    {
      type: "paragraph",
      text: "Across 41,176 customer records from a Portuguese bank's 2008–2010 campaigns, the raw numbers looked dramatic: customers with prior contact subscribed at 26.65%, versus 8.83% for those without — a 17.82 percentage point gap. But this is an observational dataset, not a randomized experiment. The bank wasn't contacting customers at random; it was more likely to re-contact people who already looked like good prospects. Comparing the two groups directly conflates the effect of contact itself with pre-existing differences between who got contacted.",
    },
    { type: "heading", text: "Propensity score matching" },
    {
      type: "paragraph",
      text: "To isolate the causal effect, I matched each previously-contacted customer to an observationally similar customer who wasn't, using propensity scores estimated via logistic regression over demographics, credit history, campaign details, and macroeconomic indicators. A 1:1 nearest-neighbor match with a 0.0185 caliper retained 10,288 customers (5,144 matched pairs) — about 25% of the sample, typical for PSM under a caliper constraint — and collapsed the mean propensity score difference between groups to 0.0005.",
    },
    {
      type: "image",
      src: "/projects/bank-marketing-dml/propensity-before-after.png",
      alt: "Propensity score distributions for treatment and control groups before and after matching",
      caption:
        "Before matching, treated and control customers had visibly different propensity score distributions. After matching, the two curves are effectively identical.",
    },
    {
      type: "paragraph",
      text: "Once the groups were balanced, the apparent effect compressed sharply: from a 17.82 percentage point raw gap down to a 2.27 percentage point Average Treatment Effect on the Treated (ATT) — a 95% confidence interval of [0.67pp, 3.89pp], p = 0.0057. Most of the raw difference was selection bias, not causation.",
    },
    {
      type: "stats",
      items: [
        { label: "Raw gap (naive)", value: "17.82 pp" },
        { label: "ATT after matching", value: "2.27 pp" },
        { label: "p-value", value: "0.0057" },
      ],
    },
    { type: "heading", text: "Robustness checks" },
    {
      type: "paragraph",
      text: "Any PSM estimate depends on the caliper width chosen to enforce match quality, so I re-estimated the ATT under a tighter and a looser caliper than the baseline. All three specifications stayed statistically significant at the 1% level and clustered between 2–3 percentage points — the baseline estimate, if anything, understates the effect slightly.",
    },
    {
      type: "image",
      src: "/projects/bank-marketing-dml/robustness-check.png",
      alt: "Robustness check showing ATT estimates across tight, baseline, and loose caliper specifications, all statistically significant",
      caption:
        "ATT estimates stayed significant and clustered between 2–3 percentage points across three different caliper widths.",
    },
    { type: "heading", text: "Double ML for subgroup effects" },
    {
      type: "paragraph",
      text: "PSM gives one number for one comparison. My individual focus was extending the analysis with Double Machine Learning (DML) — both to check the PSM estimate with a completely different method, and to get at something PSM can't: how the effect of prior contact varies across customer segments, not just whether it exists on average.",
    },
    {
      type: "paragraph",
      text: "The core problem DML solves is that with many confounders (W), directly regressing the outcome (Y) on treatment (T) risks omitted-variable bias — some of what looks like a treatment effect is really just W driving both T and Y. DML handles this with orthogonalization: it trains model_y, a 200-tree random forest predicting P(Y=1 | W), and model_t, a separate 200-tree random forest predicting P(T=1 | W) — essentially a machine-learned propensity score. Both sets of predictions are then subtracted out to get residuals, Ỹ = Y − g(W) and T̃ = T − m(W). Regressing Ỹ on T̃ gives the treatment effect using only the variation in T that W can't already explain, which is the part that behaves as if it were randomly assigned. To keep this honest, the whole thing runs through 5-fold cross-fitting: model_y and model_t are trained on 4 folds and only ever predict on the held-out fifth, so no observation's residual comes from a model that has already seen its outcome.",
    },
    {
      type: "paragraph",
      text: "I excluded pdays and poutcome from the confounder set even though both are predictive — they're mechanically downstream of the treatment variable itself (you can't have a 'previous outcome' without a previous contact), so including them would leak the treatment into the controls. I did include the macroeconomic indicators (employment variation rate, consumer price index, consumer confidence index, Euribor 3-month rate), since the campaign period spans the 2008 financial crisis and omitting them had visibly distorted earlier PSM/DML runs during development.",
    },
    {
      type: "paragraph",
      text: "The overall ATE from DML came out to +1.78pp (95% CI [0.58, 2.97], p = 0.0035) — independently consistent with the PSM estimate of 2.27pp, despite the two methods handling confounding in completely different ways.",
    },
    { type: "heading", text: "Two DML models, two different jobs" },
    {
      type: "paragraph",
      text: "I used the same orthogonalized residuals to fit two different final-stage models, because a population-average effect and a per-customer effect are different questions. LinearDML regresses the residuals with an added interaction between treatment and each subgroup indicator (age band, job, education, and so on), which gives a statistically-tested ATE for every subgroup level directly. Separately, a Causal Forest of 400 honest trees estimates an Individual Treatment Effect, τ(X), for every customer individually — 'honest' meaning each tree uses one part of its data to decide where to split and a disjoint part to estimate the effect in each leaf, which stops the forest from carving out splits that look heterogeneous purely by chance. Averaging those individual τ(X) values within a subgroup is what produces the 'Mean ITE' charts below — a second, independent way of measuring the same subgroup heterogeneity that LinearDML tests directly.",
    },
    {
      type: "image",
      src: "/projects/bank-marketing-dml/subgroup-ate-forest.png",
      alt: "Forest plot of subgroup average treatment effects from LinearDML, showing which age, job, and education groups have a statistically significant response to prior contact",
      caption:
        "LinearDML's subgroup ATEs: age >50, unemployed, technician, and professional-course customers are the only groups whose confidence interval clears zero.",
    },
    {
      type: "paragraph",
      text: "Customers over 50 (+5.35pp), unemployed customers (+11.47pp), and those with professional-course education (+5.50pp) responded far more strongly to prior contact than the overall average, and — critically — their confidence intervals don't cross zero. Customers under 30, in admin or blue-collar jobs, or with only basic education showed effects statistically indistinguishable from zero: re-contacting them isn't clearly doing anything.",
    },
    {
      type: "image",
      src: "/projects/bank-marketing-dml/ite-top-bottom-modifiers.png",
      alt: "Summary chart comparing the highest-lift and lowest-lift levels of every categorical modifier, ranked by mean individual treatment effect",
      caption:
        "Highest-lift vs. lowest-lift levels across every modifier: retirees, older customers, and professional-course graduates cluster at the top; students, blue-collar workers, and cellular-only contacts cluster at the bottom.",
    },
    {
      type: "paragraph",
      text: "The Causal Forest's per-customer estimates line up with LinearDML's subgroup ATEs and add one dimension LinearDML doesn't test directly: contact channel and timing. Customers reached by telephone had more than double the mean ITE of those reached by cellular (3.89pp vs. 1.90pp), and campaigns run in June and August showed individual treatment effects several times larger than campaigns run in May or November — despite May being the highest-volume contact month in the dataset.",
    },
    {
      type: "image",
      src: "/projects/bank-marketing-dml/ite-by-month.png",
      alt: "Bar chart of mean individual treatment effect by contact month, showing June and August far above other months and May and November near zero",
      caption:
        "Mean ITE by contact month: June (+6.33pp) and August (+5.50pp) dwarf May (+0.58pp), which was also the campaign's highest-volume month.",
    },
    { type: "heading", text: "Targeting recommendation" },
    {
      type: "list",
      items: [
        "Prioritize follow-up contact for older, unemployed, and professionally-trained customer segments, where both PSM and DML agree prior contact meaningfully moves subscription likelihood.",
        "Scale back follow-up spend on segments with statistically insignificant response — the contact isn't converting them, it's just cost.",
        "Re-time high-volume campaign months: May carried the most contact volume but one of the lowest returns, while June and August delivered outsized lift on far less volume — a scheduling shift, not just a targeting one.",
        "Replace bulk re-contact campaigns with response-aware targeting, which should lower marketing spend while modestly raising conversion.",
      ],
    },
  ],

  "traveloka-cx-analysis": [
    {
      type: "paragraph",
      text: "A marketing analytics group project for Traveloka, an online travel agency that — at the time of the study — surfaced flights by price and schedule only. That creates information asymmetry: travelers can't see service quality until after they've already flown, which drives mismatched expectations and post-purchase dissonance. My individual focus was the Random Forest modeling and SHAP interpretation that turned raw review data into segment-specific recommendations.",
    },
    { type: "heading", text: "Data and descriptive patterns" },
    {
      type: "paragraph",
      text: "We integrated Skytrax's scraped airline, airport, seat, and lounge review datasets, combining quantitative sub-ratings (seat comfort, cabin staff, food & beverages, value for money) with NLP-derived sentiment scores against two outcomes: overall rating and recommendation. Value for Money turned out to be the single strongest driver of both overall rating (0.82 correlation) and recommendation (0.79) — stronger than any individual comfort or service attribute.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/airline-correlation.png",
      alt: "Heatmap of correlations between airline marketing action ratings and overall rating / recommendation outcomes",
      caption:
        "Value for Money and Ground Service correlate most strongly with both overall rating and recommendation across airlines.",
    },
    { type: "heading", text: "Segmenting travelers before, not after, the flight" },
    {
      type: "paragraph",
      text: "Clustering directly on post-flight review features risked circularity — a passenger who already had a lounge access might simply rate lounge features more favorably regardless of whether they cared about lounges going in. So we clustered on pre-booking characteristics instead: traveler type (solo, couple, family, business) and cabin class, using a CART decision tree constrained to a max depth of 3. That collapsed the 16 possible demographic combinations into 6 statistically distinct macro-segments — revealing, for instance, that families and couples across different cabin classes merge into one segment (shared logistics needs outweigh cabin-class expectations), while solo economy and solo business travelers split sharply (their expectations anchor entirely to what they paid).",
    },
    { type: "heading", text: "Random Forest as a sensitivity extractor" },
    {
      type: "paragraph",
      text: "For each of the 6 CART segments, I trained an independent Random Forest regressor (100 trees) on an 80/20 train/holdout split, testing three feature subsets per segment — all features, quantitative ratings only, and NLP sentiment only — and selected the winner by Adjusted R², which penalizes variables that don't earn their keep. NLP-only models underperformed consistently across every segment: passengers often use free text to vent about a specific gripe while still rating the flight 8/10 overall, which makes review sentiment a noisy predictor next to structured ratings. Rating-based models, by contrast, reached Adjusted R² near 0.80 for segments like Family Essentials and High-Tier Social travelers, with an average prediction error of roughly 1–1.3 stars on a 10-point scale on unseen data.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/shap-beeswarm.png",
      alt: "SHAP beeswarm plot showing Cabin Staff and Seat Comfort as the dominant drivers of predicted overall rating",
      caption:
        "SHAP values across passengers: Cabin Staff and Seat Comfort dominate the model's predictions; WiFi and inflight entertainment barely register.",
    },
    {
      type: "paragraph",
      text: "Pulling feature importances out of each segment's winning model, then applying SHAP to explain individual predictions, showed that service priorities shift substantially by segment: Cabin Staff drove 65.9% of predicted satisfaction for the Family Essentials segment, Seat Comfort drove 49.6% for Budget Corporate travelers, and Food & Beverages carried unusual weight (18.9%) for Elite Solo travelers. Across nearly every segment, low-effort amenities — WiFi, inflight entertainment, washroom cleanliness — contributed under 2% regardless of how the segment was defined.",
    },
    { type: "heading", text: "From model output to product recommendation" },
    {
      type: "list",
      items: [
        "Lead with value, not price: surface a \"Best Value\" signal rather than \"Lowest Price\" badges, since Value for Money is the strongest correlate of both satisfaction and recommendation.",
        "Emphasize physical cabin dimensions in the booking UI — seat storage, legroom, and width correlate more strongly with satisfaction than digital amenities like power outlets or seatback screens.",
        "Set realistic expectations for lounges specifically: lounges score well on individual features but have the lowest recommendation rate of the four categories (36%), suggesting a gap between marketed luxury and lived experience.",
        "Tag airlines by segment fit — e.g. \"Top-Rated Family Service\" for family travelers, \"Elite Staff & Dining\" for premium solo travelers — using each segment's own feature-importance weights rather than a single generic rating.",
      ],
    },
  ],

  "cathay-hackathon": [
    {
      type: "paragraph",
      text: "A 2024 hackathon hosted in Hong Kong, focused on reimagining the inflight passenger experience for Cathay Pacific. Working with a small team over the course of the event, we researched passenger needs and existing market approaches to inflight entertainment, then structured those findings into a concrete strategy proposal.",
    },
    {
      type: "paragraph",
      text: "The brief was open-ended by design — 'improve inflight entertainment' can mean better content, better hardware, or a completely different value proposition. We grounded our direction in passenger research rather than starting from a feature wishlist, which is what shaped the final pitch: a data-informed inflight-entertainment strategy presented directly to industry stakeholders rather than a generic concept deck.",
    },
    {
      type: "paragraph",
      text: "The team placed as a finalist and won Best Idea.",
    },
  ],
};
