import { create } from "zustand";
import type { AlertColor } from "@mui/material";

type Toast = { id: number; message: string; severity: AlertColor; duration?: number; };
type Store = {
  queue: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  shift: () => void;
  success: (m: string, d?: number) => void;
  error: (m: string, d?: number) => void;
  warning: (m: string, d?: number) => void;
  info: (m: string, d?: number) => void;
};

export const useNotifyStore = create<Store>((set) => ({
  queue: [],
  push: (t) => set((s) => ({ queue: [...s.queue, { id: Date.now() + Math.random(), ...t }] })),
  shift: () => set((s) => ({ queue: s.queue.slice(1) })),
  success: (m, d) => set((s) => ({ queue: [...s.queue, { id: Date.now(), message: m, severity: "success", duration: d }] })),
  error:   (m, d) => set((s) => ({ queue: [...s.queue, { id: Date.now(), message: m, severity: "error",   duration: d }] })),
  warning: (m, d) => set((s) => ({ queue: [...s.queue, { id: Date.now(), message: m, severity: "warning", duration: d }] })),
  info: (m, d) => set((s) => ({ queue: [...s.queue, { id: Date.now(), message: m, severity: "info", duration: d }] })),
}));

export const notify = {
  success: (m: string, d?: number) => useNotifyStore.getState().success(m, d),
  error:   (m: string, d?: number) => useNotifyStore.getState().error(m, d),
  warning: (m: string, d?: number) => useNotifyStore.getState().warning(m, d),
  info: (m: string, d?: number) => useNotifyStore.getState().info(m, d),
};
