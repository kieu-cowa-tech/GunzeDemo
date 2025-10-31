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
}

// Styles cho container bao bọc toàn bộ
const defaultContainerStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "58px",
  padding: "8px 12px",
  gap: "4px",
  borderRadius: "6px",
  border: "1px solid #CCC",
  backgroundColor: "#FFF",
  "&:hover": {
    border: "1px solid #CCC",
  },
  "&:focus-within": {
    border: "1px solid #007FFF", // Màu khác khi focus
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
    fontSize: "14px",
    color: "#4E4E4E",
    fontWeight: 400,
    "&::placeholder": {
      color: "#999999",
      opacity: 1,
    },
  },
};


export const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  required = false,
  unit,
  showDropdownIcon = true,
  customEndAdornment: propCustomEndAdornment,
  containerSx,
  InputProps,
  ...textFieldProps
}) => {
  const mergedContainerSx = {
    ...defaultContainerStyle,
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
    return <ArrowDownIcon sx={{ color: "#999", fontSize: "20px" }} />;
  };

  const finalInputProps = {
    ...InputProps,
    endAdornment: getEndAdornment()
  };

  return (
    <Box sx={mergedContainerSx}>
      {/* Label và required badge ở phía trên */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ 
          fontSize: "14px", 
          fontWeight: 500, 
          color: "#333"
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
      />
    </Box>
  );
};

export default CommonTextField;
