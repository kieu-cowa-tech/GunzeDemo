import { useEffect, useState } from "react";
import { useChuyenStore } from "./store";
import  { ChuyenData,type Chuyen } from "./type";
import { createDataTableStore } from "../../components/commons/Table/tableStore";
import { CommonTable } from "../../components/commons/Table/CommonTable";
import type { Column, RowAction } from "../../components/commons/Table/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { ChuyenModal } from "./ModalChuyen";
import type { ChuyenFormData } from "./ModalChuyen";
import { notify } from "../../stores/notifyHost";

export default function ChuyenPage() {
  const { items, addItem, updateItem, removeItem } = useChuyenStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Chuyen | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const chuyenTableStore = createDataTableStore<Chuyen>({
    pageSize: 10,
    sortBy: "lastUpdateAt",
    sortDir: "desc",
  });

  useEffect(() => {
    chuyenTableStore.getState().setData(items ?? ChuyenData, items.length ?? ChuyenData.length);
  }, [items, chuyenTableStore]);

  console.log("items", items);

  const handleOpenEditModal = (item: Chuyen) => {
    setModalMode("edit");
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmitModal = (formData: ChuyenFormData) => {
    // Chuyển đổi formData thành Chuyen
    const convertedData: Chuyen = {
      id: formData.id || 0,
      ngayNhap: formData.ngayNhap,
      congNhan: formData.congNhan,
      ca: formData.ca || 0,
      maChi: formData.maChi,
      mauChi: formData.mauChi,
      phanLoai: formData.phanLoai,
      nhaCungCap: formData.nhaCungCap,
      cdkl: formData.cdkl || 0,
      lotNguyenLieu: formData.lotNguyenLieu,
      nguyenVatLieu: formData.nguyenVatLieu || 0,
      hetLot: formData.hetLot,
      soLuong: formData.soLuong || 0,
      racTruLoi: formData.racTruLoi || 0,
      lydo: formData.lydo,
      tong: formData.tong || 0,
      trongLuong: formData.trongLuong || 0,
    };

    if (modalMode === "add") {
      // Generate new ID
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const newItem: Chuyen = {
        ...convertedData,
        id: newId,
      };
      addItem(newItem);
      notify.success("Thêm mới Chuyển thành công!");
      console.log("Đã thêm mới Chuyển:", newItem);
    } else if (modalMode === "edit" && editingItem) {
      const updatedItem: Chuyen = {
        ...convertedData,
        id: editingItem.id,
      };
      updateItem(editingItem.id, updatedItem);
      notify.success("Cập nhật Chuyển thành công!");
    }
    handleCloseModal();
  };
  const columns: Column<Chuyen>[] = [
    { key: "ngayNhap", header: "Ngày nhập", sortable: true, minWidth: 120 },
    { key: "congNhan", header: "Công nhân", sortable: true, minWidth: 150 },
    { key: "ca", header: "Ca", sortable: true, minWidth: 50 },
    { key: "maChi", header: "Mã Chỉ", sortable: true, minWidth: 100 },
    { key: "mauChi", header: "Màu Chỉ", minWidth: 140 },
    { key: "phanLoai", header: "Phân loại", sortable: true, minWidth: 100 },
    { key: "nhaCungCap", header: "Nhà cung cấp", sortable: true, minWidth: 150 },
    { key: "cdkl", header: "CD/KL", sortable: true, minWidth: 100 },
    {
      key: "nguyenVatLieu",
      header: "Kg NVL",
      sortable: true,
      minWidth: 100,
    },
    {
      key: "lotNguyenLieu",
      header: "LOT",
      sortable: true,
      minWidth: 140,
    },
    { key: "hetLot", header: "Hết Lot", sortable: true, minWidth: 100, render: (row: Chuyen) => <Checkbox checked={row.hetLot ?? false} disabled />, },
    { key: "soLuong", header: "Số Lượng (cuộn)", sortable: true, minWidth: 100 },
    { key: "racTruLoi", header: "Rác Trừ Lỗi", sortable: true, minWidth: 100 },
    { key: "lydo", header: "Lý Do", minWidth: 200 },
    { key: "tong", header: "Tổng (kg)", sortable: true, minWidth: 100 },
    {
      key: "trongLuong",
      header: "Trọng lượng",
      sortable: true,
      minWidth: 100
    },
  ];

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
  const actions: RowAction<Chuyen>[] = [
    // { id: "view", label: "View", icon: <VisibilityIcon />, onClick: (u) => console.log("view", u.id) },
    {
      id: "edit",
      label: "Edit",
      icon: <EditIcon color="primary" />,
      onClick: (u: Chuyen) => handleOpenEditModal(u),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <DeleteIcon color="error" />,
      onClick: (u: Chuyen) => {
        console.log("delete", u.id);
        removeItem(u.id);
      },
    },
  ];

  return (
    <>
      {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          sx={{
            backgroundColor: "#002194",
            "&:hover": {
              backgroundColor: "rgba(0, 33, 148, 0.8)",
            },
          }}
        >
          Thêm mới
        </Button>
      </Box> */}

      <CommonTable<Chuyen>
        columns={columns}
        actions={actions}
        keyField="id"
        loading={false}
        store={chuyenTableStore}
      />

      <ChuyenModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingItem}
        mode={modalMode}
      />
    </>
  );
}
