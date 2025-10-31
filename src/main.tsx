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
import { ModalProvider, useModal } from "./stores/modalContext.tsx";
import QCNhuomModal from "./pages/QCNhuom/ModalQCNhuom.tsx";
import { useQCNhuomStore } from "./pages/QCNhuom/store.ts";
import type { QCNhuom } from "./pages/QCNhuom/type.ts";

export const AppContent: React.FC = () => {
  const { isQCNhuomModalOpen, closeQCNhuomModal } = useModal();
  const { addItem } = useQCNhuomStore();

  const handleQCNhuomSubmit = (data: Omit<QCNhuom, 'id'>) => {
    // Thêm logic xử lý submit modal ở đây
    console.log("Submit QCNhuom data:", data);
    const newItem: QCNhuom = {
      ...data,
      id: Date.now(), // Tạm thời sử dụng timestamp làm ID
    };
    addItem(newItem);
    closeQCNhuomModal();
  };

  return (
    <>
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
            sx={{ px: 2, py: 2, width: "100%" }}
          >
            <Routes>
              <Route path="/" element={<QCNhuomPage />} />
              {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </Container>
        </Box>
      </Box>
      
      {/* QC Nhuom Modal */}
      <QCNhuomModal
        open={isQCNhuomModalOpen}
        onClose={closeQCNhuomModal}
        onSubmit={handleQCNhuomSubmit}
        mode="add"
      />
      
      <NotifyHost />
      <ConfirmDialog />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <BrowserRouter>
      <React.Suspense>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </React.Suspense>
    </BrowserRouter>
  </AppThemeProvider>
);
