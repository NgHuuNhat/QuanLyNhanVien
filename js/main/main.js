const dsnv = new DSNV();
const validation = new Validation();

getLocalStorage();

function setLocalStorage() {
    const arrString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", arrString);
}
function getLocalStorage() {
    if (!localStorage.getItem("DSNV")) return;

    const arrString = localStorage.getItem("DSNV");
    const arrJSON = JSON.parse(arrString);
    dsnv.arr = arrJSON;
    hienThiDanhSachNhanVien(dsnv.arr);
}
/**
 * 
 * @param {*} isAdd: false => tinh nang cap nhat, true => la tinh nang them
 * @returns 
 */
function layThongTinNhanVien(isAdd) {
    const _avatar = document.getElementById("avatarPreview").src;
    const _taiKhoan = document.getElementById("tknv").value;
    const _hoTen = document.getElementById("name").value;
    const _email = document.getElementById("email").value;
    const _matKhau = document.getElementById("password").value;
    const _ngayLam = document.getElementById("datepicker").value;
    const _luongCoBan = document.getElementById("luongCB").value;
    const _chucVu = document.getElementById("chucvu").value;
    const _gioLamTrongThang = document.getElementById("gioLam").value;

    // validation
    // tạo biến flag(boolean), true: hợp lệ, false: ko hợp lệ.
    let isValidation = true;

    if (isAdd) {
        isValidation &= validation.kiemTraRong(_taiKhoan, "tbTKNV", "(*) Thiếu tài khoản!") && validation.kiemTraTaiKhoanTonTai(_taiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại!", dsnv.arr);
    }

    isValidation &= validation.kiemTraRong(_hoTen, "tbTen", "(*) Thiếu họ và tên!");
    isValidation &= validation.kiemTraRong(_email, "tbEmail", "(*) Thiếu email!");
    isValidation &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Thiếu mật khẩu!");
    isValidation &= validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Thiếu ngày làm!");
    isValidation &= validation.kiemTraRong(_luongCoBan, "tbLuongCB", "(*) Thiếu lương cơ bản!");
    isValidation &= validation.kiemTraRong(_chucVu, "tbChucVu", "(*) Thiếu chức vụ!");
    isValidation &= validation.kiemTraRong(_gioLamTrongThang, "tbGiolam", "(*) Thiếu giờ làm trong tháng!");
    if (!isValidation) return null;

    const nv = new NhanVien(_avatar, _taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLamTrongThang);
    nv.tinhTongLuong();
    nv.xepLoaiNhanVien();

    // Reset form
    resetForm();
    // tắt form thông tin sau khi điền xong
    $('#myModal').modal('hide');

    return nv;
}
// Thêm sự kiện nghe cho sự kiện chọn file
document.getElementById("avatarInput").addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        // Đọc avatar thành dataURL
        const reader = new FileReader();
        // Gắn dataURL vào src của avatar tương ứng
        reader.onload = function (e) {
            document.getElementById("avatarPreview").src = e.target.result;
        };
        // Hiển thị bản xem trước avatar
        reader.readAsDataURL(file);
    }
});
function hienThiDanhSachNhanVien(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        const nv = data[i];
        content += `
            <tr>
                <td>
                    <div class="input-group avatar-wrapper" style="align-content: center;
                    justify-content: center;">
                        <div class="input-group-prepend">
                            <!-- <span class="input-group-text"><i class="fa fa-user"></i></span> -->
                            <img id="avatarPreview_${i}" src="${nv.avatar}"
                                class="rounded-circle" style="width: 150px;" alt="Avatar" />
                        </div>

                    </div>
                </td>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
                <td>
                    <button class="btn btn-info" onclick="editNhanVien('${nv.taiKhoan}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNhanVien('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

function resetForm() {
    // Reset form
    document.getElementById("form").reset();
}
function buttonThemNhanVien() {
    // Reset form
    resetForm();
    document.getElementById("tknv").disabled = false;
    // Ẩn nút "Thêm người dùng", hiển thị nút "Cập nhật"
    document.getElementById("btnThemNV").style.display = "block";
    document.getElementById("btnCapNhat").style.display = "none";
}

function addNhanVien() {
    const nv = layThongTinNhanVien(true);
    if (!nv) return;

    dsnv.themNV(nv);
    hienThiDanhSachNhanVien(dsnv.arr);
    setLocalStorage();
}
function deleteNhanVien(username) {
    // console.log(username)
    dsnv.xoaNV(username);
    hienThiDanhSachNhanVien(dsnv.arr);
    setLocalStorage();
}
function editNhanVien(username) {
    console.log(username);

    validation.xoaTatCaThongBao();

    const nv = dsnv.layThongTinNV(username);
    if (nv) {
        // Hiển thị thông tin nhân viên trên form
        document.getElementById("avatarPreview").src = nv.avatar;
        document.getElementById("tknv").value = nv.taiKhoan;
        document.getElementById("tknv").disabled = true;
        document.getElementById("name").value = nv.hoTen;
        document.getElementById("email").value = nv.email;
        document.getElementById("password").value = nv.matKhau;
        document.getElementById("datepicker").value = nv.ngayLam;
        document.getElementById("luongCB").value = nv.luongCoBan;
        document.getElementById("chucvu").value = nv.chucVu;
        document.getElementById("gioLam").value = nv.gioLamTrongThang;
    }
    // Hiển thị modal
    $('#myModal').modal('show');
    // Ẩn nút "Thêm người dùng", hiển thị nút "Cập nhật"
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "block";
}
function updateNhanVien() {
    console.log("update");
    const nv = layThongTinNhanVien(false);
    dsnv.capNhatNV(nv);

    hienThiDanhSachNhanVien(dsnv.arr);
    setLocalStorage();
}

document.getElementById("searchName").addEventListener("keyup", function () {
    console.log("timkiem");
    //lay tu khoa tim kiem
    const keyword = document.getElementById("searchName").value;
    console.log(keyword);

    const mangTimKiem = dsnv.timKiemNV(keyword);
    hienThiDanhSachNhanVien(mangTimKiem);
});
