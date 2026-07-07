"use client";

import { useRef } from "react";

const MAX_TILT_DEG = 6;

/** Tilts children toward the pointer on hover. */
export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--ry", `${(px * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    node.style.setProperty("--rx", `${(-py * MAX_TILT_DEG * 2).toFixed(2)}deg`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  }

  return (
    <div ref={ref} className="hud-tilt h-full" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}
