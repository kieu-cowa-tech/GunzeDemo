import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  Autocomplete,
} from "@mui/material";
import {
  Search,
  CheckBoxOutlined,
  CancelPresentationOutlined,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { CommonTextField } from "../../components/commons/CommonTextFied";
import type { QCNhuom, Staff, LOTInfo } from "./type";
import { StaffData, LOTData } from "./Data";

// Định nghĩa type cho form data
type QCNhuomFormData = {
  id: number | null;
  ngayNhap: Date | string;
  congNhan: string;
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
  doAm: number;
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
    border: "12px solid #ffffff",
    backgroundColor: "#ffffff",
    padding: 0,
    overflow: "visible",
  },
};

const modalHeaderStyle = {
  backgroundColor: "#ffffff",
  padding: "16px 24px",
  borderBottom: "1px solid #E0E0E0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const modalTitleStyle = {
  fontSize: "40px",
  fontWeight: 700,
  color: "#063E75",
  fontStyle: "normal",
  fontFamily: "'Poppins', sans-serif",
  textAlign: "right",
  lineHeight: "48px",
};
const LotBoxStyle = {
  //backgroundColor: "#F5F5F5",
  padding: "12px 16px",
  borderRadius: "6px",
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  textAlign: "center",
};
const typogKeyStyle = {
  backgroundColor: "#F5F5F5",
  fontSize: "16px",
  fontWeight: 500,
  color: "#666",
  lineHeight: "24px",
  width: "100%",
};
const typogValueStyle = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#333",
  lineHeight: "24px",
};
const typoLabelStyle = {
  fontSize: "20px",
  fontWeight: 700,
  fontStyle: "normal",
  color: "#333",
  lineHeight: "28px",
  mb: 2,
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
  justifyContent: "flex-end",
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
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
    StaffData[0] || null
  );
  const [foundLot, setFoundLot] = useState<LOTInfo | null>(null);
  const [lotSearchError, setLotSearchError] = useState<string>("");
  const [isLotInfoExpanded, setIsLotInfoExpanded] = useState<boolean>(false);

  // Tạo today memoized để tránh warning dependency
  const today = React.useMemo(() => new Date(), []);

  // Hàm format ngày sang dd/MM/yyyy
  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handler để cập nhật cả selectedStaff và form value
  const handleStaffChange = (newStaff: Staff | null) => {
    setSelectedStaff(newStaff);
    // Cập nhật giá trị vào form (lưu tên nhân viên hoặc mã nhân viên)
    setValue("congNhan", newStaff ? newStaff.tenNV : "");
  };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QCNhuomFormData>({
    defaultValues: {
      id: null,
      ngayNhap: formatDateToDDMMYYYY(today),
      congNhan: "",
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
      doAm: 0,
    },
    mode: "onChange",
  });

  // Hàm tìm kiếm Lot nguyên liệu
  const handleLotSearch = () => {
    const lotNguyenLieu = watch("lotNguyenLieu");

    if (!lotNguyenLieu || lotNguyenLieu.trim() === "") {
      setLotSearchError("Vui lòng nhập mã Lot nguyên liệu");
      setFoundLot(null);
      return;
    }

    // Tìm kiếm trong LOTData
    const found = LOTData.find(
      (lot) =>
        lot.maLot.toLowerCase().trim() === lotNguyenLieu.toLowerCase().trim()
    );

    if (found) {
      // Lưu thông tin lot tìm được
      setFoundLot(found);
      setLotSearchError(""); // Xóa lỗi nếu tìm thấy
      setIsLotInfoExpanded(true); // Tự động mở rộng khi tìm thấy

      // Điền thông tin vào các trường ẩn (chuyển đổi từ number sang string)
      setValue("maChi", found.loaiChi);
      setValue("mauChi", found.mauChi.toString());
      setValue("phanLoai", found.phanLoai.toString());
      setValue("nhaCungCap", found.nhaCungCap.toString());

      console.log("Đã tìm thấy và điền thông tin Lot:", found);
    } else {
      setFoundLot(null);
      setLotSearchError(`Không tìm thấy Lot nguyên liệu: ${lotNguyenLieu}`);
    }
  };



  // Reset form khi đóng modal hoặc thay đổi mode
  useEffect(() => {
    if (mode === "edit" && editData) {
      // Fill form với data để edit
      reset({
        id: editData.id,
        ngayNhap: editData.ngayNhap || formatDateToDDMMYYYY(today),
        congNhan: editData.congNhan || "",
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
        doAm: editData.doAm || 0,
      });
      
      // Tìm staff tương ứng để hiển thị trong AsyncAutocomplete
      const staff = StaffData.find(s => s.tenNV === editData.congNhan || s.maNV === editData.congNhan);
      setSelectedStaff(staff || null);
    } else {
      // Reset về giá trị mặc định cho chế độ thêm mới
      reset({
        id: null,
        ngayNhap: formatDateToDDMMYYYY(today),
        congNhan: "",
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
        doAm: 0,
      });
      setSelectedStaff(null);
    }
  }, [mode, editData, reset, today]);

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
  const modalTitle = mode === "add" ? "Kết quả QC Nhuộm" : "Chỉnh Sửa QC Nhuộm";

  return (
    <Dialog open={open} onClose={onClose} sx={modalStyle} maxWidth={false}>
      {/* Modal Header */}
      <Box sx={modalHeaderStyle}>
        <Box
          component="img"
          src={`/assets/QcNhuom.svg`}
          alt="Logo"
          sx={{
            width: { xs: 35, sm: 40, md: 45 },
            height: { xs: 35, sm: 40, md: 45 },
          }}
        />
        <Typography sx={modalTitleStyle}>{modalTitle}</Typography>
      </Box>

      {/* Modal Content */}
      <DialogContent sx={{ padding: 0 }}>
        <Box sx={modalContentStyle}>
          {/* Nhập Lot */}
          <Box
            sx={{ mb: 1, borderBottom: "1px solid #E0E0E0", paddingBottom: 2 }}
          >
            <Typography sx={{ ...typoLabelStyle }}>Nhập Lot no</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <Controller
                name="lotNguyenLieu"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="string"
                    placeholder="Lot no"
                    fullWidth
                    error={!!lotSearchError}
                    helperText={lotSearchError}
                    onChange={(e) => {
                      field.onChange(e);
                      if (lotSearchError) {
                        setLotSearchError(""); // Xóa lỗi khi người dùng bắt đầu nhập
                      }
                    }}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        height: "48px",
                        borderRadius: "6px",
                        backgroundColor: "#FFF",
                        "& fieldset": {
                          borderColor: lotSearchError ? "#d32f2f" : "#CCC",
                        },
                        "&:hover fieldset": {
                          borderColor: lotSearchError ? "#d32f2f" : "#999",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: lotSearchError ? "#d32f2f" : "#007FFF",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 16px",
                        fontSize: "16px",
                        color: "#333",
                        "&::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#d32f2f",
                        fontSize: "14px",
                        marginTop: "4px",
                        marginLeft: "14px",
                      },
                    }}
                  />
                )}
              />

              <Button
                variant="contained"
                onClick={handleLotSearch}
                sx={{
                  minWidth: "120px",
                  height: "48px",
                  backgroundColor: "#007FFF",
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: "6px",
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    backgroundColor: "#0066CC",
                    boxShadow: "none",
                  },
                }}
              >
                Tra cứu <Search sx={{ fontSize: "30px" }} />
              </Button>
            </Box>
          </Box>

          {/* Thông tin lot */}
          <Box
            sx={{ mb: 3, borderBottom: "1px solid #E0E0E0", paddingBottom: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => setIsLotInfoExpanded(!isLotInfoExpanded)}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  fontStyle: "normal",
                  color: "#333",
                  lineHeight: "28px",
                }}
              >
                Thông tin lot
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#666",
                  transition: "all 0.3s ease",
                }}
              >
                {isLotInfoExpanded ? (
                  <ExpandLess sx={{ fontSize: "28px" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "28px" }} />
                )}
              </Box>
            </Box>

            {/* Grid 2x2 cho thông tin với Collapse */}
            <Collapse in={isLotInfoExpanded} timeout={300}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {/* Loại chỉ (kế hoạch) */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>
                    Loại chỉ (kế hoạch)
                  </Typography>
                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.loaiChi}
                    </Typography>
                  )}
                </Box>

                {/* Màu chỉ */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>Màu chỉ</Typography>
                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.mauChi}
                    </Typography>
                  )}
                </Box>

                {/* Phân loại */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>Phân loại</Typography>
                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.phanLoai}
                    </Typography>
                  )}
                </Box>

                {/* Nhà cung cấp nguyên liệu */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>
                    Nhà cung cấp nguyên liệu
                  </Typography>

                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.nhaCungCap}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Collapse>
          </Box>

          {/* Kết quả QC và Người kiểm tra */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box
              sx={{
                mb: 2,
                //borderBottom: "1px solid #E0E0E0",
                paddingBottom: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "flex-end" },
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Typography sx={{ ...typoLabelStyle, mb: 0 }}>
                  Kết quả QC
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    minWidth: { xs: "100%", sm: "350px" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#666",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Người kiểm tra
                  </Typography>
                  <Controller
                    name="congNhan"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete<Staff>
                        {...field}
                        options={StaffData}
                        value={selectedStaff}
                        onChange={(_, newValue) => handleStaffChange(newValue)}
                        getOptionLabel={(staff) => staff.tenNV}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Nhập tên để tìm kiếm..."
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                                fontSize: "14px",
                              },
                            }}
                          />
                        )}
                        sx={{ flex: 1 }}
                      />
                    )}/>
                </Box>
              </Box>
            </Box>

            {/* Thông tin */}
            <Box
              sx={{ backgroundColor: " #D7D7D7", borderRadius: "6px", p: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: "#8dc3faff",
                  height: "24px",
                  borderRadius: "20px",
                  border: "1px solid #8dc3faff",
                }}
              >
                <Typography
                  sx={{
                    ...typoLabelStyle,
                    textAlign: "center",
                    color: "#0A66C2",
                    paddingTop: 2,
                  }}
                >
                  Thông tin cơ bản
                </Typography>
              </Box>
              {/* Row 1*/}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="lotNguyenLieu"
                  control={control}
                  rules={{
                    required: "Lot nguyên liệu là bắt buộc"
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Lot nguyên liệu"
                      placeholder="Nhập lot nguyên liệu"
                      error={!!errors.lotNguyenLieu}
                      helperText={errors.lotNguyenLieu?.message}
                      required={true}
                    />
                  )}
                />
                <Controller
                  name="checkGME"
                  control={control}
                  rules={{
                    required: "Check GME là bắt buộc",
                    min: {
                      value: 0,
                      message: "Check GME phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Check GME"
                      type="number"
                      placeholder="Nhập check GME"
                      error={!!errors.checkGME}
                      helperText={errors.checkGME?.message}
                      required={true}
                    />
                  )}
                />
              </Box>
              {/*  Row  2*/}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="slOk"
                  control={control}
                  rules={{
                    required: "SL OK là bắt buộc",
                    min: {
                      value: 0,
                      message: "SL OK phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="SL OK"
                      type="number"
                      placeholder="Nhập số lượng OK"
                      error={!!errors.slOk}
                      helperText={errors.slOk?.message}
                      required={true}
                    />
                  )}
                />
                <Controller
                  name="doAm"
                  control={control}
                  rules={{
                    required: "Độ ẩm là bắt buộc",
                    min: {
                      value: 0,
                      message: "Độ ẩm phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Độ ẩm"
                      type="number"
                      placeholder="Nhập độ ẩm"
                      error={!!errors.doAm}
                      helperText={errors.doAm?.message}
                      required={true}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="tong"
                  control={control}
                  rules={{
                    required: "Tổng (kg) là bắt buộc",
                    min: {
                      value: 0,
                      message: "Tổng (kg) phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Tổng(kg)"
                      type="number"
                      placeholder="Nhập tổng (kg)"
                      sx={{ height: "10vh" }}
                      error={!!errors.tong}
                      helperText={errors.tong?.message}
                      required={true}
                    />
                  )}
                />
                <Controller
                  name="ghiChu"
                  control={control}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Ghi chú"
                      placeholder="Nhập ghi chú"
                      multiline={true}
                      rows={3}
                      maxRows={6}
                      error={!!errors.ghiChu}
                      helperText={errors.ghiChu?.message}
                    />
                  )}
                />
              </Box>
            </Box>
            {/* LỖi */}
            <Box
              sx={{
                backgroundColor: " #D7D7D7",
                borderRadius: "6px",
                p: 2,
                gap: 12,
                marginTop: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: "#FFECEC",
                  height: "24px",
                  borderRadius: "20px",
                  border: "1px solid #FFECEC",
                }}
              >
                <Typography
                  sx={{
                    ...typoLabelStyle,
                    textAlign: "center",
                    color: "#FF0000",
                    paddingTop: 2,
                  }}
                >
                  Thông tin lỗi
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="slBack"
                  control={control}
                  rules={{
                    required: "SL Back là bắt buộc",
                    min: {
                      value: 0,
                      message: "SL Back phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="SL Back"
                      type="number"
                      placeholder="Nhập số lượng back"
                      error={!!errors.slBack}
                      helperText={errors.slBack?.message}
                      required={true}
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
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="slVutRac"
                  control={control}
                  rules={{
                    required: "SL Vụt rác là bắt buộc",
                    min: {
                      value: 0,
                      message: "SL Vụt rác phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="SL Vụt rác"
                      type="number"
                      placeholder="Nhập số lượng vụt rác"
                      error={!!errors.slVutRac}
                      helperText={errors.slVutRac?.message}
                      required={true}
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
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="slKhac"
                  control={control}
                  rules={{
                    required: "SL Khác là bắt buộc",
                    min: {
                      value: 0,
                      message: "SL Khác phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="SL Khác"
                      type="number"
                      placeholder="Nhập số lượng khác"
                      error={!!errors.slKhac}
                      helperText={errors.slKhac?.message}
                      required={true}
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
            </Box>

            {/* Action Buttons */}
            <Box sx={buttonContainerStyle}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                disabled={loading}
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  borderRadius: "50px",
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
                <CancelPresentationOutlined sx={{ marginLeft: "10px" }} />
              </Button>
              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  borderRadius: "50px",
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
                    ? "Đang Lưu..."
                    : "Đang cập nhật..."
                  : mode === "add"
                  ? "Lưu"
                  : "Cập nhật"}

                <CheckBoxOutlined sx={{ marginLeft: "10px" }} />
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QCNhuomModal;
