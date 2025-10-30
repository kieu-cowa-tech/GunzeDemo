import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { makeTheme } from "../../../base/theme";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useMemo(() => makeTheme(), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
