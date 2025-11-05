export type QCThanhPham = {
    id: number;
    ngayNhap:Date | string;
    lotNo:string;
    maChi: string;
    mauChi:string;
    lotThanhPham:string;
    soCuon:number;
    soCuonOk:number;
    congNhan: string;
    maLoi1:string;
    loiCuon1:number;
    maLoi2:string;
    loiCuon2:number;
    maLoi3:string;
    loiCuon3:number;
    maLoi4:string;
    loiCuon4:number;
    quyCach:string;
    khoiLuong:number;
    cd_kl:number;
    maChiKH:string;
    rac:number;
    ghiChu: string;
}

export const QCThanhPhamData: QCThanhPham[] = [
    {
        id: 1,
        ngayNhap: "02/10/2025",
        lotNo: "L001",
        congNhan: "111123",
        maChi: "701",
        mauChi: "NCC9804",
        lotThanhPham: "UH25JA",
        soCuon: 12,
        maLoi1: "Hỏng",
        loiCuon1: 2,
        maLoi2: "Lỗi A",
        loiCuon2: 2,
        maLoi3: "Lỗi A",
        loiCuon3: 2,
        maLoi4: "Lỗi A",
        loiCuon4: 2,
        quyCach: "203",
        khoiLuong: 12,
        cd_kl: 200,
        maChiKH: "701",
        rac: 1,
        ghiChu: "Ghi chú 1",
        soCuonOk: 99
    },
    {
        id: 2,
        ngayNhap: "29/12/2025",
        lotNo: "L002",
        maChi: "US30",
        mauChi: "UQ99R",
        lotThanhPham: "HZ2212",
        soCuon: 20,
        congNhan: "Thắng",
        maLoi1: "Trắng",
        loiCuon1: 1,
        maLoi2: "Lỗi B",
        loiCuon2: 1,
        maLoi3: "Lỗi B",
        loiCuon3: 1,
        maLoi4: "Lỗi B",
        loiCuon4: 1,
        quyCach: "405",
        khoiLuong: 13,
        cd_kl: 400,
        maChiKH: "1630",
        rac: 1,
        ghiChu: "Ghi chú 1",
        soCuonOk: 16
    },
    {
        id: 3,
        ngayNhap: "02/10/2025",
        lotNo: "L003",
        maChi: "701",
        mauChi: "NCC9804",
        lotThanhPham: "UH25JA",
        soCuon: 12,
        congNhan: "Thủy",
        maLoi1: "Hỏng",
        loiCuon1: 2,
        maLoi2: "Lỗi A",
        loiCuon2: 2,
        maLoi3: "Lỗi A",
        loiCuon3: 2,
        maLoi4: "Lỗi A",
        loiCuon4: 2,
        quyCach: "203",
        khoiLuong: 12,
        cd_kl: 200,
        maChiKH: "701",
        rac: 1,
        ghiChu: "Ghi chú 1",
        soCuonOk: 4
    }
];