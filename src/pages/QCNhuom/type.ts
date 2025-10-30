export type QCNhuom = {
    id: number;
    maChi: string;
    mauChi:string;
    phanLoai:string;
    nhaCungCap:string;
    lotNguyenLieu:string;
    checkGME:number;
    slOk:number;
    tong:number;
    ghiChu:string;
    slBack:number;
    pDBlack:string;
    slVutRac:number;
    pDVutRac:string;
    slKhac:number;
    pĐKhac:string;
}

export type LOTInfo = {
    id: number;
    maLot: string;
    loaiChi: string;
    mauChi: number;
    phanLoai: number;
    nhaCungCap: number;
    slKhac: number;
    quyCach: string;
    nguyenLieu: string;
    cd_kl: number;
    ghiChu: string;
}

export type Staff = {
    id: number;
    maNV: string;
    tenNV: string;
    chucVu: string;
    phongBan: string;
    ghiChu: string;
}
