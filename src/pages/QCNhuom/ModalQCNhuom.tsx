import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { CommonTextField } from "../../components/commons/CommonTextFied";
import type { QCNhuom } from "./type";

// Định nghĩa type cho form data
type QCNhuomFormData = {
  id: number | null;
  maChi: string;
  mauChi: string;
  phanLoai: string;
  nhaCungCap: string;
  lotNguyenLieu: string;
  checkGME: number;
  slOk: number;
  tong: number;
  ghiChu: string;
  slBack: number;
  pDBlack: string;
  slVutRac: number;
  pDVutRac: string;
  slKhac: number;
  pĐKhac: string;
};

interface QCNhuomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: QCNhuomFormData) => void;
  editData?: QCNhuom | null; // Data để edit, null = thêm mới
  mode: "add" | "edit";
  loading?: boolean; // Trạng thái loading khi submit
}

// Modal styles matching HTML design
const modalStyle = {
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "90vw",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    padding: 0,
    overflow: "visible",
  },
};

const modalHeaderStyle = {
  backgroundColor: "#0A66C2",
  padding: "16px 24px",
  borderBottom: "1px solid #E0E0E0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const modalTitleStyle = {
  fontSize: "28px",
  fontWeight: 700,
  color: "#FFF",
  fontStyle: "normal",
  fontFamily: "'Poppins', sans-serif",
  textAlign: "right",
  lineHeight: "34px",
};

const modalContentStyle = {
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

// Button styles
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 2,
  marginTop: 2,
  padding: "16px 0",
};

