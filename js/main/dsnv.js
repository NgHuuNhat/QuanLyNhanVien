function DSNV() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTriNV = function (taiKhoan) {
        let index = -1;
        for (let i = 0; i <= this.arr.length; i++) {
            const nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    }

    this.xoaNV = function (taiKhoan) {
        const index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }

    this.layThongTinNV = function (taiKhoan) {
        const index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };

    this.capNhatNV = function (nv) {
        const index = this.timViTriNV(nv.taiKhoan);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    // this.timKiemNV = function (keyword) {
    //     let mangTimKiem = [];
    //     for (let i = 0; i < this.arr.length; i++) {
    //         const nv = this.arr[i];
    //         if (nv && nv.hoTen) {  // Kiểm tra xem nv có tồn tại và có thuộc tính hoTen không
    //             const keywordLowerCase = keyword.toLowerCase();
    //             const hoTenLowerCase = nv.hoTen.toLowerCase();
    //             if (hoTenLowerCase.indexOf(keywordLowerCase) !== -1) {
    //                 mangTimKiem.push(nv);
    //             }
    //         }
    //     }
    //     return mangTimKiem;
    // };

    this.timKiemNV = function (keyword) {
        let mangTimKiem = [];
        for (let i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            if (nv && nv.loaiNV) {
                const keywordLowerCase = keyword.toLowerCase();
                const loaiNVLowerCase = nv.loaiNV.toLowerCase();
                if (loaiNVLowerCase.indexOf(keywordLowerCase) !== -1) {
                    mangTimKiem.push(nv);
                }
            }
        }
        return mangTimKiem;
    };

}