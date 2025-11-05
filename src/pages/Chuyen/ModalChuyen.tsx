import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
  Checkbox,
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
import type { LOTInfo } from "../QCNhuom/type";
import { LOTData } from "../QCNhuom/Data";
import type { Chuyen } from "./type";

// Định nghĩa type cho form data - khớp với type Chuyen
export type ChuyenFormData = {
  id: number | null;
  ngayNhap: Date | string;
  congNhan: string;
  ca: number | null;
  maChi: string;
  mauChi: string;
  phanLoai: string;
  nhaCungCap: string;
  cdkl: number | null;
  lotNguyenLieu: string;
  nguyenVatLieu: number | null;
  hetLot: boolean;
  soLuong: number | null;
  racTruLoi: number | null;
  lydo: string;
  tong: number | null;
  trongLuong: number | null;
};

interface ChuyenModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ChuyenFormData) => void;
  editData?: Chuyen | null; // Data để edit, null = thêm mới
  mode: "add" | "edit";
  loading?: boolean; // Trạng thái loading khi submit
}

// Modal styles matching HTML design
const modalStyle = {
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "92vw",
    maxHeight: "85vh",
    border: "12px solid #ffffff",
    backgroundColor: "#ffffff",
    padding: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
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
  gap: 1,
 // alignItems: "flex-center",
  textAlign: "center",
};
const typogKeyStyle = {
  backgroundColor: "#EBEBEB",
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
  overflowY: "auto",
  flex: 1,
};

// Button styles - Footer fixed
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 2,
  height: "88px",
  padding: "16px 24px",
  borderTop: "1px solid #E0E0E0",
  backgroundColor: "#ffffff",
  position: "sticky",
  bottom: 0,
  zIndex: 10,
};

