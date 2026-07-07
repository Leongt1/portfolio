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
      "Tracks day-to-day spending and turns it into a live analytics dashboard - category breakdowns, month-over-month trends and where the money actually went. Built for multiple users from day one, with every account's data kept strictly private.",
    tags: ["Go", "Gin", "React", "JWT", "PostgreSQL"],
    thumbnail: "/thumbs/finai-thumbnail.png",
    liveUrl: "https://fin-ai-wheat.vercel.app/",
    // TODO: repoUrl
  },
  {
    id: "shepherd-pathways",
    title: "Shepherd Pathways",
    kicker: "Counselling Platform · Freelance",
    description:
      "The online home of Shepherd Pathways, a registered MSME offering non-clinical counselling - listening and peer support for people who need to be heard. Visitors explore the service and reach out through a guided multi-step inquiry form that keeps every submission safe and spam-free.",
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
