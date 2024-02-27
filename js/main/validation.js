function Validation() {
    this.kiemTraRong = function (value, spanId, message) {
        if (value === "" || value === "Chọn chức vụ") {
            // alert("Thiếu tài khoản!");
            document.getElementById(spanId).innerHTML = message;
            document.getElementById(spanId).style.display = "block";
            // document.getElementById("tbTKNV").reset();
            return false;
        } else {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
    };

    this.kiemTraTaiKhoanTonTai = function (value, spanId, mess, dataList) {
        let exist = false;
        for (let i = 0; i < dataList.length; i++) {
            const nv = dataList[i];
            if (nv.taiKhoan === value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            //neu true = ko hop le
            document.getElementById(spanId).innerHTML = mess;
            document.getElementById(spanId).style.display = "block";
            return false;
        }
        //neu false hop le
        document.getElementById(spanId).innerHTML = "";
        return true;
    };

    // Thêm hàm để xóa tất cả các thông báo
    this.xoaTatCaThongBao = function () {
        const elements = document.getElementsByClassName("sp-thongbao");
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = "";
        }
    };
}