export const ChuyenModal: React.FC<ChuyenModalProps> = ({
  open,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  // const [selectedStaff, setSelectedStaff] = useState<Staff | null>(
  //   StaffData[0] || null
  // );
  const [foundLot, setFoundLot] = useState<LOTInfo | null>(null);
  const [lotSearchError, setLotSearchError] = useState<string>("");
  const [isLotInfoExpanded, setIsLotInfoExpanded] = useState<boolean>(false);
  const [isFormEnabled, setIsFormEnabled] = useState<boolean>(false);

  // Tạo today memoized để tránh warning dependency
  const today = React.useMemo(() => new Date(), []);

  // Hàm format ngày sang dd/MM/yyyy
  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handler để cập nhật cả selectedStaff và form value
  // const handleStaffChange = (newStaff: Staff | null) => {
  //   setSelectedStaff(newStaff);
  //   // Cập nhật giá trị vào form (lưu tên nhân viên hoặc mã nhân viên)
  //   setValue("congNhan", newStaff ? newStaff.tenNV : "");
  // };
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChuyenFormData>({
    defaultValues: {
      id: null,
      ngayNhap: formatDateToDDMMYYYY(today),
      congNhan: "",
      ca: null,
      maChi: "",
      mauChi: "",
      nhaCungCap: "",
      cdkl: null,
      lotNguyenLieu: "",
      nguyenVatLieu: null,
      hetLot: false,
      soLuong: null,
      racTruLoi: null,
      lydo: "",
      tong: null,
      trongLuong: null,
    },
    mode: "onChange",
  });

  // Hàm tìm kiếm Lot nguyên liệu
  const handleLotSearch = () => {
    const lotNguyenLieu = watch("lotNguyenLieu");

    if (!lotNguyenLieu || lotNguyenLieu.trim() === "") {
      setLotSearchError("Vui lòng nhập mã Lot nguyên liệu");
      setFoundLot(null);
      setIsFormEnabled(false);
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
      setIsFormEnabled(true); // Enable form khi tra cứu thành công

      // Điền thông tin vào các trường ẩn (chuyển đổi từ number sang string)
      setValue("maChi", found.loaiChi);
      setValue("mauChi", found.mauChi.toString());
      setValue("nguyenVatLieu", found.nguyenLieu);
      setValue("nhaCungCap", found.nhaCungCap.toString());
      setValue("ca", 2);
      setValue("trongLuong", 19.5);
      setValue("congNhan", "Trần Công Thắng"); // Mặc định công nhân sau khi tra cứu thành công

      console.log("Đã tìm thấy và điền thông tin Lot:", found);
    } else {
      setFoundLot(null);
      setIsFormEnabled(false);
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
        ca: editData.ca || null,
        maChi: editData.maChi || "",
        mauChi: editData.mauChi || "",
        nhaCungCap: editData.nhaCungCap || "",
        cdkl: editData.cdkl || null,
        lotNguyenLieu: editData.lotNguyenLieu || "",
        nguyenVatLieu: editData.nguyenVatLieu || null,
        hetLot: editData.hetLot || false,
        soLuong: editData.soLuong || null,
        racTruLoi: editData.racTruLoi || null,
        lydo: editData.lydo || "",
        tong: editData.tong || null,
        trongLuong: editData.trongLuong || null,
      });

      // Tìm staff tương ứng để hiển thị trong AsyncAutocomplete
      // const staff = StaffData.find(
      //   (s) => s.tenNV === editData.congNhan || s.maNV === editData.congNhan
      // );
      // setSelectedStaff(staff || null);

      // Enable form khi ở chế độ edit
      setIsFormEnabled(true);
    } else {
      // Reset về giá trị mặc định cho chế độ thêm mới
      reset({
        id: null,
        ngayNhap: formatDateToDDMMYYYY(today),
        congNhan: "",
        ca: null,
        maChi: "",
        mauChi: "",
        phanLoai: "",
        nhaCungCap: "",
        cdkl: null,
        lotNguyenLieu: "",
        nguyenVatLieu: null,
        hetLot: false,
        soLuong: null,
        racTruLoi: null,
        lydo: "",
        tong: null,
        trongLuong: null,
      });
      //setSelectedStaff(null);

      // Disable form khi thêm mới
      setIsFormEnabled(false);
      setFoundLot(null);
      setLotSearchError("");
    }
  }, [mode, editData, reset, today]);

  const handleFormSubmit = (data: ChuyenFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };
  // Chặn đóng modal khi click ra ngoài
  const handleDialogClose = (_event: object, reason: string) => {
    if (reason === "backdropClick") {
      return; // Không làm gì khi click vào backdrop
    }
    onClose();
  };

  // Xác định title và button text dựa trên mode
  const modalTitle = mode === "add" ? "Kết quả chuyền" : "Sửa kết quả chuyền";

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      sx={modalStyle}
      maxWidth={false}
    >
      {/* Modal Header */}
      <Box sx={modalHeaderStyle}>
        <Box
          component="img"
          src={`/assets/Chuyen.svg`}
          alt="Logo"
          sx={{
            width: { xs: 35, sm: 40, md: 45 },
            height: { xs: 35, sm: 40, md: 45 },
            paddingRight: 1,
          }}
        />
        <Typography sx={modalTitleStyle}>{modalTitle}</Typography>
      </Box>

      {/* Modal Content */}
      <DialogContent
        sx={{
          padding: 0,
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                        "&.Mui-disabled": {
                          backgroundColor: "#EBEBEB",
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
                    Loại chỉ (mã thành phẩm)
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
                  <Typography sx={{ ...typogKeyStyle }}>Nguyên liệu</Typography>
                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.nguyenLieu}
                    </Typography>
                  )}
                </Box>

                {/* Nhà cung cấp nguyên liệu */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>CD/KL</Typography>

                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.cd_kl}
                    </Typography>
                  )}
                </Box>
                {/* Nhà cung cấp nguyên liệu */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>
                    QC nhuộm OK (kg)
                  </Typography>

                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>90</Typography>
                  )}
                </Box>
              </Box>
            </Collapse>
          </Box>

          {/* Kết quả QC và Người kiểm tra */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* <Box
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
                {/* <Typography sx={{ ...typoLabelStyle, mb: 0 }}>
                  Kết quả QC
                </Typography> }
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
                        disabled={!isFormEnabled}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Nhập tên để tìm kiếm..."
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                                fontSize: "14px",
                                backgroundColor: !isFormEnabled
                                  ? "#EBEBEB"
                                  : "#FFF",
                              },
                            }}
                          />
                        )}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box> */}

            {/* Thông tin */}
            <Box
              sx={{ backgroundColor: " #F4F5FA", borderRadius: "6px", p: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: "#E6F0FA",
                  height: "24px",
                  borderRadius: "20px",
                  border: "1px solid #E6F0FA",
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
                  Kết quả chuyền
                </Typography>
              </Box>
              {/* Row 1: Ca và CDKL */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="soLuong"
                  control={control}
                  rules={{
                    required: "Số lượng là bắt buộc",
                    min: {
                      value: 0,
                      message: "Số lượng phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng (cuộn)"
                      type="number"
                      placeholder="Nhập số lượng"
                      error={!!errors.soLuong}
                      helperText={errors.soLuong?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="tong"
                  control={control}
                  rules={{
                    required: "Tổng là bắt buộc",
                    min: {
                      value: 0,
                      message: "Tổng phải lớn hơn 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Tổng khối lượng (kg)"
                      type="number"
                      placeholder="Nhập tổng khối lượng"
                      error={!!errors.tong}
                      helperText={errors.tong?.message}
                      required={true}
                      disabled={!isFormEnabled || true}
                    />
                  )}
                />
              </Box>
              {/* Row 2: Nguyên vật liệu và Hết lot */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="racTruLoi"
                  control={control}
                  rules={{
                    required: "Rác trừ lỗi là bắt buộc",
                    min: {
                      value: 0,
                      message: "Rác trừ lỗi phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Rác trừ lỗi"
                      type="number"
                      placeholder="Nhập rác trừ lỗi"
                      error={!!errors.racTruLoi}
                      helperText={errors.racTruLoi?.message}
                      onBlur={()=>{
                        const valueTrongLuong=(19.5+ (Number(field.value) || 0));
                        setValue("tong", valueTrongLuong );
                      }}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="lydo"
                  control={control}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Lý do"
                      type="text"
                      placeholder="Nhập lý do"
                      error={!!errors.lydo}
                      helperText={errors.lydo?.message}
                      //multiline={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
              </Box>
              {/* Row 3: Số lượng và Rác trừ lỗi */}
              {/* <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="soLuong"
                  control={control}
                  rules={{
                    required: "Số lượng là bắt buộc",
                    min: {
                      value: 0,
                      message: "Số lượng phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng"
                      type="number"
                      placeholder="Nhập số lượng"
                      error={!!errors.soLuong}
                      helperText={errors.soLuong?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="racTruLoi"
                  control={control}
                  rules={{
                    required: "Rác trừ lỗi là bắt buộc",
                    min: {
                      value: 0,
                      message: "Rác trừ lỗi phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Rác trừ lỗi"
                      type="number"
                      placeholder="Nhập rác trừ lỗi"
                      error={!!errors.racTruLoi}
                      helperText={errors.racTruLoi?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
              </Box>
              {/* Row 4: Tổng và Trọng lượng 
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
                    required: "Tổng là bắt buộc",
                    min: {
                      value: 0,
                      message: "Tổng phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Tổng"
                      type="number"
                      placeholder="Nhập tổng"
                      error={!!errors.tong}
                      helperText={errors.tong?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="trongLuong"
                  control={control}
                  rules={{
                    required: "Trọng lượng là bắt buộc",
                    min: {
                      value: 0,
                      message: "Trọng lượng phải lớn hơn hoặc bằng 0",
                    },
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Trọng lượng"
                      type="number"
                      placeholder="Nhập trọng lượng"
                      error={!!errors.trongLuong}
                      helperText={errors.trongLuong?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
              </Box> */}

              {/* Row 5: Lý do */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="trongLuong"
                  control={control}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Trọng lượng (kg)"
                      placeholder="Nhập trọng lượng"
                      type="number"
                      error={!!errors.trongLuong}
                      helperText={errors.trongLuong?.message}
                      disabled={!isFormEnabled ||true}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="hetLot"
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={!isFormEnabled} />
                          <Typography sx={{...typogKeyStyle}}> Kết thúc lot</Typography>
                          </Box>
                  )}
                />
              </Box>
            </Box>
          </form>
        </Box>

        {/* Action Buttons - Fixed Footer */}
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
              height: "48px",
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
            disabled={loading || !isFormEnabled}
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              borderRadius: "50px",
              minWidth: "120px",
              height: "48px",
              px: 3,
              py: 1.5,
              backgroundColor: "#002194",
              "&:hover": {
                backgroundColor: "rgba(0, 33, 148, 0.8)",
              },
              "&.Mui-disabled": {
                backgroundColor: "#CCCCCC",
                color: "#EBEBEB",
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
      </DialogContent>
    </Dialog>
  );
};

export default ChuyenModal;
