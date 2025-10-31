import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotifyHost from "./components/commons/NotifyHost/NotifyHost.tsx";
import ConfirmDialog from "./components/commons/ConfirmDialog/ConfirmDialog.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppThemeProvider from "./components/Layout/theme/ThemeProvider.tsx";
import QCNhuomPage from "./pages/QCNhuom/QCNhuomPage.tsx";
import TopBar from "./components/Layout/TopBar.tsx";
import { Box, Container } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <BrowserRouter>
      <React.Suspense>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            width: "100vw",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflowX: "hidden",
            }}
          >
            <TopBar />
            <Container
              maxWidth={false}
              disableGutters
              sx={{ 
                px: { xs: 1, sm: 2, md: 3 }, 
                py: { xs: 1, sm: 2 }, 
                width: "100%",
                minHeight: 0,
                flex: 1
              }}
            >
              <Routes>
                <Route path="/" element={<QCNhuomPage />} />
                {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
              </Routes>
            </Container>
          </Box>
        </Box>
        <NotifyHost />
        <ConfirmDialog />
      </React.Suspense>
    </BrowserRouter>
  </AppThemeProvider>
);
