import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCursor,
  SiDart,
  SiFlutter,
  SiGin,
  SiGithub,
  SiGo,
  SiGoogle,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandVscode, TbDatabaseCog, TbSparkles } from "react-icons/tb";

export type Skill = {
  name: string;
  icon: IconType;
};

export type SkillGroup = {
  id: string;
  label: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & AGENTS",
    items: [
      { name: "Claude Code", icon: SiClaude },
      { name: "AI Workflows", icon: TbSparkles },
      { name: "Google ADK", icon: SiGoogle },
    ],
  },
  {
    id: "languages",
    label: "LANGUAGES",
    items: [
      { name: "Go", icon: SiGo },
      { name: "JavaScript / TypeScript", icon: SiTypescript },
      { name: "Dart", icon: SiDart },
    ],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    items: [
      { name: "Go-Gin", icon: SiGin },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Flutter", icon: SiFlutter },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    id: "data",
    label: "DATA STORES",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    id: "tools",
    label: "TOOLS & PLATFORMS",
    items: [
      { name: "Git / GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "PgAdmin", icon: TbDatabaseCog },
      { name: "VS Code", icon: TbBrandVscode },
      { name: "Cursor", icon: SiCursor },
    ],
  },
];
