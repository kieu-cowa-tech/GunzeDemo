import { create } from "zustand";
import { ChuyenData, type Chuyen } from "./type";

export type ChuyenState = {
  // Define your state properties and actions here
  items: Chuyen[];
  addItem: (item: Chuyen) => void;
  updateItem: (id: number, updatedItem: Chuyen) => void;
  removeItem: (id: number) => void;
};

export const useChuyenStore = create<ChuyenState>((set) => ({
  items: ChuyenData,
  addItem: (item: Chuyen) =>
    set((state) => ({ items: [...state.items, item] })),
  updateItem: (id: number, updatedItem: Chuyen) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    })),
  removeItem: (id: number) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
