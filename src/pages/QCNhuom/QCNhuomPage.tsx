import { useEffect } from "react";
import { useQCNhuomStore } from "./store";
import type { QCNhuom } from "./type";
import { createDataTableStore } from "../../components/commons/Table/tableStore";
import { CommonTable } from "../../components/commons/Table/CommonTable";
import type { Column, RowAction } from "../../components/commons/Table/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { QCNhuomData } from "./Data";
import { Box, useTheme, useMediaQuery, Typography, Paper } from "@mui/material";

export default function QCNhuomPage() {
  const { items, updateItem, removeItem } = useQCNhuomStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const qCNhuomTableStore = createDataTableStore<QCNhuom>({
    pageSize: isMobile ? 5 : 10,
    sortBy: "lastUpdateAt",
    sortDir: "desc",
  });

  useEffect(() => {
    qCNhuomTableStore.getState().setData(items ?? QCNhuomData, items.length ?? QCNhuomData.length);
  }, [items, qCNhuomTableStore]);
console.log("items", items);
  // Responsive columns based on screen size
  const getAllColumns = (): Column<QCNhuom>[] => [
    { key: "importDate", header: "Ngày nhập", sortable: true, minWidth: 160 },
    { key: "User", header: "Công nhân", sortable: true, minWidth: 200 },
    { key: "maChi", header: "Mã Chỉ", sortable: true, minWidth: 100 },
    { key: "mauChi", header: "Màu Chỉ", minWidth: 140 },
    { key: "phanLoai", header: "Phân Loại", sortable: true, minWidth: 100 },
    {
      key: "nhaCungCap",
      header: "Nhà Cung Cấp",
      sortable: true,
      minWidth: 100,
    },
    {
      key: "lotNguyenLieu",
      header: "LOT Nguyên Liệu",
      sortable: true,
      minWidth: 140,
    },
    { key: "checkGME", header: "Check GME", sortable: true, minWidth: 100 },
    { key: "slOk", header: "SL OK", sortable: true, minWidth: 100 },
    { key: "tong", header: "Tổng(kg)", sortable: true, minWidth: 100 },
    { key: "ghiChu", header: "Ghi Chú", minWidth: 200 },
    { key: "slBack", header: "SL Back", sortable: true, minWidth: 100 },
    {
      key: "pDBlack",
      header: "PĐ Black",
      sortable: true,
      minWidth: 100,
      render: (row: QCNhuom) => <span>{row.pDBlack ?? ""}</span>,
    },
    { key: "slVutRac", header: "SL Vứt Rác", sortable: true, minWidth: 120 },
    {
      key: "pDVutRac",
      header: "PĐ Vứt Rác",
      sortable: true,
      minWidth: 120,
      render: (row: QCNhuom) => <span>{row.pDVutRac ?? ""}</span>,
    },
    { key: "slKhac", header: "SL Khác", sortable: true, minWidth: 100 },
    {
      key: "pĐKhac",
      header: "PĐ Khác",
      sortable: true,
      minWidth: 100,
      render: (row: QCNhuom) => <span>{row.pĐKhac ?? ""}</span>,
    },
  ];

  const getMobileColumns = (): Column<QCNhuom>[] => [
    { key: "importDate", header: "Ngày nhập", sortable: true, minWidth: 120 },
    { key: "User", header: "Công nhân", sortable: true, minWidth: 150 },
    { key: "maChi", header: "Mã Chỉ", sortable: true, minWidth: 80 },
    { key: "tong", header: "Tổng(kg)", sortable: true, minWidth: 80 },
    { key: "slOk", header: "SL OK", sortable: true, minWidth: 70 },
  ];

  const getTabletColumns = (): Column<QCNhuom>[] => [
    { key: "importDate", header: "Ngày nhập", sortable: true, minWidth: 140 },
    { key: "User", header: "Công nhân", sortable: true, minWidth: 160 },
    { key: "maChi", header: "Mã Chỉ", sortable: true, minWidth: 90 },
    { key: "mauChi", header: "Màu Chỉ", minWidth: 120 },
    { key: "phanLoai", header: "Phân Loại", sortable: true, minWidth: 90 },
    { key: "tong", header: "Tổng(kg)", sortable: true, minWidth: 90 },
    { key: "slOk", header: "SL OK", sortable: true, minWidth: 80 },
    { key: "ghiChu", header: "Ghi Chú", minWidth: 150 },
  ];

  const columns: Column<QCNhuom>[] = isMobile 
    ? getMobileColumns() 
    : isTablet 
    ? getTabletColumns() 
    : getAllColumns();

  //     const onBatchDelete = async () => {
  //       if (selectedId.length === 0) {
  //           notify.warning("No users selected");
  //           return;
  //       }
  //       const ok = await confirmDialog({
  //         title: `Delete ${selectedIds.length} users`,
  //         message: <>Are you sure you want to delete <b>{selectedId.length}</b> users?</>,
  //         confirmText: "Delete",
  //         cancelText: "Cancel",
  //         danger: true,
  //       });
  //       if (!ok) return;
  //       const res = removeItem(selectedId as number);
  //       if (!res.ok) {
  //         notify.error(res.error?.message || "Failed to delete users" );
  //       }else{
  //         notify.success("Users deleted successfully");
  //         onClickSearch();
  //       }
  //   };
  const actions: RowAction<QCNhuom>[] = [
    // { id: "view", label: "View", icon: <VisibilityIcon />, onClick: (u) => console.log("view", u.id) },
    {
      id: "edit",
      label: "Edit",
      icon: <EditIcon color="primary" />,
      onClick: (u: QCNhuom) => updateItem(u.id, u),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <DeleteIcon color="error" />,
      onClick: (u: QCNhuom) => {
        console.log("delete", u.id);
        removeItem(u.id);
      },
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          mb: { xs: 1, sm: 2 }, 
          p: { xs: 1, sm: 2 },
          borderRadius: { xs: 1, sm: 2 }
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          sx={{ 
            mb: 1,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 600
          }}
        >
          Quản lý QC Nhuộm
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          Quản lý và theo dõi chất lượng sản phẩm nhuộm
        </Typography>
      </Paper>

      <Paper 
        elevation={1} 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: { xs: 1, sm: 2 }
        }}
      >
        <CommonTable<QCNhuom>
          columns={columns}
          actions={actions}
          keyField="id"
          loading={false}
          store={qCNhuomTableStore}
          maxBodyHeight={isMobile ? "50vh" : "60vh"}
        />
      </Paper>
    </Box>
  );
}
