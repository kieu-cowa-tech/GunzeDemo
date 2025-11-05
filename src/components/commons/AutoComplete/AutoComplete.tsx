import React from "react";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";
import type { AutocompleteProps } from "@mui/material";

interface CommonAutoCompleteProps<T = unknown> extends Omit<AutocompleteProps<T, false, false, false>, "renderInput"> {
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
   * Thông báo lỗi hoặc trợ giúp
   */
  helperText?: React.ReactNode;

  /**
   * Hiển thị trạng thái lỗi
   */
  error?: boolean;

  /**
   * Placeholder cho input
   */
  placeholder?: string;
}

// Styles cho container bao bọc toàn bộ
const getDefaultContainerStyle = (hasError: boolean, isDisabled: boolean) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minHeight: "58px",
  padding: "8px 12px",
  gap: "4px",
  borderRadius: "6px",
  border: hasError ? "1px solid #d32f2f" : "1px solid #CCC",
  backgroundColor: isDisabled ? "#EBEBEB" : "#FFF",
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


export const CommonAutoComplete = <T,>({
  label,
  required = false,
  unit,
  showDropdownIcon = false,
  customEndAdornment: propCustomEndAdornment,
  containerSx,
  helperText,
  error = false,
  placeholder,
  disabled = false,
  ...autocompleteProps
}: CommonAutoCompleteProps<T>) => {
  const mergedContainerSx = {
    ...getDefaultContainerStyle(error, !!disabled),
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
    return null;
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
        
        {/* Autocomplete với TextField bên trong */}
        <Autocomplete
          {...autocompleteProps}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {getEndAdornment()}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
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
            letterSpacing: "0%",
           // padding: "-2px 0 0 0",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CommonAutoComplete;
