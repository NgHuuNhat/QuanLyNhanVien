function NhanVien(_avatar, _taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLamTrongThang) {
    this.avatar = _avatar;
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLamTrongThang = _gioLamTrongThang;
    this.tongLuong = 0;
    this.loaiNV = "";

    this.tinhTongLuong = function () {
        let heSo = 1;
        // Xác định hệ số tương ứng với chức vụ
        switch (this.chucVu) {
            case 'Sếp':
                heSo = 3;
                break;
            case 'Trưởng phòng':
                heSo = 2;
                break;
            case 'Nhân viên':
                heSo = 1;
                break;
            default:
                heSo = 1;
                break;
        }

        this.tongLuong = Number(this.luongCoBan) * heSo;
    };

    this.xepLoaiNhanVien = function () {
        if (this.gioLamTrongThang >= 192) {
            this.loaiNV = "Xuất sắc";
        } else if (this.gioLamTrongThang >= 176) {
            this.loaiNV = "Giỏi";
        } else if (this.gioLamTrongThang >= 160) {
            this.loaiNV = "Khá";
        } else {
            this.loaiNV = "Trung bình";
        }
    };

}