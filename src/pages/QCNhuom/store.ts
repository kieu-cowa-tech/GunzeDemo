import { create } from 'zustand';
import type { QCNhuom } from './type';
import { QCNhuomData } from './Data';

export type QCNhuomState = {
    // Define your state properties and actions here
    items: QCNhuom[];
    addItem: (item: QCNhuom) => void;
    updateItem: (id: number, updatedItem: QCNhuom) => void;
    removeItem: (id: number) => void;
};

export const useQCNhuomStore = create<QCNhuomState>((set) => ({
    items: QCNhuomData,
    addItem: (item: QCNhuom) => set((state) => ({ items: [...state.items, item] })),
    updateItem: (id: number, updatedItem: QCNhuom) => set((state) => ({
        items: state.items.map(item => item.id === id ? updatedItem : item)
    })),
    removeItem: (id: number) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
}));

