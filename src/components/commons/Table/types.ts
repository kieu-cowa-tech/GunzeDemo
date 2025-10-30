import type { StoreApi } from "zustand";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type OrderDir = "asc" | "desc";

export type Column<T> = {
  key: keyof T | string;
  keySort?: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  minWidth?: number;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export type RowAction<T> = {
  id: string;
  icon: React.ReactNode;
  label?: string;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  show?: (row: T) => boolean;
};

export interface DataTableServerProps<T> {
  columns: Column<T>[];
  actions?: RowAction<T>[];
  keyField: keyof T | ((row: T) => string | number);
  loading:boolean;
  store: StoreApi<TableState<T>>;
  isShowPagination?: boolean;
  isShowCheckbox?: boolean;
  maxBodyHeight?: string;
  stickyHeader?: boolean;
  onRowClick?: (row: T) => void;
}

export type ServerQuery = {
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDir?: OrderDir;
};

export type ServerResponse<T> = {
  totalRow: number;
  data: T[];
};

export type TableState<T> = {
  rows: T[];
  total: number;
  pageTotal?: number;
  selectedIds: Array<string | number>;
  query: ServerQuery;
  setQuery: (next: Partial<ServerQuery> | ((q: ServerQuery) => ServerQuery)) => void;
  setData: (rows: T[], total: number) => void;
  setSelected: (ids: Array<string | number>) => void;
  toggleSelect: (id: string | number) => void;
  clearSelection: () => void;
};

export function getRowId<T>(row: T, keyField: DataTableServerProps<T>["keyField"]) {
  return typeof keyField === "function" ? keyField(row) : (row as any)[keyField];
}