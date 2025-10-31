import { createTheme, responsiveFontSizes, type ThemeOptions } from "@mui/material";

export const designTokens: ThemeOptions = {
  palette: {
    mode: "light",
    background: { default: "#fafafa" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: `"Inter","Roboto","Helvetica","Arial",sans-serif`,
    fontSize: 13,
    button: { textTransform: "none", fontWeight: 500 },
    body1: { fontSize: 13, lineHeight: 1.6 },
    body2: { fontSize: 12.5 },
    caption: { fontSize: 12 },
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.8125rem",
          borderRadius: 6,
          [theme.breakpoints.down('md')]: {
            fontSize: "0.75rem",
            minWidth: 32,
            padding: "6px 12px",
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 22,
          fontSize: "0.75rem",
          [theme.breakpoints.down('md')]: {
            height: 20,
            fontSize: "0.6875rem",
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.8125rem",
          paddingTop: 8,
          paddingBottom: 8,
          [theme.breakpoints.down('md')]: {
            fontSize: "0.75rem",
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 8,
            paddingRight: 8,
          },
        }),
        head: ({ theme }) => ({
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: 0.2,
          [theme.breakpoints.down('md')]: {
            fontSize: "0.6875rem",
            paddingTop: 8,
            paddingBottom: 8,
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.8125rem",
          [theme.breakpoints.down('md')]: {
            fontSize: "0.75rem",
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.8125rem",
          [theme.breakpoints.down('md')]: {
            fontSize: "0.75rem",
          },
        }),
        asterisk: {
          color: "#d32f2f",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "0.8125rem",
          minHeight: 36,
          [theme.breakpoints.down('md')]: {
            fontSize: "0.75rem",
            minHeight: 32,
          },
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            borderRadius: 8,
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            padding: 6,
          },
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            minHeight: '48px !important',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
        }),
      },
    },
  },
};

export const makeTheme = () =>
  responsiveFontSizes(createTheme(designTokens));
