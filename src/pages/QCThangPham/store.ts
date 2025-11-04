import { create } from 'zustand';
import  { QCThanhPhamData,type QCThanhPham } from './type';

export type QCThanhPhamState = {
    // Define your state properties and actions here
    items: QCThanhPham[];
    addItem: (item: QCThanhPham) => void;
    updateItem: (id: number, updatedItem: QCThanhPham) => void;
    removeItem: (id: number) => void;
};

export const useQCThanhPhamStore = create<QCThanhPhamState>((set) => ({
    items: QCThanhPhamData,
    addItem: (item: QCThanhPham) => set((state) => ({ items: [...state.items, item] })),
    updateItem: (id: number, updatedItem: QCThanhPham) => set((state) => ({
        items: state.items.map(item => item.id === id ? updatedItem : item)
    })),
    removeItem: (id: number) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
}));

