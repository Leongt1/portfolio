"use client";

import Image from "next/image";
import { cursorCss, cursorSkins } from "@/data/cursors";
import { equipCursor, useEquippedCursor } from "./CursorProvider";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Armory() {
  const equippedId = useEquippedCursor();

  return (
    <section id="armory" className="hud-grid-bg py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="ARMORY" title="Pointer Skins" />
          <p className="-mt-4 mb-10 max-w-2xl text-sm leading-relaxed text-hud-muted">
            Swap your cursor for something with a bit more attitude. Hover a card to test-drive a
            skin, equip the one you like — it&apos;s saved on this device. Credits and unlocks are
            coming in a future patch; for now the whole rack is open.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursorSkins.map((skin, i) => {
            const equipped = skin.id === equippedId;
            return (
              <Reveal key={skin.id} delay={i * 60} className="h-full">
                <div
                  className={`hud-brackets hud-clip flex h-full flex-col border bg-hud-panel p-6 transition-colors ${
                    equipped ? "border-hud-cyan" : "border-hud-line"
                  }`}
                  style={skin.file ? { cursor: cursorCss(skin) } : undefined}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center border border-hud-line2 bg-hud-panel2">
                      {skin.file ? (
                        <Image src={skin.file} alt="" width={32} height={32} aria-hidden />
                      ) : (
                        <span className="text-2xl text-hud-muted" aria-hidden>
                          ➤
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-mono text-[11px] tracking-[0.2em] ${
                        skin.price === 0 ? "text-hud-cyan" : "text-hud-dim"
                      }`}
                    >
                      {skin.price === 0 ? "FREE" : `⬡ ${skin.price}`}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold uppercase tracking-wide">{skin.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-hud-muted">{skin.description}</p>

                  <button
                    type="button"
                    onClick={() => equipCursor(skin.id)}
                    disabled={equipped}
                    aria-pressed={equipped}
                    className={`mt-6 self-start px-6 py-2.5 font-mono text-xs tracking-[0.2em] ${
                      equipped
                        ? "border border-hud-cyan text-hud-cyan cursor-default"
                        : "hud-btn hud-btn-outline font-semibold"
                    }`}
                  >
                    {equipped ? "EQUIPPED" : "EQUIP"}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
