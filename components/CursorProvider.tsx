"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  CURSOR_CHANGE_EVENT,
  CURSOR_STORAGE_KEY,
  cursorCss,
  cursorSkins,
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
 * Applies the equipped cursor skin site-wide. SVG cursors work in
 * Chromium/Firefox; Safari ignores them and falls back to `auto`.
 */
export default function CursorProvider() {
  const equippedId = useEquippedCursor();

  useEffect(() => {
    const skin = cursorSkins.find((s) => s.id === equippedId);
    document.documentElement.style.cursor = skin ? cursorCss(skin) : "";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [equippedId]);

  return null;
}
