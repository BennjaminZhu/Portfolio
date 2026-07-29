export type SkillCategory = {
  name: string;
  level: "Proficient" | "Working knowledge";
  tools: string[];
  evidence: { label: string; href: string }[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming & Data",
    level: "Proficient",
    tools: ["Python", "SQL (MySQL)", "R", "Pandas", "Excel", "Google Sheets"],
    evidence: [
      { label: "NBA Matchup Predictor", href: "/projects/nba-matchup-predictor" },
      { label: "Bank Marketing DML", href: "/projects/bank-marketing-dml" },
      { label: "Traveloka CX Analysis", href: "/projects/traveloka-cx-analysis" },
    ],
  },
  {
    name: "Machine Learning",
    level: "Proficient",
    tools: ["scikit-learn", "XGBoost", "CatBoost", "Random Forest"],
    evidence: [
      { label: "NBA Matchup Predictor", href: "/projects/nba-matchup-predictor" },
      { label: "Traveloka CX Analysis", href: "/projects/traveloka-cx-analysis" },
    ],
  },
  {
    name: "Causal Inference",
    level: "Proficient",
    tools: ["Double Machine Learning", "Propensity Score Matching", "Causal Forest"],
    evidence: [{ label: "Bank Marketing DML", href: "/projects/bank-marketing-dml" }],
  },
  {
    name: "Model Explainability",
    level: "Working knowledge",
    tools: ["SHAP"],
    evidence: [{ label: "Traveloka CX Analysis", href: "/projects/traveloka-cx-analysis" }],
  },
  {
    name: "Statistics & Experimentation",
    level: "Working knowledge",
    tools: ["A/B testing", "temporal validation", "feature engineering"],
    evidence: [
      { label: "NBA Matchup Predictor", href: "/projects/nba-matchup-predictor" },
      { label: "Bank Marketing DML", href: "/projects/bank-marketing-dml" },
    ],
  },
  {
    name: "Analytics & BI",
    level: "Working knowledge",
    tools: ["Power BI", "Tableau", "Matplotlib"],
    evidence: [],
  },
  {
    name: "Workflow & Communication",
    level: "Proficient",
    tools: [
      "CLI automation",
      "data validation",
      "documentation",
      "dashboard development",
      "presentation-ready reporting",
    ],
    evidence: [
      { label: "NBA Matchup Predictor", href: "/projects/nba-matchup-predictor" },
      { label: "Bank Marketing DML", href: "/projects/bank-marketing-dml" },
      { label: "Traveloka CX Analysis", href: "/projects/traveloka-cx-analysis" },
    ],
  },
];

export const buildingTowardNext = [
  "Cloud fundamentals (AWS / GCP)",
  "dbt / Airflow for data pipelines",
  "Automated testing (pytest) for data pipelines",
  "SQL at scale — window functions, query optimization",
];
