export type Project = {
  slug: string;
  type: string;
  title: string;
  description: string;
  problem: string;
  tools: string[];
  href: string;
  linkLabel: string;
  metric: { value: string; label: string };
  previewImage?: string;
  /** Set once the repo is public — the card and case-study GitHub links stay hidden until then. */
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "nba-matchup-predictor",
    type: "ML pipeline",
    title: "NBA matchup predictor",
    description:
      "Built and validated a 66,738-game historical dataset, engineered rolling-form, rest-day, and home/away features, and trained gradient-boosted models with season-based temporal validation to prevent leakage — reaching 64.6% accuracy and 0.684 ROC-AUC, with the full pipeline automated end to end.",
    problem:
      "Can a model beat naive baselines on next-game outcomes without leaking future information into training?",
    tools: ["Python", "Pandas", "XGBoost", "CatBoost", "scikit-learn"],
    href: "/projects/nba-matchup-predictor",
    linkLabel: "Personal project · 2026",
    metric: { value: "64.6%", label: "Accuracy · 0.684 ROC-AUC" },
  },
  {
    slug: "bank-marketing-dml",
    type: "Causal inference",
    title: "Does prior contact drive bank subscriptions?",
    description:
      "Estimated the causal effect of previous contact on term-deposit subscriptions across 41,000+ UCI Bank Marketing records using Double Machine Learning, backed by propensity-score matching and robustness checks — then translated heterogeneous subgroup effects into concrete targeting recommendations.",
    problem:
      "Does prior contact cause subscriptions, or were banks already re-contacting the customers most likely to say yes?",
    tools: ["R", "Double ML", "Propensity matching", "Causal analysis"],
    href: "/projects/bank-marketing-dml",
    linkLabel: "Quantitative marketing · Spring 2026",
    metric: { value: "17.82pp → 2.27pp", label: "Selection bias removed" },
    previewImage: "/projects/bank-marketing-dml/propensity-before-after.png",
  },
  {
    slug: "traveloka-cx-analysis",
    type: "Predictive modeling",
    title: "Traveloka customer experience analysis",
    description:
      "Integrated Skytrax airline, airport, seat, and lounge review datasets and built Random Forest models of satisfaction and recommendation behavior, then used SHAP to surface the true drivers per customer segment — turning them into service and positioning recommendations for Traveloka.",
    problem:
      "Which service touchpoints actually move satisfaction and recommendation — and does that change by traveler segment?",
    tools: ["Python", "Random Forest", "SHAP", "Sentiment analysis"],
    href: "/projects/traveloka-cx-analysis",
    linkLabel: "Marketing analytics · Spring 2026",
    metric: { value: "7", label: "Passenger segments modeled" },
    previewImage: "/projects/traveloka-cx-analysis/shap-beeswarm-overall-rating.png",
  },
  {
    slug: "cathay-hackathon",
    type: "Hackathon · Finalist",
    title: "Cathay Hackathon 2024 — Best Idea",
    description:
      "Researched passenger needs and market data to shape a data-informed inflight-entertainment strategy, presented to industry stakeholders in Hong Kong — finishing as a finalist and taking home the Best Idea award.",
    problem:
      "How should inflight entertainment change to close the gap between what passengers want and what airlines build?",
    tools: ["Market research", "Data storytelling", "Strategy"],
    href: "/projects/cathay-hackathon",
    linkLabel: "Finalist · Sep–Nov 2024",
    metric: { value: "Finalist", label: "Best Idea award" },
  },
];
