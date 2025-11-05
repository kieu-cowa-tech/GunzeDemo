import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  TextField,
  Collapse,
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
import { CommonAutoComplete } from "../../components/commons/AutoComplete/AutoComplete";
import type { LOTInfo } from "../QCNhuom/type";
import { LOTData } from "../QCNhuom/Data";
import type { QCThanhPham } from "./type";

// Định nghĩa type cho form data
export type QCThanhPhamFormData = {
    id: number | null;
    ngayNhap: Date | string;
    lotNo: string;
    maChi: string;
    mauChi: string;
    lotThanhPham: string;
    soCuon: number | string;
    soCuonOk: number | string;
    congNhan: string;
    maLoi1: string;
    loiCuon1: number | string;
    maLoi2: string;
    loiCuon2: number | string;
    maLoi3: string;
    loiCuon3: number | string;
    maLoi4: string;
    loiCuon4: number | string;
    quyCach: string;
    khoiLuong: number | string;
    cd_kl: number | string;
    maChiKH: string;
    rac: number | string;
    ghiChu: string;
};

interface QCThanhPhamModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: QCThanhPhamFormData) => void;
  editData?: QCThanhPham | null; // Data để edit, null = thêm mới
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
  gap: 0.5,
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
  padding: "20px 36px",
  borderTop: "1px solid #E0E0E0",
  backgroundColor: "#ffffff",
  position: "sticky",
  alignSelf: "stretch",
  bottom: 0,
  zIndex: 10,
};

