/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Box, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Checkbox, IconButton, TablePagination, CircularProgress, TableSortLabel, Tooltip
} from "@mui/material";
import { useStore } from "zustand";
import { getRowId, type Column, type DataTableServerProps, type OrderDir, type ServerQuery, type TableState, type RowAction } from "./types";

export function CommonTable<T>(
  props: DataTableServerProps<T>
) {
  const {
    columns, actions = [], keyField, onRowClick, store, loading,
    isShowCheckbox = true,
    isShowPagination = true,
    maxBodyHeight = "60vh",
    stickyHeader = true,
  } = props;

  const rows        = useStore(store, (s: TableState<T>) => s.rows);
  const total       = useStore(store, (s: TableState<T>) => s.total);
  const selected    = useStore(store, (s: TableState<T>) => s.selectedIds);
  const query       = useStore(store, (s: TableState<T>) => s.query);
  const setQuery    = useStore(store, (s: TableState<T>) => s.setQuery);
  const setSelected = useStore(store, (s: TableState<T>) => s.setSelected);
  const toggleSelect= useStore(store, (s: TableState<T>) => s.toggleSelect);
  const pageTotal   = useStore(store, (s: TableState<T>) => s.pageTotal);
  const { pageIndex, pageSize, sortBy, sortDir } = query;

  const hasActions = actions.length > 0;
  const extraCols  = (isShowCheckbox ? 1 : 0) + (hasActions ? 1 : 0);
  const fullColSpan = columns.length + extraCols;

  const isRowSelected = (id: string | number) => selected.includes(id);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked ? rows.map((r: T) => getRowId(r, keyField)) : [];
    setSelected(next);
  };

  const handleSelectRow = (row: T) => {
    const id = getRowId(row, keyField);
    toggleSelect(id);
  };

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = col.keySort ? String(col.keySort) : String(col.key);
    const nextDir: OrderDir = sortBy === key ? (sortDir === "asc" ? "desc" : "asc") : "asc";
    setQuery({ pageIndex: 0, sortBy: key, sortDir: nextDir } as Partial<ServerQuery>);
  };

  const handleChangePage = (_: unknown, nextPage: number) => setQuery({ pageIndex: nextPage });
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery({ pageIndex: 0, pageSize: parseInt(e.target.value, 10) });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <TableContainer sx={{ maxHeight: maxBodyHeight, overflow: 'auto' }}>
        <MuiTable size="medium" stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {isShowCheckbox && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAll}
                    slotProps={{ input: { "aria-label": "select all" } }}
                  />
                </TableCell>
              )}

              {columns.map((col: Column<T>) => (
                <TableCell
                  key={String(col.key)}
                  align={col.align ?? "left"}
                  style={{ width: col.width, minWidth: col.minWidth }}
                  sortDirection={sortBy === String(col.key) ? sortDir : false}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortBy === String(col.key)}
                      direction={sortBy === String(col.key) ? sortDir : "asc"}
                      onClick={() => toggleSort(col)}
                    >
                      {col.header}
                    </TableSortLabel>
                  ) : col.header}
                </TableCell>
              ))}

              {hasActions && (
                <TableCell align="center" width={120}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={fullColSpan} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={fullColSpan} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row: T) => {
                const id = getRowId(row, keyField);
                const selectedRow = isRowSelected(id);
                return (
                  <TableRow
                    key={String(id)}
                    hover
                    selected={selectedRow}
                    onClick={() => onRowClick?.(row)}
                    role="checkbox"
                    aria-checked={selectedRow}
                    tabIndex={-1}
                  >
                    {isShowCheckbox && (
                      <TableCell padding="checkbox" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedRow}
                          onChange={() => handleSelectRow(row)}
                        />
                      </TableCell>
                    )}

                    {columns.map((col: Column<T>) => (
                      <TableCell key={String(col.key)} align={col.align ?? "left"}>
                        {col.render ? col.render(row) : (row as any)[col.key as any]}
                      </TableCell>
                    ))}

                    {hasActions && (
                      <TableCell align="center" onClick={e => e.stopPropagation()}>
                        {actions
                          .filter((a: RowAction<T>) => (a.show ? a.show(row) : true))
                          .map((a: RowAction<T>) => (
                            <Tooltip key={a.id} title={a.label ?? a.id}>
                              <span>
                                <IconButton
                                  size="small"
                                  onClick={() => a.onClick(row)}
                                  disabled={a.disabled?.(row)}
                                >
                                  {a.icon}
                                </IconButton>
                              </span>
                            </Tooltip>
                          ))}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {isShowPagination && (
        <TablePagination
          component="div"
          count={total}
          page={pageIndex}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100, 200]}
          labelDisplayedRows={({ from, to }) =>
            pageTotal ? `${from}-${to} • Page ${pageIndex + 1}/${pageTotal}` : `${from}-${to}`
          }
        />
      )}
    </Box>
  );
}