export const QCNhuomModal: React.FC<QCNhuomModalProps> = ({
  open,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QCNhuomFormData>({
    defaultValues: {
      id: null,
      maChi: "",
      mauChi: "",
      phanLoai: "",
      nhaCungCap: "",
      lotNguyenLieu: "",
      checkGME: 0,
      slOk: 0,
      tong: 0,
      ghiChu: "",
      slBack: 0,
      pDBlack: "",
      slVutRac: 0,
      pDVutRac: "",
      slKhac: 0,
      pĐKhac: "",
    },
  });

  // Reset form khi đóng modal hoặc thay đổi mode
  useEffect(() => {
    if (mode === "edit" && editData) {
      // Fill form với data để edit
      reset({
        id: editData.id,
        maChi: editData.maChi || "",
        mauChi: editData.mauChi || "",
        phanLoai: editData.phanLoai || "",
        nhaCungCap: editData.nhaCungCap || "",
        lotNguyenLieu: editData.lotNguyenLieu || "",
        checkGME: editData.checkGME || 0,
        slOk: editData.slOk || 0,
        tong: editData.tong || 0,
        ghiChu: editData.ghiChu || "",
        slBack: editData.slBack || 0,
        pDBlack: editData.pDBlack || "",
        slVutRac: editData.slVutRac || 0,
        pDVutRac: editData.pDVutRac || "",
        slKhac: editData.slKhac || 0,
        pĐKhac: editData.pĐKhac || "",
      });
    } else {
      // Reset về giá trị mặc định cho chế độ thêm mới
      reset({
        id: null,
        maChi: "",
        mauChi: "",
        phanLoai: "",
        nhaCungCap: "",
        lotNguyenLieu: "",
        checkGME: 0,
        slOk: 0,
        tong: 0,
        ghiChu: "",
        slBack: 0,
        pDBlack: "",
        slVutRac: 0,
        pDVutRac: "",
        slKhac: 0,
        pĐKhac: "",
      });
    }
  }, [mode, editData, reset]);

  const handleFormSubmit = (data: QCNhuomFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  // Xác định title và button text dựa trên mode
  const modalTitle =
    mode === "add" ? "Nhập kết quả QC Nhuộm" : "Chỉnh Sửa QC Nhuộm";

  return (
    <Dialog open={open} onClose={onClose} sx={modalStyle} maxWidth={false}>
      {/* Modal Header */}
      <Box sx={modalHeaderStyle}>
        <Typography sx={modalTitleStyle}>{modalTitle}</Typography>
      </Box>

      {/* Modal Content */}
      <DialogContent sx={{ padding: 0 }}>
        <Box sx={modalContentStyle}>
          {/* Nhập Lot */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#333",
              }}
            >
              Lot nguyên liệu
            </Typography>
            <Controller
              name="lotNguyenLieu"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="string"
                  label="Lot nguyên liệu"
                  placeholder="Nhập lot nguyên liệu"
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleFormSubmit)}
              sx={{
                height: "full-content",
                alignSelf: "end",
                mb: 1,
                width: "120px",
              }}
            >
              Tra cứu <Search sx={{ marginLeft: 1 }} />
            </Button>
          </Box>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* First Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Controller
                name="maChi"
                control={control}
                rules={{ required: "Mã chỉ là bắt buộc" }}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Mã chỉ"
                    placeholder="Nhập mã chỉ"
                    error={!!errors.maChi}
                    helperText={errors.maChi?.message}
                    required={true}
                  />
                )}
              />
              <Controller
                name="mauChi"
                control={control}
                rules={{ required: "Màu chỉ là bắt buộc" }}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Màu chỉ"
                    placeholder="Nhập màu chỉ"
                    error={!!errors.mauChi}
                    helperText={errors.mauChi?.message}
                    required={true}
                  />
                )}
              />
            </Box>

            {/* Second Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="phanLoai"
                control={control}
                rules={{ required: "Phân loại là bắt buộc" }}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Phân loại"
                    placeholder="Nhập phân loại"
                    error={!!errors.phanLoai}
                    helperText={errors.phanLoai?.message}
                    required={true}
                  />
                )}
              />

              <Controller
                name="nhaCungCap"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Nhà cung cấp"
                    placeholder="Nhập nhà cung cấp"
                    error={!!errors.nhaCungCap}
                    helperText={errors.nhaCungCap?.message}
                  />
                )}
              />
            </Box>

            {/* Third Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="lotNguyenLieu"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Lot nguyên liệu"
                    placeholder="Nhập lot nguyên liệu"
                    error={!!errors.lotNguyenLieu}
                    helperText={errors.lotNguyenLieu?.message}
                  />
                )}
              />
              <Controller
                name="checkGME"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Check GME"
                    type="number"
                    placeholder="Nhập check GME"
                    error={!!errors.checkGME}
                    helperText={errors.checkGME?.message}
                  />
                )}
              />
            </Box>
            {/* 4 Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="slOk"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="SL OK"
                    type="number"
                    placeholder="Nhập số lượng OK"
                    error={!!errors.slOk}
                    helperText={errors.slOk?.message}
                  />
                )}
              />
              <Controller
                name="tong"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Tổng"
                    type="number"
                    placeholder="Nhập tổng"
                    error={!!errors.tong}
                    helperText={errors.tong?.message}
                  />
                )}
              />
            </Box>
            {/* 5 Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="slBack"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="SL Back"
                    type="number"
                    placeholder="Nhập số lượng back"
                    error={!!errors.slBack}
                    helperText={errors.slBack?.message}
                  />
                )}
              />
              <Controller
                name="pDBlack"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="PD Black"
                    placeholder="Nhập PD Black"
                    error={!!errors.pDBlack}
                    helperText={errors.pDBlack?.message}
                  />
                )}
              />
            </Box>

            {/* 6 Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="slVutRac"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="SL Vụt rác"
                    type="number"
                    placeholder="Nhập số lượng vụt rác"
                    error={!!errors.slVutRac}
                    helperText={errors.slVutRac?.message}
                  />
                )}
              />
              <Controller
                name="pDVutRac"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="PD Vụt rác"
                    placeholder="Nhập PD vụt rác"
                    error={!!errors.pDVutRac}
                    helperText={errors.pDVutRac?.message}
                  />
                )}
              />
            </Box>

            {/* 7 Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Controller
                name="slKhac"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="SL Khác"
                    type="number"
                    placeholder="Nhập số lượng khác"
                    error={!!errors.slKhac}
                    helperText={errors.slKhac?.message}
                  />
                )}
              />
              <Controller
                name="pĐKhac"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="PĐ Khác"
                    placeholder="Nhập PĐ khác"
                    error={!!errors.pĐKhac}
                    helperText={errors.pĐKhac?.message}
                  />
                )}
              />
            </Box>

            {/* 8 Row - Ghi chú */}
            <Box sx={{ mt: 3 }}>
              <Controller
                name="ghiChu"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    label="Ghi chú"
                    placeholder="Nhập ghi chú"
                    multiline
                    rows={3}
                    error={!!errors.ghiChu}
                    helperText={errors.ghiChu?.message}
                  />
                )}
              />
            </Box>

            {/* Action Buttons */}
            <Box sx={buttonContainerStyle}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                sx={{
                  minWidth: "120px",
                  px: 3,
                  py: 1.5,
                  borderColor: "#E0E0E0",
                  color: "#333333",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    borderColor: "#E0E0E0",
                  },
                }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  minWidth: "120px",
                  px: 3,
                  py: 1.5,
                  backgroundColor: "#002194",
                  "&:hover": {
                    backgroundColor: "rgba(0, 33, 148, 0.8)",
                  },
                }}
                onClick={handleSubmit(handleFormSubmit)}
              >
                {loading
                  ? mode === "add"
                    ? "Đang thêm..."
                    : "Đang cập nhật..."
                  : mode === "add"
                  ? "Thêm mới"
                  : "Cập nhật"}
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QCNhuomModal;
