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
      text: "My individual focus was extending this into Double Machine Learning, to check the PSM result and estimate how the effect varies across customer segments. DML uses two random forest models — one predicting the outcome from confounders, one predicting treatment from confounders — and regresses the residuals of each to isolate the causal effect without the double-counting bias that omitted-variable confounders would otherwise introduce. Cross-fitting across 5 folds keeps every residual coming from a model that never saw that observation. The overall ATE from DML came out to +1.78pp (95% CI [0.58, 2.97], p = 0.0035) — consistent with the PSM estimate.",
    },
    {
      type: "paragraph",
      text: "The subgroup breakdown is where this became actionable: customers over 50 (+5.35pp), unemployed customers (+11.47pp), and those with professional-course education (+5.50pp) responded far more strongly to prior contact than the overall average. Customers under 30, in admin or blue-collar jobs, or with only basic education showed effects that weren't statistically distinguishable from zero.",
    },
    { type: "heading", text: "Targeting recommendation" },
    {
      type: "list",
      items: [
        "Prioritize follow-up contact for older, unemployed, and professionally-trained customer segments, where prior contact meaningfully moves subscription likelihood.",
        "Scale back follow-up spend on segments with statistically insignificant response — the contact isn't converting them, it's just cost.",
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
