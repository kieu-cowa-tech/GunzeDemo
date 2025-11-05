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
import ChuyenPage from "./pages/Chuyen/ChuyenPage.tsx";
import QCThanhPhamPage from "./pages/QCThangPham/QCThanhPhamPage.tsx";
import ChuyenModal from "./pages/Chuyen/ModalChuyen.tsx";
import type { ChuyenFormData } from "./pages/Chuyen/ModalChuyen.tsx";
import type { Chuyen } from "./pages/Chuyen/type.ts";
import { useChuyenStore } from "./pages/Chuyen/store.ts";
import QCThanhPhamModal from "./pages/QCThangPham/ModelQCThanhPham.tsx";
import type { QCThanhPhamFormData } from "./pages/QCThangPham/ModelQCThanhPham.tsx";
import type { QCThanhPham } from "./pages/QCThangPham/type.ts";
import { useQCThanhPhamStore } from "./pages/QCThangPham/store.ts";

export const AppContent: React.FC = () => {
  const { 
    isQCNhuomModalOpen, 
    closeQCNhuomModal,
    isChuyenModalOpen,
    closeChuyenModal,
    isQCThanhPhamModalOpen,
    closeQCThanhPhamModal
  } = useModal();
  
  const { addItem: addQCNhuomItem } = useQCNhuomStore();
  const { addItem: addChuyenItem } = useChuyenStore();
  const { addItem: addQCThanhPhamItem } = useQCThanhPhamStore();

  const handleQCNhuomSubmit = (formData: QCNhuomFormData) => {
    // Chuyển đổi các giá trị string về number
    console.log("Submit QCNhuom data:", formData);
    const newItem: QCNhuom = {
      ...formData,
      id: Date.now(), // Tạm thời sử dụng timestamp làm ID
      checkGME:
        typeof formData.checkGME === "string"
          ? Number(formData.checkGME) || 0
          : formData.checkGME,
      slOk:
        typeof formData.slOk === "string"
          ? Number(formData.slOk) || 0
          : formData.slOk,
      tong:
        typeof formData.tong === "string"
          ? Number(formData.tong) || 0
          : formData.tong,
      slBack:
        typeof formData.slBack === "string"
          ? Number(formData.slBack) || 0
          : formData.slBack,
      slVutRac:
        typeof formData.slVutRac === "string"
          ? Number(formData.slVutRac) || 0
          : formData.slVutRac,
      slKhac:
        typeof formData.slKhac === "string"
          ? Number(formData.slKhac) || 0
          : formData.slKhac,
      doAm:
        typeof formData.doAm === "string"
          ? Number(formData.doAm) || 0
          : formData.doAm,
    };
    addQCNhuomItem(newItem);

    closeQCNhuomModal();
    notify.success("Thêm mới kết quả QC Nhuộm thành công!");
  };

  const handleChuyenSubmit = (formData: ChuyenFormData) => {
    console.log("Submit Chuyen data:", formData);
    const newItem: Chuyen = {
      ...formData,
      id: Date.now(),
      ca: typeof formData.ca === "string" ? Number(formData.ca) || 0 : (formData.ca ?? 0),
      cdkl: typeof formData.cdkl === "string" ? Number(formData.cdkl) || 0 : (formData.cdkl ?? 0),
      nguyenVatLieu: typeof formData.nguyenVatLieu === "string" ? Number(formData.nguyenVatLieu) || 0 : (formData.nguyenVatLieu ?? 0),
      soLuong: typeof formData.soLuong === "string" ? Number(formData.soLuong) || 0 : (formData.soLuong ?? 0),
      racTruLoi: typeof formData.racTruLoi === "string" ? Number(formData.racTruLoi) || 0 : (formData.racTruLoi ?? 0),
      tong: typeof formData.tong === "string" ? Number(formData.tong) || 0 : (formData.tong ?? 0),
      trongLuong: typeof formData.trongLuong === "string" ? Number(formData.trongLuong) || 0 : (formData.trongLuong ?? 0),
    };
    addChuyenItem(newItem);

    closeChuyenModal();
    notify.success("Thêm mới kết quả Chuyển thành công!");
  };

  const handleQCThanhPhamSubmit = (formData: QCThanhPhamFormData) => {
    console.log("Submit QCThanhPham data:", formData);
    const newItem: QCThanhPham = {
      ...formData,
      id: Date.now(),
      soCuon: typeof formData.soCuon === "string" ? Number(formData.soCuon) || 0 : formData.soCuon,
      loiCuon1: typeof formData.loiCuon1 === "string" ? Number(formData.loiCuon1) || 0 : formData.loiCuon1,
      loiCuon2: typeof formData.loiCuon2 === "string" ? Number(formData.loiCuon2) || 0 : formData.loiCuon2,
      loiCuon3: typeof formData.loiCuon3 === "string" ? Number(formData.loiCuon3) || 0 : formData.loiCuon3,
      loiCuon4: typeof formData.loiCuon4 === "string" ? Number(formData.loiCuon4) || 0 : formData.loiCuon4,
      khoiLuong: typeof formData.khoiLuong === "string" ? Number(formData.khoiLuong) || 0 : formData.khoiLuong,
      cd_kl: typeof formData.cd_kl === "string" ? Number(formData.cd_kl) || 0 : formData.cd_kl,
      rac: typeof formData.rac === "string" ? Number(formData.rac) || 0 : formData.rac,
    };
    addQCThanhPhamItem(newItem);

    closeQCThanhPhamModal();
    notify.success("Lưu kết quả QC Thành phẩm thành công!");
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
              <Route path="/chuyen" element={<ChuyenPage />} />
              <Route path="/qc-thanh-pham" element={<QCThanhPhamPage />} />
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

      {/* Chuyen Modal */}
      <ChuyenModal
        open={isChuyenModalOpen}
        onClose={closeChuyenModal}
        onSubmit={handleChuyenSubmit}
        mode="add"
      />

      {/* QC Thanh Pham Modal */}
      <QCThanhPhamModal
        open={isQCThanhPhamModalOpen}
        onClose={closeQCThanhPhamModal}
        onSubmit={handleQCThanhPhamSubmit}
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