export const QCThanhPhamModal: React.FC<QCThanhPhamModalProps> = ({
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
  } = useForm<QCThanhPhamFormData>({
    defaultValues: {
      id: null,
      ngayNhap: formatDateToDDMMYYYY(today),
      lotNo: "",
      maChi: "",
      mauChi: "",
      lotThanhPham: "",
      soCuon: "",
      soCuonOk: "",
      congNhan: "",
      maLoi1: "",
      loiCuon1: "",
      maLoi2: "",
      loiCuon2: "",
      maLoi3: "",
      loiCuon3: "",
      maLoi4: "",
      loiCuon4: "",
      quyCach: "",
      khoiLuong: "",
      cd_kl: "",
      maChiKH: "",
      rac: "",
      ghiChu: "",
    },
    mode: "onChange",
  });

  // Hàm tìm kiếm Lot nguyên liệu
  const handleLotSearch = () => {
    const lotNo = watch("lotNo");

    if (!lotNo || lotNo.trim() === "") {
      setLotSearchError("Vui lòng nhập mã Lot no");
      setFoundLot(null);
      setIsFormEnabled(false);
      return;
    }

    // Tìm kiếm trong LOTData
    const found = LOTData.find(
      (lot) =>
        lot.maLot.toLowerCase().trim() === lotNo.toLowerCase().trim()
    );

    if (found) {
      // Lưu thông tin lot tìm được
      setFoundLot(found);
      setLotSearchError(""); // Xóa lỗi nếu tìm thấy
      setIsLotInfoExpanded(true); // Tự động mở rộng khi tìm thấy
      setIsFormEnabled(true); // Enable form khi tra cứu thành công

      // Điền thông tin vào các trường (chuyển đổi từ number sang string)
      setValue("maChi", found.loaiChi);
      setValue("mauChi", found.mauChi.toString());
      setValue("congNhan", "Thắng");
      setValue("quyCach", found.quyCach);
      setValue("khoiLuong", 650);
      setValue("cd_kl", found.cd_kl.toString());
      setValue("maChiKH", found.loaiChi);

      console.log("Đã tìm thấy và điền thông tin Lot:", found);
    } else {
      setFoundLot(null);
      setIsFormEnabled(false);
      setLotSearchError(`Không tìm thấy Lot no: ${lotNo}`);
    }
  };



  // Reset form khi đóng modal hoặc thay đổi mode
  useEffect(() => {
    if (mode === "edit" && editData) {
      // Fill form với data để edit
      reset({
        id: editData.id,
        ngayNhap: editData.ngayNhap || formatDateToDDMMYYYY(today),
        lotNo: editData.lotNo || "",
        maChi: editData.maChi || "",
        mauChi: editData.mauChi || "",
        lotThanhPham: editData.lotThanhPham || "",
        soCuon: editData.soCuon || 0,
        soCuonOk: editData.soCuonOk || 0,
        congNhan: editData.congNhan || "",
        maLoi1: editData.maLoi1 || "",
        loiCuon1: editData.loiCuon1 || 0,
        maLoi2: editData.maLoi2 || "",
        loiCuon2: editData.loiCuon2 || 0,
        maLoi3: editData.maLoi3 || "",
        loiCuon3: editData.loiCuon3 || 0,
        maLoi4: editData.maLoi4 || "",
        loiCuon4: editData.loiCuon4 || 0,
        quyCach: editData.quyCach || "",
        khoiLuong: editData.khoiLuong || 0,
        cd_kl: editData.cd_kl || 0,
        maChiKH: editData.maChiKH || "",
        rac: editData.rac || 0,
      });
      
      // Tìm staff tương ứng để hiển thị trong AsyncAutocomplete
      // const staff = StaffData.find(s => s.tenNV === editData.congNhan || s.maNV === editData.congNhan);
      // setSelectedStaff(staff || null);
      
      // Enable form khi ở chế độ edit
      setIsFormEnabled(true);
    } else {
      // Reset về giá trị mặc định cho chế độ thêm mới
      reset({
        id: null,
        ngayNhap: formatDateToDDMMYYYY(today),
        lotNo: "",
        maChi: "",
        mauChi: "",
        lotThanhPham: "",
        soCuon: "",
        soCuonOk: "",
        congNhan: "",
        maLoi1: "",
        loiCuon1: "",
        maLoi2: "",
        loiCuon2: "",
        maLoi3: "",
        loiCuon3: "",
        maLoi4: "",
        loiCuon4: "",
        quyCach: "",
        khoiLuong: "",
        cd_kl: "",
        maChiKH: "",
        rac: "",
      });
      //setSelectedStaff(null);
      
      // Disable form khi thêm mới
      setIsFormEnabled(false);
      setFoundLot(null);
      setLotSearchError("");
    }
  }, [mode, editData, reset, today]);

  const handleFormSubmit = (data: QCThanhPhamFormData) => {
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
    if (reason === 'backdropClick') {
      return; // Không làm gì khi click vào backdrop
    }
    onClose();
  };


  // Xác định title và button text dựa trên mode
  const modalTitle = mode === "add" ? "Kết quả QC thành phẩm" : "Chỉnh Sửa QC thành phẩm";

  return (
    <Dialog open={open} onClose={handleDialogClose} sx={modalStyle} maxWidth={false}>
      {/* Modal Header */}
      <Box sx={modalHeaderStyle}>
        <Box
          component="img"
          src={`/assets/QCThanhPham.svg`}
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
      <DialogContent sx={{ padding: 0, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
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
                name="lotNo"
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
                    Mã chỉ
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

                {/* Mã chỉ khách hàng */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>Mã chỉ khách hàng</Typography>
                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.loaiChi}
                    </Typography>
                  )}
                </Box>

                {/* Nhà cung cấp nguyên liệu */}
                <Box sx={{ ...LotBoxStyle }}>
                  <Typography sx={{ ...typogKeyStyle }}>
                    Quy cách
                  </Typography>

                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      {foundLot.quyCach}
                    </Typography>
                  )}
                </Box>
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
                    Khối lượng (kg)
                  </Typography>

                  {foundLot && (
                    <Typography sx={{ ...typogValueStyle }}>
                      650
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
                  Kết quả QC thành phẩm
                </Typography>
                {/* <Box
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
                                backgroundColor: !isFormEnabled ? "#EBEBEB" : "#FFF",
                              },
                            }}
                          />
                        )}
                        sx={{ flex: 1 }}
                      />
                    )}/>
                </Box> */}
              </Box>
            </Box>

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
                  Thông tin cơ bản
                </Typography>
              </Box>
              {/* Row 1 - Lot Thành Phẩm & Số Cuộn */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="lotThanhPham"
                  control={control}
                  rules={{
                    required: "Lot thành phẩm là bắt buộc"
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Mã lot thành phẩm"
                      placeholder="Nhập mã lot thành phẩm"
                      error={!!errors.lotThanhPham}
                      helperText={errors.lotThanhPham?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                
              </Box>
              {/* Row 2 - Quy Cách & Khối Lượng */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="soCuon"
                  control={control}
                  rules={{
                    required: "Số cuộn kiểm tra là bắt buộc",
                    min: {
                      value: 0,
                      message: "Số cuộn kiểm tra phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số cuộn kiểm tra"
                      type="number"
                      placeholder="Nhập số cuộn"
                      error={!!errors.soCuon}
                      helperText={errors.soCuon?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="soCuonOk"
                  control={control}
                  rules={{
                    required: "Số cuộn OK là bắt buộc",
                    min: {
                      value: 0,
                      message: "Số cuộn OK phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số cuộn OK"
                      type="number"
                      placeholder="Nhập số cuộn OK"
                      error={!!errors.khoiLuong}
                      helperText={errors.khoiLuong?.message}
                      required={true}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Thông tin lỗi */}
            <Box
              sx={{
                backgroundColor: " #F4F5FA",
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
              {/* Lỗi 1 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="loiCuon1"
                  control={control}
                  rules={{
                    min: {
                      value: 0,
                      message: "Số lượng NG 1 phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng NG 1"
                      type="number"
                      placeholder="Nhập số lượng NG 1"
                      error={!!errors.loiCuon1}
                      helperText={errors.loiCuon1?.message}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="maLoi1"
                  control={control}
                  render={({ field }) => (
                    <CommonAutoComplete
                      {...field}
                      label="Mã lỗi 1"
                      placeholder="Nhập mã lỗi 1"
                      error={!!errors.maLoi1}
                      helperText={errors.maLoi1?.message}
                      disabled={!isFormEnabled}
                      options={["Lỗi Nhuộm","Máy Hỏng","Lỗi Chỉ","Lỗi Khác"]}
                      onChange={(_, value) => field.onChange(value)}
                    />
                  )}
                />
              </Box>
              {/* Lỗi 2 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
              <Controller
                  name="loiCuon2"
                  control={control}
                  rules={{
                    min: {
                      value: 0,
                      message: "Số lượng NG 2 phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng NG 2"
                      type="number"
                      placeholder="Nhập số lượng NG 2"
                      error={!!errors.loiCuon2}
                      helperText={errors.loiCuon2?.message}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="maLoi2"
                  control={control}
                  render={({ field }) => (
                    <CommonAutoComplete
                      {...field}
                      label="Mã lỗi 2"
                      placeholder="Nhập mã lỗi 2"
                      error={!!errors.maLoi2}
                      helperText={errors.maLoi2?.message}
                      disabled={!isFormEnabled}
                      options={["Lỗi Nhuộm","Máy Hỏng","Lỗi Chỉ","Lỗi Khác"]}
                      onChange={(_, value) => field.onChange(value)}
                    />
                  )}
                />
              </Box>
              {/* Lỗi 3 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="loiCuon3"
                  control={control}
                  rules={{
                    min: {
                      value: 0,
                      message: "Số lượng NG 1 phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng NG 3"
                      type="number"
                      placeholder="Nhập số lượng NG 3"
                      error={!!errors.loiCuon3}
                      helperText={errors.loiCuon3?.message}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="maLoi3"
                  control={control}
                  render={({ field }) => (
                    <CommonAutoComplete
                      {...field}
                      label="Mã lỗi 3"
                      placeholder="Nhập mã lỗi 3"
                      error={!!errors.maLoi3}
                      helperText={errors.maLoi3?.message}
                      disabled={!isFormEnabled}
                      options={["Lỗi Nhuộm","Máy Hỏng","Lỗi Chỉ","Lỗi Khác"]}
                      onChange={(_, value) => field.onChange(value)}
                    />
                  )}
                />
              </Box>
              {/* Lỗi 4 */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  mt: 3,
                }}
              >
                <Controller
                  name="loiCuon4"
                  control={control}
                  rules={{
                    min: {
                      value: 0,
                      message: "Số lượng NG 4 phải lớn hơn hoặc bằng 0"
                    }
                  }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Số lượng NG 4"
                      type="number"
                      placeholder="Nhập số lượng NG 4"
                      error={!!errors.loiCuon4}
                      helperText={errors.loiCuon4?.message}
                      disabled={!isFormEnabled}
                    />
                  )}
                />
                <Controller
                  name="maLoi4"
                  control={control}
                  render={({ field }) => (
                    <CommonAutoComplete
                      {...field}
                      label="Mã lỗi 4"
                      placeholder="Nhập mã lỗi 4"
                      error={!!errors.maLoi4}
                      helperText={errors.maLoi4?.message}
                      disabled={!isFormEnabled}
                      options={["Lỗi Nhuộm","Máy Hỏng","Lỗi Chỉ","Lỗi Khác"]}
                      onChange={(_, value) => field.onChange(value)}
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
                  name="rac"
                  control={control}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      label="Rác (kg)"
                      placeholder="Nhập rác"
                      error={!!errors.rac}
                      helperText={errors.rac?.message}
                      disabled={!isFormEnabled}
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
                      error={!!errors.ghiChu}
                      multiline={true}
                      rows={2}
                      helperText={errors.ghiChu?.message}
                      disabled={!isFormEnabled}
                    />
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
              height: "48px",
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
            disabled={loading || !isFormEnabled}
            sx={{
              fontSize: "18px",
              height: "48px",
              fontWeight: 500,
              borderRadius: "50px",
              minWidth: "120px",
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

export default QCThanhPhamModal;
