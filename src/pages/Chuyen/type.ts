export type Chuyen = {
  id: number;
  ngayNhap: Date | string;
  congNhan: string;
  ca: number;
  maChi: string;
  mauChi: string;
  phanLoai: string;
  nhaCungCap: string;
  cdkl: number;
  lotNguyenLieu: string;
  nguyenVatLieu: number;
  hetLot: boolean;
  soLuong: number;
  racTruLoi: number;
  lydo: string;
  tong: number;
  trongLuong: number;
};

export const ChuyenData: Chuyen[] = [
  {
    id: 1,
    ngayNhap: '04/11/2025',
    congNhan: 'Nguyễn Văn A',
    ca: 1,
    maChi: 'MC-001',
    mauChi: 'Đỏ',
    phanLoai: 'A',
    nhaCungCap: 'Công ty TNHH NLX',
    cdkl: 10,
    lotNguyenLieu: 'LOT001',
    nguyenVatLieu: 500,
    hetLot: false,
    soLuong: 480,
    racTruLoi: 5,
    lydo: 'Bóc lỗi nhỏ',
    tong: 475,
    trongLuong: 950,
  },
  {
    id: 2,
    ngayNhap: '04/11/2025',
    congNhan: 'Trần Thị B',
    ca: 2,
    maChi: 'MC-002',
    mauChi: 'Xanh',
    phanLoai: 'B',
    nhaCungCap: 'Nhà cung cấp X',
    cdkl: 12,
    lotNguyenLieu: 'LOT-1002',
    nguyenVatLieu: 600,
    hetLot: true,
    soLuong: 590,
    racTruLoi: 8,
    lydo: 'Vết bẩn',
    tong: 582,
    trongLuong: 1164,
  },
  {
    id: 3,
    ngayNhap: '04/11/2025',
    congNhan: 'Lê Văn C',
    ca: 3,
    maChi: 'MC-003',
    mauChi: 'Vàng',
    phanLoai: 'A',
    nhaCungCap: 'Công ty NLY',
    cdkl: 9,
    lotNguyenLieu: 'LOTT003',
    nguyenVatLieu: 450,
    hetLot: false,
    soLuong: 440,
    racTruLoi: 2,
    lydo: 'Sai kích thước',
    tong: 438,
    trongLuong: 876,
  },
];
