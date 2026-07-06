export type CursorSkin = {
  id: string;
  name: string;
  description: string;
  /** null = system default cursor */
  file: string | null;
  /** cursor hotspot in px within the 32×32 SVG */
  hotspot: [number, number];
  /** credits - display only for now; the credit system lands later */
  price: number;
  unlocked: boolean;
};

export const cursorSkins: CursorSkin[] = [
  {
    id: "default",
    name: "Standard Issue",
    description: "The pointer you were deployed with. Reliable. Boring.",
    file: null,
    hotspot: [0, 0],
    price: 0,
    unlocked: true,
  },
  {
    id: "crosshair",
    name: "Crosshair",
    description: "Clean cyan sightlines. Free for all agents.",
    file: "/cursors/crosshair.svg",
    hotspot: [16, 16],
    price: 0,
    unlocked: true,
  },
  {
    id: "reticle",
    name: "Reticle",
    description: "Red-ring target lock. Feels illegal to browse with.",
    file: "/cursors/reticle.svg",
    hotspot: [16, 16],
    price: 200,
    unlocked: true,
  },
  {
    id: "diamond",
    name: "Diamond Edge",
    description: "Angular, precise, always straight to the point.",
    file: "/cursors/diamond.svg",
    hotspot: [16, 16],
    price: 350,
    unlocked: true,
  },
  {
    id: "ghost",
    name: "Ghost Ring",
    description: "Dashed stealth optics for the quiet operators.",
    file: "/cursors/ghost.svg",
    hotspot: [16, 16],
    price: 350,
    unlocked: true,
  },
  {
    id: "blade",
    name: "Blade",
    description: "A throwing knife where your arrow used to be.",
    file: "/cursors/blade.svg",
    hotspot: [2, 2],
    price: 500,
    unlocked: true,
  },
];

export const CURSOR_STORAGE_KEY = "portfolio:cursor";
export const CURSOR_CHANGE_EVENT = "portfolio:cursorchange";

/** Cursor value without fallback - CSS appends `, auto` via var() usage. */
export function cursorValue(skin: CursorSkin): string {
  if (!skin.file) return "";
  return `url("${skin.file}") ${skin.hotspot[0]} ${skin.hotspot[1]}`;
}

export function cursorCss(skin: CursorSkin): string {
  if (!skin.file) return "";
  return `${cursorValue(skin)}, auto`;
}
