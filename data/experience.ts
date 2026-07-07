export type Role = {
  id: string;
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    id: "apcwo-junior",
    title: "Junior Software Developer",
    org: "APCWO",
    location: "Bengaluru",
    period: "MAR 2024 - MAR 2026",
    bullets: [
      "Designed and delivered the POC for a Go + Flutter + PostgreSQL migration that was greenlit for full production adoption, directly shaping the team's core stack.",
      "Built the complete Flutter frontend for the APCWO mobile app, integrated REST APIs, and assisted App Store & Play Store submission - 1,000+ downloads within months.",
      "Built an AI-powered email automation agent using Google ADK for Go, removing manual drafting across the team's most repetitive comms.",
      "Designed relational schemas and audit/logging triggers - full data traceability and zero integrity violations in production.",
    ],
  },
  {
    id: "apcwo-intern",
    title: "Software Developer Intern",
    org: "APCWO",
    location: "Bengaluru",
    period: "OCT 2023 - FEB 2024",
    bullets: [
      "Built and shipped the first version of a cross-platform mobile app in Flutter/FlutterFlow with backend API integration; published to Play Store & App Store.",
      "Migrated a static marketing site to a Hugo + Go dynamic CMS, cutting content deployment from days to minutes for non-technical editors.",
    ],
  },
];
