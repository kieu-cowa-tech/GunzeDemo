// data-table-store.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, type StoreApi } from "zustand/vanilla";
import type { ServerQuery, TableState } from "./types";

export function createDataTableStore<T>(init?: Partial<ServerQuery>): StoreApi<TableState<T>> {
  return createStore<TableState<T>>((set, get) => ({
    rows: [],
    total: 0,
    selectedIds: [],
    query: {
      pageIndex: init?.pageIndex ?? 0,
      pageSize: init?.pageSize ?? 10,
      sortBy: init?.sortBy,
      sortDir: init?.sortDir ?? "asc",
    },

    setQuery: (next: Partial<ServerQuery> | ((q: ServerQuery) => ServerQuery)) => {
      const curr = get().query;
      const q = typeof next === "function" ? (next as any)(curr) : { ...curr, ...next };
      set({ query: q });
    },

    setData: (rows: T[], total: number) => {
      const ps = get().query.pageSize || 1;
      set({ rows, total, pageTotal: Math.ceil((total ?? 0) / ps) });
    },

    setSelected: (ids: Array<string | number>) => set({ selectedIds: ids }),
    toggleSelect: (id: string | number) => {
      const setSelected = get().setSelected;
      const curr = get().selectedIds;
      setSelected(curr.includes(id) ? curr.filter((x: string | number) => x !== id) : [...curr, id]);
    },
    clearSelection: () => set({ selectedIds: [] }),
  }));
}
