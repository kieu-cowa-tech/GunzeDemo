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
import type { QCNhuomFormData } from "./pages/QCNhuom/ModalQCNhuom.tsx";
import { notify } from "./stores/notifyHost.ts";

export const AppContent: React.FC = () => {
  const { isQCNhuomModalOpen, closeQCNhuomModal } = useModal();
  const { addItem } = useQCNhuomStore();

  const handleQCNhuomSubmit = (formData: QCNhuomFormData) => {
    // Chuyển đổi các giá trị string về number
    console.log("Submit QCNhuom data:", formData);
    const newItem: QCNhuom = {
      ...formData,
      id: Date.now(), // Tạm thời sử dụng timestamp làm ID
      checkGME: typeof formData.checkGME === 'string' ? Number(formData.checkGME) || 0 : formData.checkGME,
      slOk: typeof formData.slOk === 'string' ? Number(formData.slOk) || 0 : formData.slOk,
      tong: typeof formData.tong === 'string' ? Number(formData.tong) || 0 : formData.tong,
      slBack: typeof formData.slBack === 'string' ? Number(formData.slBack) || 0 : formData.slBack,
      slVutRac: typeof formData.slVutRac === 'string' ? Number(formData.slVutRac) || 0 : formData.slVutRac,
      slKhac: typeof formData.slKhac === 'string' ? Number(formData.slKhac) || 0 : formData.slKhac,
      doAm: typeof formData.doAm === 'string' ? Number(formData.doAm) || 0 : formData.doAm,
    };
    addItem(newItem);
    
    closeQCNhuomModal();
    notify.success("Thêm mới kết quả QC Nhuộm thành công!");
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
