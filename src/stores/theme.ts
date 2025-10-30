import { create } from "zustand";

type Mode = "light";
type ThemeState = {
  mode: Mode;
};

export const useThemeStore = create<ThemeState>(() => ({
  mode: "light",
}));
