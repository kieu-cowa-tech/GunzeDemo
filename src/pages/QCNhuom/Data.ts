import type { LOTInfo,Staff, QCNhuom } from "./type";

export const LOTData: LOTInfo[] = [
    { id: 1,  maLot: "LOT001", loaiChi: "T60", mauChi: "NNCC9804", phanLoai: "FINE", nhaCungCap: "SHANGHAI", slKhac: "0", quyCach: "Quy cách 1", nguyenLieu: 100, cd_kl:"100", ghiChu: "Ghi chú 1" },
    { id: 2,  maLot: "LOT002", loaiChi: "Chi B", mauChi: "15", phanLoai: "7", nhaCungCap: "3", slKhac: "1", quyCach: "Quy cách 2", nguyenLieu: 100, cd_kl:"150", ghiChu: "Ghi chú 2" },
    // Thêm dữ liệu mẫu khác nếu cần
];

export const StaffData: Staff[] = [
    { id: 1, maNV: "NV001", tenNV: "Trần Công Thắng"},
    { id: 2, maNV: "NV002", tenNV: "Trần Thị B" },
    { id: 2, maNV: "NV002", tenNV: "Trần Thị B" },
    // Thêm dữ liệu mẫu khác nếu cần
];

export const QCNhuomData: QCNhuom[] = [
    { id: 1, ngayNhap:"04/11/2025", congNhan: "Nguyễn Văn A",maChi: "C001", mauChi: "Đỏ", phanLoai: "Loại 1", nhaCungCap: "NCC A", lotNguyenLieu: "LOT001", checkGME: 1, slOk: 100, tong: 120, ghiChu: "Ghi chú 1", slBack: 5, pDBlack: "4.17%", slVutRac: 10, pDVutRac: "8.33%", slKhac: 5, pĐKhac: "4.17%", doAm: 12 },
    { id: 2, ngayNhap:"04/11/2025", congNhan: "Nguyễn Văn B",maChi: "C002", mauChi: "Xanh", phanLoai: "Loại 2", nhaCungCap: "NCC B", lotNguyenLieu: "LOT002", checkGME: 0, slOk: 150, tong: 180, ghiChu: "Ghi chú 2", slBack: 8, pDBlack: "4.44%", slVutRac: 15, pDVutRac: "8.33%", slKhac: 7, pĐKhac: "3.89%", doAm: 10 },
    // Thêm dữ liệu mẫu khác nếu cần
];


