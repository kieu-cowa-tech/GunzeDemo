import { createTheme, responsiveFontSizes, type ThemeOptions } from "@mui/material";

export const designTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? { background: { default: "#fafafa" } }
      : { background: { default: "#0f1115", paper: "#11131a" } }),
  },
  typography: {
    fontFamily: `"Inter","Roboto","Helvetica","Arial",sans-serif`,
    fontSize: 13,
    button: { textTransform: "none", fontWeight: 500 },
    body1: { fontSize: 13, lineHeight: 1.6 },
    body2: { fontSize: 12.5 },
    caption: { fontSize: 12 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { fontSize: "0.8125rem", borderRadius: 6 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { height: 22, fontSize: "0.75rem" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { fontSize: "0.8125rem", paddingTop: 8, paddingBottom: 8 },
        head: { fontWeight: 700, fontSize: "0.75rem", letterSpacing: 0.2 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: "0.8125rem" },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { fontSize: "0.8125rem" },
        asterisk: {
          color: "#d32f2f",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontSize: "0.8125rem", minHeight: 36 },
      },
    },
  },
});

export const makeTheme = (mode: "light" | "dark") =>
  responsiveFontSizes(createTheme(designTokens(mode)));
