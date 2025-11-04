import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material";

interface CommonTextFieldProps extends Omit<TextFieldProps, "variant" | "fullWidth"> {
  /**
   * Label hiển thị phía trên input
   */
  label: string;

  /**
   * Trường bắt buộc - hiển thị dấu * đỏ
   */
  required?: boolean;

  /**
   * Đơn vị đo hiển thị ở cuối input (nếu có)
   */
  unit?: string;

  /**
   * Hiển thị icon dropdown ở cuối đơn vị (mặc định: true khi có unit)
   */
  showDropdownIcon?: boolean;

  /**
   * Custom endAdornment (override unit và dropdown icon)
   */
  customEndAdornment?: React.ReactNode;

  /**
   * Styles cho container
   */
  containerSx?: object;

  /**
   * Styles cho label
   */
  labelSx?: object;

  /**
   * Cho phép nhập nhiều dòng
   */
  multiline?: boolean;

  /**
   * Số dòng hiển thị (chỉ áp dụng khi multiline = true)
   */
  rows?: number;

  /**
   * Số dòng tối đa (chỉ áp dụng khi multiline = true)
   */
  maxRows?: number;

  /**
   * Thông báo lỗi hoặc trợ giúp
   */
  helperText?: React.ReactNode;

  /**
   * Hiển thị trạng thái lỗi
   */
  error?: boolean;
}

// Styles cho container bao bọc toàn bộ
const getDefaultContainerStyle = (hasError: boolean) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "58px",
  padding: "8px 12px",
  gap: "4px",
  borderRadius: "6px",
  border: hasError ? "1px solid #d32f2f" : "1px solid #CCC",
  backgroundColor: "#FFF",
  "&:hover": {
    border: hasError ? "1px solid #d32f2f" : "1px solid #999",
  },
  "&:focus-within": {
    border: hasError ? "1px solid #d32f2f" : "1px solid #007FFF", // Màu khác khi focus
  },
  "& .MuiInputLabel-root": {
    display: "none", // Ẩn label mặc định của MUI
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Bỏ viền của TextField
    },
    "&:hover fieldset": {
      border: "none", 
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "0",
    fontSize: "16px",
    color: "#4E4E4E",
    fontWeight: 400,
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
});


export const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  required = false,
  unit,
  showDropdownIcon = false,
  customEndAdornment: propCustomEndAdornment,
  containerSx,
  InputProps,
  multiline = false,
  rows,
  maxRows,
  helperText,
  error = false,
  ...textFieldProps
}) => {
  const mergedContainerSx = {
    ...getDefaultContainerStyle(error),
    ...containerSx,
  };

  // Tạo endAdornment chỉ cho unit và dropdown
  const getEndAdornment = () => {
    if (propCustomEndAdornment) {
      return propCustomEndAdornment;
    }
    
    if (unit) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showDropdownIcon && (
            <ArrowDownIcon sx={{ color: "#999", fontSize: "16px" }} />
          )}
        </Box>
      );
    }
    
    // Default dropdown icon
    return <></>;
  };

  const finalInputProps = {
    ...InputProps,
    endAdornment: getEndAdornment()
  };

  return (
    <Box>
      <Box sx={mergedContainerSx}>
        {/* Label và required badge ở phía trên */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ 
            fontSize: "12px", 
            fontWeight: 500, 
            fontStyle: "normal",
            color: error ? "#d32f2f" : "#666"
          }}>
            {label}
          </Typography>
          
          {required && (
            <Box sx={{
              backgroundColor: "#FF9191",
              color: "white",
              fontSize: "12px",
              fontWeight: 400,
              padding: "2px 8px",
              borderRadius: "12px",
              whiteSpace: "nowrap"
            }}>
              phải nhập
            </Box>
          )}
        </Box>
        
        {/* Input field không có border */}
        <TextField
          {...textFieldProps}
          fullWidth
          variant="outlined"
          placeholder={`Nhập ${label.toLowerCase()}`}
          InputProps={finalInputProps}
          multiline={multiline}
          rows={rows}
          maxRows={maxRows}
        />
      </Box>
      
      {/* Helper text hiển thị bên ngoài container */}
      {helperText && (
        <Typography
          sx={{
            color: error ? "#d32f2f" : "#666",
            fontSize: "12px",
            fontWeight: 400,
            marginTop: "4px",
            marginLeft: "14px",
            lineHeight: "14px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CommonTextField;
