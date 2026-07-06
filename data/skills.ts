export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    items: ["Go", "JavaScript / TypeScript", "Dart"],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    items: ["Go-Gin", "Node.js", "React.js", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    id: "data",
    label: "DATA STORES",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Prisma"],
  },
  {
    id: "tools",
    label: "TOOLS & PLATFORMS",
    items: ["Git / GitHub", "Postman", "PgAdmin", "VS Code", "Cursor", "Google ADK"],
  },
];
