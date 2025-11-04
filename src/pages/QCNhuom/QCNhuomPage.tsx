import { useEffect, useState } from "react";
import { useQCNhuomStore } from "./store";
import type { QCNhuom } from "./type";
import { createDataTableStore } from "../../components/commons/Table/tableStore";
import { CommonTable } from "../../components/commons/Table/CommonTable";
import type { Column, RowAction } from "../../components/commons/Table/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { QCNhuomData } from "./Data";
import { QCNhuomModal } from "./ModalQCNhuom";
import type { QCNhuomFormData } from "./ModalQCNhuom";

export default function QCNhuomPage() {
  const { items, addItem, updateItem, removeItem } = useQCNhuomStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QCNhuom | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const qCNhuomTableStore = createDataTableStore<QCNhuom>({
    pageSize: 10,
    sortBy: "lastUpdateAt",
    sortDir: "desc",
  });

  useEffect(() => {
    qCNhuomTableStore.getState().setData(items ?? QCNhuomData, items.length ?? QCNhuomData.length);
  }, [items, qCNhuomTableStore]);
  
  console.log("items", items);

  const handleOpenEditModal = (item: QCNhuom) => {
    setModalMode("edit");
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmitModal = (formData: QCNhuomFormData) => {
    // Chuyển đổi các giá trị string về number
    const convertedData: QCNhuom = {
      ...formData,
      id: formData.id || 0,
      checkGME: typeof formData.checkGME === 'string' ? Number(formData.checkGME) || 0 : formData.checkGME,
      slOk: typeof formData.slOk === 'string' ? Number(formData.slOk) || 0 : formData.slOk,
      tong: typeof formData.tong === 'string' ? Number(formData.tong) || 0 : formData.tong,
      slBack: typeof formData.slBack === 'string' ? Number(formData.slBack) || 0 : formData.slBack,
      slVutRac: typeof formData.slVutRac === 'string' ? Number(formData.slVutRac) || 0 : formData.slVutRac,
      slKhac: typeof formData.slKhac === 'string' ? Number(formData.slKhac) || 0 : formData.slKhac,
      doAm: typeof formData.doAm === 'string' ? Number(formData.doAm) || 0 : formData.doAm,
    };

    if (modalMode === "add") {
      // Generate new ID
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const newItem: QCNhuom = {
        ...convertedData,
        id: newId,
      };
      addItem(newItem);
    } else if (modalMode === "edit" && editingItem) {
      const updatedItem: QCNhuom = {
        ...convertedData,
        id: editingItem.id,
      };
      updateItem(editingItem.id, updatedItem);
    }
    handleCloseModal();
  };
  const columns: Column<QCNhuom>[] = [
    { key: "ngayNhap", header: "Ngày nhập", sortable: true, minWidth: 160 },
    { key: "congNhan", header: "Công nhân", sortable: true, minWidth: 200 },
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
      onClick: (u: QCNhuom) => handleOpenEditModal(u),
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

      <CommonTable<QCNhuom>
        columns={columns}
        actions={actions}
        keyField="id"
        loading={false}
        store={qCNhuomTableStore}
      />

      <QCNhuomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingItem}
        mode={modalMode}
      />
    </>
  );
}
