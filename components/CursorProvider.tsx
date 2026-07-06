"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  CURSOR_CHANGE_EVENT,
  CURSOR_STORAGE_KEY,
  cursorSkins,
  cursorValue,
} from "@/data/cursors";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CURSOR_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CURSOR_CHANGE_EVENT, callback);
  };
}

export function useEquippedCursor() {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(CURSOR_STORAGE_KEY) ?? "default",
    () => "default"
  );
}

export function equipCursor(id: string) {
  localStorage.setItem(CURSOR_STORAGE_KEY, id);
  window.dispatchEvent(new Event(CURSOR_CHANGE_EVENT));
}

/**
 * Applies the equipped cursor skin site-wide via a data attribute +
 * CSS variable on <html> (see globals.css) so it also overrides the
 * `pointer` cursor on buttons/links. SVG cursors work in Chromium and
 * Firefox; Safari ignores them and falls back to `auto`.
 */
export default function CursorProvider() {
  const equippedId = useEquippedCursor();

  useEffect(() => {
    const root = document.documentElement;
    const skin = cursorSkins.find((s) => s.id === equippedId);
    const apply = skin?.file != null;
    if (apply) {
      root.dataset.cursorSkin = skin.id;
      root.style.setProperty("--cursor-skin", cursorValue(skin));
    }
    return () => {
      delete root.dataset.cursorSkin;
      root.style.removeProperty("--cursor-skin");
    };
  }, [equippedId]);

  return null;
}
