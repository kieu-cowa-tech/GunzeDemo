import { create } from "zustand";

type ConfirmOptions = {
  title?: string;
  message?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

type State = {
  open: boolean;
  opts: ConfirmOptions;
  resolve?: (ok: boolean) => void;
  openConfirm: (opts: ConfirmOptions) => Promise<boolean>;
  close: () => void;
  accept: () => void;
  reject: () => void;
};

export const confirmDialogStore = create<State>((set, get) => ({
  open: false,
  opts: { title: "Are you sure?", confirmText: "Delete", cancelText: "Cancel", danger: true },
  openConfirm: (opts) =>
    new Promise<boolean>((resolve) => {
      set({ open: true, opts: { ...get().opts, ...opts }, resolve });
    }),
  close: () => set({ open: false, resolve: undefined }),
  accept: () => {
    get().resolve?.(true);
    set({ open: false, resolve: undefined });
  },
  reject: () => {
    get().resolve?.(false);
    set({ open: false, resolve: undefined });
  },
}));

export const confirmDialog = (opts: ConfirmOptions) => confirmDialogStore.getState().openConfirm(opts);
