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
      src: "/projects/traveloka-cx-analysis/dataset-completeness.png",
      alt: "Table summarizing row counts and missing-data percentages across the merged Airline, Airport, Lounge, and Seat Skytrax datasets",
      caption:
        "The merged dataset spanned four review types — Airlines (41,396 rows), Airports (17,721), Lounge (2,264), and Seat (1,258) — each with very different missingness by field, which shaped which variables were usable per segment.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/airlines-descriptive.png",
      alt: "Heatmap of descriptive statistics — mean, standard deviation, and quartiles — for airline sub-ratings and overall rating",
      caption:
        "Descriptive stats for the airline reviews: sub-ratings cluster around 2.2–3.3 on a 5-point scale, while overall_rating averages 6.04 on a 10-point scale — the baseline the correlation and SHAP analysis below build on.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/airline-correlation.png",
      alt: "Heatmap of correlations between airline marketing action ratings and overall rating / recommendation outcomes",
      caption:
        "Value for Money and Ground Service correlate most strongly with both overall rating and recommendation across airlines.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/mean-ratings-by-recommendation.png",
      alt: "Bar chart comparing mean service ratings between passengers who recommended the airline and those who did not, across six service touchpoints",
      caption:
        "The same story from a second angle: recommenders and non-recommenders are separated by a 1.8-point gap on Cabin Staff, but only 0.02 points on WiFi.",
    },
    { type: "heading", text: "Segmenting travelers before, not after, the flight" },
    {
      type: "paragraph",
      text: "Clustering directly on post-flight review features risked circularity — a passenger who already had lounge access might simply rate lounge features more favorably regardless of whether they cared about lounges going in. So the segmentation uses only pre-booking characteristics: traveler type (solo leisure, couple/family leisure, business) and cabin class, one-hot encoded and fed into a CART regression tree (`DecisionTreeRegressor`, max depth 3, minimum 100 passengers per leaf) trained to predict `overall_rating`. No review text and no NLP features go into this step at all — segmentation has to be knowable before the flight happens, or it can't be used to make a booking recommendation.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/cart-tree.png",
      alt: "CART decision tree splitting passengers first on business-class cabin, then on solo-leisure traveler type, then on first-class cabin or business traveler type, producing seven leaf segments",
      caption:
        "The actual fitted tree: business-class cabin is the first split, solo-leisure status the second — cabin class alone doesn't determine the segment.",
    },
    {
      type: "paragraph",
      text: "The tree's first split isn't traveler type, it's cabin: business class or not. Within each branch, the next split is whether the traveler is flying solo for leisure — and only after that does first class or business-traveler status matter. That ordering itself is a finding: cabin class dominates, but it doesn't fully determine expectations on its own. The tree bottoms out at seven leaf segments, each with a distinct baseline satisfaction level before any service rating is even considered:",
    },
    {
      type: "list",
      items: [
        "Couples/family, non-business cabin (n=857) — baseline rating 4.46, the more price-conscious end of leisure travel.",
        "Business travelers, non-business cabin (n=180) — baseline 3.83, the lowest of any segment: corporate travelers stuck in economy are the hardest to satisfy.",
        "Solo leisure, non-business, non-first cabin (n=22,896) — by far the largest segment, baseline 5.91.",
        "Solo leisure, first class (n=644) — baseline 6.68.",
        "Couples/family, business class (n=103) — baseline 6.51.",
        "Solo leisure, business class (n=4,706) — baseline 6.92, the highest of any segment.",
        "Business travelers, business class (n=102) — baseline 5.90.",
      ],
    },
    {
      type: "paragraph",
      text: "Business travelers show up as the least satisfied group in economy and only a middling one in business class — while solo leisure travelers in business class are the most satisfied group in the entire dataset. Cabin class predicts a lot, but who's sitting in it changes the story.",
    },
    { type: "heading", text: "Where the review-text sentiment actually fits" },
    {
      type: "paragraph",
      text: "The segmentation above is demographic-only on purpose — it has to be, since a passenger's own post-flight review can't inform a recommendation shown before they fly. The language-processing work runs on a separate track: Aspect-Based Sentiment Analysis (ABSA) parses each free-text review and assigns a sentiment score per service aspect — comfort, staff, food, entertainment — rather than one blended sentiment score for the whole review, so a passenger who raves about the crew but complains about legroom produces two opposing signals instead of one averaged-out one. Those per-aspect scores get exported to CSV and only enter the modeling stage afterward, as their own standalone feature set tested against the structured ratings — never as an input to the clustering itself.",
    },
    { type: "heading", text: "Two Random Forests per segment, three feature sets each" },
    {
      type: "paragraph",
      text: "Within each of the seven segments, I trained two separate Random Forest models: a RandomForestRegressor predicting overall_rating (1–10) and a RandomForestClassifier predicting recommended (0/1). Each was run three times per segment on three different feature sets — Model A with all 13 features (6 structured ratings + 7 ABSA sentiment scores), Model B with the 6 ratings only, and Model C with the 7 sentiment scores only — to directly test whether the language-processing features add anything the ratings don't already capture. Every one of the 6 models per segment was tuned with RandomizedSearchCV (10 sampled hyperparameter combinations, searching tree count, depth, split size, and max features) evaluated by 3-fold cross-validation, then scored again on a held-out test set the tuning process never saw.",
    },
    {
      type: "paragraph",
      text: "The classifier and regressor use different scoring metrics on purpose. The regressor is tuned and selected on R² (tiebreak: lowest MAE) since overall_rating is continuous. The classifier is tuned and selected on ROC-AUC rather than accuracy (tiebreak: highest F1), because roughly 60% of passengers recommend their airline — a model that just predicts \"yes\" every time would already score 60% accuracy without learning anything. Both the 3-fold CV inside RandomizedSearchCV and the final holdout evaluation are leakage-guarded the same way as the rest of the project: the 80/20 train/test split happens first, and every imputed value (median for ratings, mode for categoricals) is computed from the training fold only, then applied to both sides.",
    },
    {
      type: "paragraph",
      text: "Across nearly every segment, the ratings-only model (B) matched or beat the sentiment-only model (C) on both R² and ROC-AUC — confirming that free-text sentiment is a noisy stand-in for a rating passengers already gave directly. Where Model A (all 13 features) edged out Model B, the gain was small, meaning ABSA sentiment adds a little marginal signal on top of the ratings but isn't a replacement for them.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/regression-importance-heatmap.png",
      alt: "Heatmap of Random Forest regression feature importance for predicting overall rating, broken out by each of the seven CART segments",
      caption:
        "What each segment's winning regressor actually weighs: Cabin Staff dominates everywhere, but Ground Service only matters for non-business-class leisure and business-traveler segments — it's worth ~0% for every solo-leisure and business-class-leisure segment.",
    },
    {
      type: "paragraph",
      text: "Reading the heatmap segment by segment: the two economy/premium leisure segments (couples and business travelers stuck outside business class) are the only ones where Ground Service carries real weight — 33.5% and 22.3% of the regressor's decisions, versus under 2% everywhere else. Food & Beverages matters most for the first-class solo segment (26.4%) and both business-class leisure segments (23.7–19.4%), where the meal is part of what's being paid for. Inflight Entertainment barely registers anywhere except the business-class business-traveler segment (10.6%), the only group with enough downtime and low other-service variance for it to show up at all. WiFi is statistically irrelevant in every single segment.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/classification-importance-heatmap.png",
      alt: "Heatmap of Random Forest classification feature importance for predicting recommendation, broken out by each of the seven CART segments",
      caption:
        "The classifier (predicting whether a passenger recommends the airline) largely agrees with the regressor's ranking, but Inflight Entertainment jumps to 17.3% for business travelers in business class — enough to change what \"recommend to this segment\" should emphasize.",
    },
    {
      type: "heading", text: "What SHAP adds beyond feature importance" },
    {
      type: "paragraph",
      text: "Feature importance says how much a variable matters on average; it can't say whether a high rating helps as much as a low rating hurts. Running SHAP's TreeExplainer against a global Random Forest — one regressor for overall_rating, one classifier for recommended, both trained on the 6 rating features across all passengers — makes that visible per individual passenger rather than per segment.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/shap-beeswarm-overall-rating.png",
      alt: "SHAP beeswarm plot showing Cabin Staff and Seat Comfort as the dominant drivers of predicted overall rating",
      caption:
        "SHAP values across passengers for overall rating: Cabin Staff and Seat Comfort dominate; WiFi and Ground Service barely register at the global level.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/shap-beeswarm-recommended.png",
      alt: "SHAP beeswarm plot showing the same features' impact on the probability of recommending the airline",
      caption:
        "The same ranking holds for predicting recommendation directly — Cabin Staff and Seat Comfort still lead, confirming the regressor and classifier agree on what matters.",
    },
    {
      type: "image",
      src: "/projects/traveloka-cx-analysis/shap-distributions.png",
      alt: "Box plots of SHAP value distributions per feature, showing longer left whiskers than right whiskers for the top features, indicating loss aversion",
      caption:
        "For Cabin Staff and Seat Comfort, the downside tail is consistently longer than the upside tail — a bad rating drags the prediction down by more than an equally-extreme good rating pulls it up.",
    },
    {
      type: "paragraph",
      text: "That asymmetry is the practical finding SHAP adds on top of the segment heatmaps: for the two features that matter most everywhere, poor service costs more than excellent service gains. A 1-star Cabin Staff rating pulls a passenger's predicted overall rating down by up to 4 points; a 5-star rating pulls it up by at most 3. Fixing bad cabin-crew experiences protects satisfaction more reliably than trying to engineer exceptional ones.",
    },
    { type: "heading", text: "From model output to product recommendation" },
    {
      type: "list",
      items: [
        "Lead with value, not price: surface a \"Best Value\" signal rather than \"Lowest Price\" badges, since Value for Money is the strongest correlate of both satisfaction and recommendation.",
        "Emphasize physical cabin dimensions in the booking UI — seat storage, legroom, and width correlate more strongly with satisfaction than digital amenities like power outlets or seatback screens.",
        "Set realistic expectations for lounges specifically: lounges score well on individual features but have the lowest recommendation rate of the four categories (36%), suggesting a gap between marketed luxury and lived experience.",
        "Tag airlines by segment fit using each segment's own feature-importance weights rather than one generic rating — e.g. surfacing Ground Service quality for economy leisure travelers, and Food & Beverages quality for first-class solo and business-class leisure travelers, since those are the segments where each factor actually moves the needle.",
        "Prioritize service-recovery investment over premium upgrades: since the SHAP asymmetry shows downside outweighs upside for the top-weighted features, fixing bad cabin-crew and seat experiences protects more bookings than adding amenities on top of already-good ones.",
        "Don't build recommendation logic on review-sentiment text alone — the ratings-only model matched or beat the sentiment-only model in nearly every segment, so structured ratings should stay the primary signal with ABSA sentiment as a secondary input at most.",
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
