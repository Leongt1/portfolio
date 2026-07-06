export type Project = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
  thumbnail: string;
  liveUrl?: string;
  repoUrl?: string;
  classified?: boolean;
};

export const projects: Project[] = [
  {
    id: "finai",
    title: "FinAI",
    kicker: "Personal Finance Tracker",
    description:
      "Go-Gin REST APIs + React. JWT auth with refresh-token rotation, RBAC and strict per-user isolation. Real-time spending analytics dashboard with category breakdowns and month-over-month summaries.",
    tags: ["Go", "Gin", "React", "JWT", "PostgreSQL"],
    thumbnail: "/thumbs/finai-thumbnail.png",
    liveUrl: "https://fin-ai-wheat.vercel.app/",
    // TODO: repoUrl
  },
  {
    id: "shepherd-pathways",
    title: "Shepherd Pathways",
    kicker: "Consultancy Platform · Freelance",
    description:
      "Full-stack marketing + inquiry platform for a registered MSME across 5 verticals. Multi-step inquiry form with client-side validation, rate limiting and sanitized Supabase integration. Modular React SPA with a custom Tailwind v4 design system.",
    tags: ["React", "Tailwind v4", "Supabase", "SPA"],
    thumbnail: "/thumbs/shepherd-thumbnail.png",
    liveUrl: "https://www.shepherdpathways.in/",
    // TODO: repoUrl
  },
  {
    id: "classified",
    title: "[REDACTED]",
    kicker: "Next Deployment",
    description:
      "Intel on the next project is classified. Check back after the next deployment clears review.",
    tags: ["???"],
    thumbnail: "/thumbs/classified.svg",
    classified: true,
  },
];
