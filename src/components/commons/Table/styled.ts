import {
  Table as MuiTable, TableContainer as MuiTableContainer
  } from "@mui/material";
import { styled } from "@mui/material/styles";

type TableContainerProps = {
  maxH?: number | string;
};

type TableProps = {
  minW?: number | string;
};


export const TableContainerSx = styled(MuiTableContainer, {
    shouldForwardProp: (prop) =>
    prop !== "maxH",
})<TableContainerProps>(({ theme, maxH }) => ({
  maxHeight: maxH || "60dvh",
  overflowX: "auto",
  ...(theme.palette.mode === "light" && {
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    boxShadow: "0 1px 2px rgba(2,18,46,.06)",
  })
}));

export const TableSx = styled(MuiTable, {
    shouldForwardProp: (prop) =>
    prop !== "minW",
})<TableProps>(({ theme, minW }) => ({
  tableLayout: "fixed",
  minWidth: "100%",
  width: minW,
  // Header
  "& thead th": {
    fontWeight: 700,
    letterSpacing: .2,
    position: "sticky",
    top: 0,
    zIndex: 1,
    ...(theme.palette.mode === "light" && {
      background: "#C5E4FF",
      color:"#4E4E4E",
      borderBottom: `1px solid ${theme.palette.divider}`,
    }),
  },
  // Body
  "& tbody tr": {
    ...(theme.palette.mode === "light" && {
      "&:nth-of-type(even)": { backgroundColor: "#E9F3FE" },
      "&:hover": { backgroundColor: "rgba(10,102,194,0.06)" },
      "&.Mui-selected": { backgroundColor: "#FFFFFF  !important" },
    }),
  },
  // Cells
  "& th, & td": {
    paddingTop: 8,
    paddingBottom: 8,
  },
}));