type ThemeMode = "auto" | "light" | "dark";

let _mode: ThemeMode = "auto";

const listeners = new Set<(m: ThemeMode) => void>();

export function getThemeMode(): ThemeMode {
  return _mode;
}

export function setThemeMode(m: ThemeMode) {
  _mode = m;
  applyTheme();
  listeners.forEach((fn) => fn(m));
}

export function cycleTheme() {
  const next = _mode === "auto" ? "light" : _mode === "light" ? "dark" : "auto";
  setThemeMode(next);
}

export function applyTheme() {
  const isDark =
    _mode === "dark" ||
    (_mode === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function subscribe(fn: (m: ThemeMode) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (_mode === "auto") applyTheme();
    });
}
