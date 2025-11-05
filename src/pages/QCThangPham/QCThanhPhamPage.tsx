import { useEffect, useState } from "react";
import { type QCThanhPham,QCThanhPhamData } from "./type";
import { createDataTableStore } from "../../components/commons/Table/tableStore";
import { CommonTable } from "../../components/commons/Table/CommonTable";
import type { Column, RowAction } from "../../components/commons/Table/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { QCThanhPhamModal } from "./ModelQCThanhPham";
import type { QCThanhPhamFormData } from "./ModelQCThanhPham";
import { notify } from "../../stores/notifyHost";
import { useQCThanhPhamStore } from "./store";

export default function QCThanhPhamPage() {
  const { items, addItem, updateItem, removeItem } = useQCThanhPhamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QCThanhPham | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const QCThanhPhamTableStore = createDataTableStore<QCThanhPham>({
    pageSize: 10,
    sortBy: "lastUpdateAt",
    sortDir: "desc",
  });

  useEffect(() => {
    QCThanhPhamTableStore.getState().setData(items ?? QCThanhPhamData, items.length ?? QCThanhPhamData.length);
  }, [items, QCThanhPhamTableStore]);
  
  console.log("items", items);

  const handleOpenEditModal = (item: QCThanhPham) => {
    setModalMode("edit");
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmitModal = (formData: QCThanhPhamFormData) => {
    // Chuyển đổi các giá trị string về number
    const convertedData: QCThanhPham = {
      ...formData,
      id: formData.id || 0,
      soCuon: typeof formData.soCuon === 'string' ? Number(formData.soCuon) || 0 : formData.soCuon,
      soCuonOk: typeof formData.soCuonOk === 'string' ? Number(formData.soCuonOk) || 0 : formData.soCuonOk,
      loiCuon1: typeof formData.loiCuon1 === 'string' ? Number(formData.loiCuon1) || 0 : formData.loiCuon1,
      loiCuon2: typeof formData.loiCuon2 === 'string' ? Number(formData.loiCuon2) || 0 : formData.loiCuon2,
      loiCuon3: typeof formData.loiCuon3 === 'string' ? Number(formData.loiCuon3) || 0 : formData.loiCuon3,
      loiCuon4: typeof formData.loiCuon4 === 'string' ? Number(formData.loiCuon4) || 0 : formData.loiCuon4,
      khoiLuong: typeof formData.khoiLuong === 'string' ? Number(formData.khoiLuong) || 0 : formData.khoiLuong,
      cd_kl: typeof formData.cd_kl === 'string' ? Number(formData.cd_kl) || 0 : formData.cd_kl,
      rac: typeof formData.rac === 'string' ? Number(formData.rac) || 0 : formData.rac,
    };

    if (modalMode === "add") {
      // Generate new ID
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      const newItem: QCThanhPham = {
        ...convertedData,
        id: newId,
      };
      addItem(newItem);
      notify.success("Lưu kết quả QC Thành Phẩm thành công!");
      console.log("Đã thêm mới kết quả QC Thành Phẩm:", newItem);
    } else if (modalMode === "edit" && editingItem) {
      const updatedItem: QCThanhPham = {
        ...convertedData,
        id: editingItem.id,
      };
      updateItem(editingItem.id, updatedItem);
      notify.success("Cập nhật kết quả QC Thành Phẩm thành công!");
    }
    handleCloseModal();
  };
  const columns: Column<QCThanhPham>[] = [
    { key: "ngayNhap", header: "Ngày nhập", sortable: true, minWidth: 100 },
    { key: "lotNo", header: "Lot no", sortable: true, minWidth: 100 },
    { key: "maChi", header: "Mã chỉ", sortable: true, minWidth: 100 },
    { key: "mauChi", header: "Màu chỉ", sortable: true, minWidth: 110 },
    { key: "lotThanhPham", header: "Lot TP", sortable: true, minWidth: 100 },
    { key: "soCuon", header: "Số cuộn", sortable: true, minWidth: 110 },
    { key: "soCuonOk", header: "Số cuộn OK", sortable: true, minWidth: 110 },
    { key: "congNhan", header: "Công nhân", sortable: true, minWidth: 120 },
    { key: "maLoi1", header: "Mã lỗi 1", sortable: true, minWidth: 105 },
    { key: "loiCuon1", header: "Số lượng NG 1", sortable: true, minWidth: 120 },
    { key: "maLoi2", header: "Mã lỗi 2", sortable: true, minWidth: 105 },
    { key: "loiCuon2", header: "Số lượng NG 2", sortable: true, minWidth: 120 },
    { key: "maLoi3", header: "Mã lỗi 3", sortable: true, minWidth: 105 },
    { key: "loiCuon3", header: "Số lượng NG 3", sortable: true, minWidth: 120},
    { key: "maLoi4", header: "Mã lỗi 4", sortable: true, minWidth: 105 },
    { key: "loiCuon4", header: "Số lượng NG 4", sortable: true, minWidth: 120 },
    { key: "quyCach", header: "Quy cách", sortable: true, minWidth: 100 },
    { key: "khoiLuong", header: "Khối lượng", sortable: true, minWidth: 100 },
    { key: "cd_kl", header: "CD/KL", sortable: true, minWidth: 100 },
    { key: "maChiKH", header: "Mã chỉ KH", sortable: true, minWidth: 100 },
    { key: "rac", header: "Rác", sortable: true, minWidth: 100 },
    { key: "ghiChu", header: "Ghi chú", sortable: true, minWidth: 100 },
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
  const actions: RowAction<QCThanhPham>[] = [
    // { id: "view", label: "View", icon: <VisibilityIcon />, onClick: (u) => console.log("view", u.id) },
    {
      id: "edit",
      label: "Edit",
      icon: <EditIcon color="primary" />,
      onClick: (u: QCThanhPham) => handleOpenEditModal(u),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <DeleteIcon color="error" />,
      onClick: (u: QCThanhPham) => {
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

      <CommonTable<QCThanhPham>
        columns={columns}
        actions={actions}
        keyField="id"
        loading={false}
        store={QCThanhPhamTableStore}
      />

      <QCThanhPhamModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        editData={editingItem}
        mode={modalMode}
      />
    </>
  );
}
