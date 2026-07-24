export type Project = {
  slug: string;
  type: string;
  title: string;
  description: string;
  tools: string[];
  href: string;
  linkLabel: string;
};

export const projects: Project[] = [
  {
    slug: "nba-matchup-predictor",
    type: "ML pipeline",
    title: "NBA matchup predictor",
    description:
      "Built and validated a 66,738-game historical dataset, engineered rolling-form, rest-day, and home/away features, and trained gradient-boosted models with season-based temporal validation to prevent leakage — reaching 64.6% accuracy and 0.684 ROC-AUC, with the full pipeline automated end to end.",
    tools: ["Python", "Pandas", "XGBoost", "CatBoost", "scikit-learn"],
    href: "#work",
    linkLabel: "Personal project · 2026",
  },
  {
    slug: "bank-marketing-dml",
    type: "Causal inference",
    title: "Does prior contact drive bank subscriptions?",
    description:
      "Estimated the causal effect of previous contact on term-deposit subscriptions across 41,000+ UCI Bank Marketing records using Double Machine Learning, backed by propensity-score matching and robustness checks — then translated heterogeneous subgroup effects into concrete targeting recommendations.",
    tools: ["R", "Double ML", "Propensity matching", "Causal analysis"],
    href: "#work",
    linkLabel: "Quantitative marketing · Spring 2026",
  },
  {
    slug: "traveloka-cx-analysis",
    type: "Predictive modeling",
    title: "Traveloka customer experience analysis",
    description:
      "Integrated Skytrax airline, airport, seat, and lounge review datasets and built Random Forest models of satisfaction and recommendation behavior, then used SHAP to surface the true drivers per customer segment — turning them into service and positioning recommendations for Traveloka.",
    tools: ["Python", "Random Forest", "SHAP", "Sentiment analysis"],
    href: "#work",
    linkLabel: "Marketing analytics · Spring 2026",
  },
  {
    slug: "cathay-hackathon",
    type: "Hackathon · Finalist",
    title: "Cathay Hackathon 2024 — Best Idea",
    description:
      "Researched passenger needs and market data to shape a data-informed inflight-entertainment strategy, presented to industry stakeholders in Hong Kong — finishing as a finalist and taking home the Best Idea award.",
    tools: ["Market research", "Data storytelling", "Strategy"],
    href: "#work",
    linkLabel: "Finalist · Sep–Nov 2024",
  },
];
