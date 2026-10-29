"use client";

import { useSyncExternalStore } from "react";

export type ThemeMode = "auto" | "light" | "dark";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

let snapshot: ThemeMode = "auto";
let bound = false;

function isStoredMode(value: string | null): value is Exclude<ThemeMode, "auto"> {
  return value === "light" || value === "dark";
}

function readStored(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isStoredMode(stored) ? stored : "auto";
  } catch {
    return "auto";
  }
}

function apply(mode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = mode === "dark" || (mode === "auto" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

function onSystemChange() {
  if (snapshot === "auto") apply("auto");
}

function subscribe(listener: () => void) {
  if (!bound) {
    bound = true;
    snapshot = readStored();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSystemChange);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot(): ThemeMode {
  return "auto";
}

export function setTheme(mode: ThemeMode) {
  snapshot = mode;
  try {
    if (mode === "auto") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, mode);
  } catch {}
  apply(mode);
  for (const listener of listeners) listener();
}

export function useTheme(): ThemeMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
