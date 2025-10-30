import { create } from "zustand";

type Mode = "light" | "dark";
type ThemeState = {
  mode: Mode;
  toggle: () => void;
  set: (m: Mode) => void;
};

const pickInitial = (): Mode => {
  const saved = localStorage.getItem("theme.mode") as Mode | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: pickInitial(),
  toggle: () => {
    const next = get().mode === "light" ? "dark" : "light";
    localStorage.setItem("theme.mode", next);
    set({ mode: next });
  },
  set: (m) => {
    localStorage.setItem("theme.mode", m);
    set({ mode: m });
  },
}));
