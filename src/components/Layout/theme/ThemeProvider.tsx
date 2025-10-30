import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeStore } from "../../../stores/theme";
import { makeTheme } from "../../../base/theme";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((s) => s.mode);
  const theme = React.useMemo(() => makeTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
