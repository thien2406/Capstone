<template>
    <div class="page-wrapper">
        <div class="page-content mb" style="margin-top: -90px;">
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Quản lý Tài Khoản</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                            <li class="breadcrumb-item active" aria-current="page">Tài Khoản Nhân Viên</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="d-lg-flex align-items-center mb-3 gap-3">
                        <div class="position-relative">
                            <input type="text" class="form-control ps-5 radius-30" placeholder="Tìm kiếm nhân viên">
                            <span class="position-absolute top-50 product-show translate-middle-y">
                                <i class="bx bx-search"></i>
                            </span>
                        </div>
                        <div class="ms-auto">
                            <button type="button" class="btn btn-primary radius-30 mt-2 mt-lg-0" data-bs-toggle="modal"
                                data-bs-target="#addEmployeeModal">
                                Thêm nhân viên mới
                            </button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Email</th>
                                    <th class="text-center">Họ Và Tên</th>
                                    <th class="text-center">Hình Ảnh</th>
                                    <th class="text-center">Căn Cước Công Dân</th>
                                    <th class="text-center">Ngày Sinh</th>
                                    <th class="text-center">Giới Tính</th>
                                    <th class="text-center">Số Điện thoại</th>
                                    <th class="text-center">Địa Chỉ</th>
                                    <th class="text-center">Tình Trạng</th>
                                    <th class="text-center">Chỉnh Sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in users" :key="index">
                                    <tr>
                                        <th class="align-middle text-center">{{ index + 1 }}</th>
                                        <td class="align-middle text-center">{{ value.email }}</td>
                                        <td class="align-middle text-center">{{ value.ho_va_ten }}</td>
                                        <td class="align-middle text-center">
                                            <img v-bind:src="value.hinh_anh" style="max-height: 50px;">
                                        </td>
                                        <td class="align-middle text-center">{{ value.can_cuoc_cong_dan }}</td>
                                        <td class="align-middle text-center">{{ value.ngay_sinh }}</td>
                                        <td class="align-middle text-center">
                                            <span v-if="value.gioi_tinh == 1" class="text-success">Nam</span>
                                            <span v-else class="text-danger">Nữ</span>
                                        </td>
                                        <td class="align-middle text-center">{{ value.so_dien_thoai }}</td>
                                        <td class="align-middle text-center">{{ value.dia_chi }}</td>
                                        <td class="align-middle text-center">
                                            <div class="d-flex flex-column">
                                                <button v-if="value.tinh_trang == 1" class="btn mb-2"
                                                    style="background-color: #28A745; color: white;">Đang Hoạt
                                                    Động</button>
                                                <button v-else class="btn mb-2"
                                                    style="background-color: #DC3545; color: white;">Ngừng Hoạt
                                                    Động</button>
                                                <button v-on:click="chuyennoibat(value)" v-if="value.is_noi_bat == 1"
                                                    class="btn text-nowrap mb-2"
                                                    style="background-color: #007BFF; color: white;">NV Nổi Bật</button>
                                                <button v-on:click="chuyennoibat(value)" v-else
                                                    class="btn text-nowrap mb-2"
                                                    style="background-color: #6C757D; color: white;">NV Bình
                                                    Thường</button>
                                                
                                                
                                            </div>
                                        </td>
                                        <td class="align-middle text-center">
    <!-- Nút Cập Nhật -->
    <button class="btn btn-custom btn-primary me-2" data-bs-toggle="modal"
        data-bs-target="#capnhatnv" v-on:click="Object.assign(update_nv, value)">
        Cập nhật
    </button>

    <!-- Nút Xóa -->
    <button class="btn btn-custom btn-danger me-2" data-bs-toggle="modal"
        data-bs-target="#deletenv" v-on:click="delete_nv = value">
        Xóa
    </button>

    <!-- Nút Chỉnh Sửa -->
    <button class="btn btn-custom btn-secondary" v-on:click="loadThongTinVi(value.id)"
        data-bs-toggle="modal" data-bs-target="#capnhatNganHangnv">
        Chỉnh Sửa
    </button>
</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="capnhatNganHangnv" tabindex="-1" aria-labelledby="capnhatNganHangnv"
                aria-hidden="true" @shown.bs.modal="onShowUpdateBankInfoModal">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                        <!-- Header -->
                        <div class="modal-header">
                            <h5 class="modal-title" id="capnhatnvLabel">
                                <i class="bx bx-edit-alt"></i> Cập nhật thông tin ví
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <!-- Body -->
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="tenNganHang" class="form-label">Ngân Hàng</label>
                                    <select v-model="thongtinVi.ten_ngan_hang" id="tenNganHang" class="form-select"
                                        required>
                                        <option value="">-- Chọn Ngân Hàng --</option>
                                        <option value="Agribank">Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam
                                            (Agribank)</option>
                                        <option value="Vietcombank">Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam
                                            (Vietcombank)</option>
                                        <option value="BIDV">Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)</option>
                                        <option value="VietinBank">Ngân hàng Kông thương Việt Nam (VietinBank)</option>
                                        <option value="Techcombank">Ngân hàng Thương mại Cổ phần Kỹ Thương (Techcombank)
                                        </option>
                                        <option value="MBBank">Ngân hàng Quân đội (MB Bank)</option>
                                        <option value="Sacombank">Ngân hàng Sài Gòn Thương Tín (Sacombank)</option>
                                        <option value="ACB">Ngân hàng Thừ Đình (ACB)</option>
                                        <option value="SCB">Ngân hàng Thương mại Cổ phần Sài Gòn (SCB)</option>
                                        <option value="HDBank">Ngân hàng TMCP Phát Triển TP.HCM (HDBank)</option>
                                        <option value="SHB">Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)</option>
                                        <option value="BaoVietBank">Ngân hàng TMCP Bảo Việt (BaoViet Bank)</option>
                                        <option value="NamABank">Ngân hàng TMCP Nam Á (NamABank)</option>
                                        <option value="DongABank">Ngân hàng TMCP Đông Á (DongABank)</option>
                                        <option value="TPBank">Ngân hàng TMCP Tiên Phong (TPBank)</option>
                                        <option value="VietABank">Ngân hàng TMCP Việt Á (VietABank)</option>
                                        <option value="PVcomBank">Ngân hàng TMCP Đại Chúng Việt Nam (PVcomBank)</option>
                                        <option value="NCB">Ngân hàng TMCP Quốc Dân (NCB)</option>
                                        <option value="PGBank">Ngân hàng TMCP Xăng Dầu Petrolimex (PG Bank)</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label"><i class="bx bx-credit-card"></i> Số Tài Khoản</label>
                                    <input v-model="thongtinVi.stk" type="text" class="form-control"
                                        :placeholder="thongtinVi.stk ? 'Nhập số tài khoản' : 'Chưa có số tài khoản, vui lòng nhập!'">
                                </div>

                                <div class="mb-3">
                                    <label class="form-label"><i class="bx bx-qr"></i> Link QR</label>
                                    <input v-model="thongtinVi.qrRut" type="text" class="form-control"
                                        :placeholder="thongtinVi.qrRut ? 'Nhập link QR mới' : 'Chưa có link QR, vui lòng nhập!'">
                                </div>
                            </form>
                        </div>
                        <!-- Header -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i
                                    class="bx bx-x"></i>
                                Đóng</button>
                            <button v-on:click="capNhatSTKNhanVien(thongtinVi.nhan_vien_id)" type="button"
                                class="btn btn-primary"><i class="bx bx-save"></i> Lưu thay
                                đổi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" style="margin-top: 50px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addEmployeeModalLabel">Thêm nhân viên mới</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Email</label>
                                        <input type="text" class="form-control" v-model="create_nv.email"
                                            id="Nhập Email" placeholder="Nhập Email">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Mật Khẩu</label>
                                        <input type="password" class="form-control" v-model="create_nv.password"
                                            id="Nhập Mật Khẩu" placeholder="Nhập Mật Khẩu">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Họ và Tên</label>
                                        <input type="text" class="form-control" v-model="create_nv.ho_va_ten"
                                            id="Nhập Họ và Tên" placeholder="Nhập Họ Và Tên">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Kinh Nghiệm</label>
                                        <input type="text" class="form-control" v-model="create_nv.kinh_nghiem"
                                            id="Nhập năm hoặc tháng kinh nghiệm"
                                            placeholder="Nhập năm hoặc tháng kinh nghiệm">
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Căn Cước Công Dân</label>
                                        <input type="text" class="form-control" v-model="create_nv.can_cuoc_cong_dan"
                                            id="Nhập Căn Cước Công Dân" placeholder="Nhập Căn Cước Công Dân">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Ngày Sinh</label>
                                        <input type="date" class="form-control" v-model="create_nv.ngay_sinh"
                                            id="Nhập Ngày Sinh">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Giới Tính</label>
                                        <select v-model="create_nv.gioi_tinh" class="form-control">
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Số Điện Thoại</label>
                                        <input type="text" class="form-control" v-model="create_nv.so_dien_thoai"
                                            id="Nhập Số Điện Thoại" placeholder="Nhập Số Điện Thoại">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Địa Chỉ</label>
                                        <input type="text" class="form-control" v-model="create_nv.dia_chi"
                                            id="Nhập Địa Chỉ" placeholder="Nhập Địa Chỉ">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Hình Ảnh</label>
                                        <input type="text" class="form-control" v-model="create_nv.hinh_anh"
                                            id="Nhập Địa Chỉ" placeholder="Nhập Địa Chỉ">
                                    </div>
                                    
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Tình Trạng</label>
                                        <select v-model="create_nv.tinh_trang" class="form-control">
                                            <option value="1">Hoạt Động</option>
                                            <option value="0">Dừng Hoạt Động</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" v-on:click=" createUser()"
                                data-bs-dismiss="modal">Thêm
                                mới</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="capnhatnv" tabindex="-1" aria-labelledby="capnhatnvLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="capnhatnvLabel">Cập nhật thông tin nhân viên</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Họ và Tên</label>
                                    <input type="text" class="form-control" v-model="update_nv.ho_va_ten"
                                        placeholder="Nhập họ và tên">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" v-model="update_nv.email"
                                        placeholder="Nhập email">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="text" class="form-control" v-model="update_nv.so_dien_thoai"
                                        placeholder="Nhập số điện thoại">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Địa chỉ</label>
                                    <input type="text" class="form-control" v-model="update_nv.dia_chi"
                                        placeholder="Nhập địa chỉ">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Căn Cước Công Dân</label>
                                    <input type="text" class="form-control" v-model="update_nv.can_cuoc_cong_dan"
                                        placeholder="Nhập căn cước công dân">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Sinh</label>
                                    <input type="date" class="form-control" v-model="update_nv.ngay_sinh"
                                        placeholder="Nhập ngày sinh">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Giới Tính</label>
                                    <select v-model="update_nv.gioi_tinh" class="form-control">
                                        <option value="1">Nam</option>
                                        <option value="0">Nữ</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="text" class="form-control" v-model="update_nv.so_dien_thoai"
                                        placeholder="Nhập Số điện thoại">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Kinh Nghiệm</label>
                                    <input type="text" class="form-control" v-model="update_nv.kinh_nghiem"
                                        placeholder="Nhập năm hoặc tháng kinh nghiệm">
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label">Tình Trạng</label>
                                    <select v-model="update_nv.tinh_trang" class="form-control">
                                        <option value="1">Hoạt Động</option>
                                        <option value="0">Dừng Hoạt Động</option>
                                    </select>
                                </div>
                                
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" v-on:click="updateUser(update_nv.id)"
                                data-bs-dismiss="modal">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Xóa nhân viên -->
            <div class="modal fade" id="deletenv" tabindex="-1" aria-labelledby="deletenvLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deletenvLabel">Xóa nhân viên</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
                            <p><strong>{{ delete_nv.ho_va_ten }}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-danger" v-on:click="deleteUser(delete_nv.id)"
                                data-bs-dismiss="modal">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            users: [],
            create_nv: {},
            update_nv: {},
            delete_nv: {},
            thongtinVi: {},
        };
    },
    mounted() {
        this.loadusers();
    },
    methods: {
        loadusers() {
            axios
                .get("http://127.0.0.1:8000/api/admin/getDataNhanVien", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.users = res.data.data;


                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên:", error);
                });
        },

        createUser() {
            axios
                .post("http://127.0.0.1:8000/api/admin/createNhanVien", this.create_nv, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        onShowUpdateEmployeeModal(employee) {
            // Reset dữ liệu nhân viên trước khi mở modal
            this.update_nv = Object.assign({}, employee);
        },
        onShowCreateEmployeeModal() {
            // Reset dữ liệu thêm nhân viên
            this.create_nv = {
                email: "",
                password: "",
                ho_va_ten: "",
                hinh_anh: "",
                can_cuoc_cong_dan: "",
                ngay_sinh: "",
                gioi_tinh: "",
                so_dien_thoai: "",
                dia_chi: "",
                kinh_nghiem: "",
                tinh_trang: 1,
            };
        },
        updateUser(id) {
            axios.put(`http://127.0.0.1:8000/api/admin/updateNhanVien/${id}`, this.update_nv, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },

        deleteUser(id) {
            axios
                .delete(`http://127.0.0.1:8000/api/admin/deleteNhanVien/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        chuyennoibat(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/change-NhanVien-NoiBat", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        blocknhanvien() {
            axios
                .delete("http://127.0.0.1:8000/api/admin/change-Block-NhanVien", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        flashSale(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/change-NhanVien-FlashSale", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        capNhatSTKNhanVien(id_nhan_vien) {
            if (this.thongtinVi.ngan_hang_id) {
                // Nếu đã có thông tin ngân hàng, gọi API update
                axios
                    .put(
                        `http://127.0.0.1:8000/api/admin/ngan-hang-vi-nhan-vien/update/${this.thongtinVi.ngan_hang_id}`,
                        this.thongtinVi,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token_admin"),
                            },
                        }
                    )
                    .then((res) => {
                        if (res.data.status) {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                res.data.message +
                                "<span>";
                            this.$toast.success(thong_bao);
                        } else {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                res.data.message +
                                "<span>";
                            this.$toast.error(thong_bao);
                        }
                    })
                    .catch((errors) => {
                        const listErrors = errors.response.data.errors;
                        Object.values(listErrors).forEach((value) => {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                value +
                                "<span>";
                            this.$toast.error(thong_bao);
                        });
                    });
            } else {
                // Nếu chưa có thông tin ngân hàng, gọi API tạo mới
                axios
                    .post(
                        `http://127.0.0.1:8000/api/admin/ngan-hang-vi-nhan-vien/create/${id_nhan_vien}`,
                        this.thongtinVi,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token_admin"),
                            },
                        }
                    )
                    .then((res) => {
                        if (res.data.status) {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                res.data.message +
                                "<span>";
                            this.$toast.success(thong_bao);
                        } else {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                res.data.message +
                                "<span>";
                            this.$toast.error(thong_bao);
                        }
                    })
                    .catch((errors) => {
                        const listErrors = errors.response.data.errors;
                        Object.values(listErrors).forEach((value) => {
                            const thong_bao =
                                '<b>Thông báo</b><span style="margin-top: 5px">' +
                                value +
                                "<span>";
                            this.$toast.error(thong_bao);
                        });
                    });
            }
        },
        onShowUpdateBankInfoModal() {
            // Reset dữ liệu ví trước khi load
            this.thongtinVi = {
                ten_ngan_hang: "",
                stk: "",
                qrRut: "",
            };
        },
        loadThongTinVi(id) {
            this.onShowUpdateBankInfoModal(); // Reset dữ liệu ví
            axios
                .get(`http://127.0.0.1:8000/api/admin/ngan-hang-vi-nhan-vien/getData/` + id, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_admin"),
                    },
                })
                .then((res) => {
                            console.log("📦 Dữ liệu ví nhận được:", res.data); // THÊM DÒNG NÀY
                    this.thongtinVi = res.data.data || {
                        // Đặt mặc định nếu không có thông tin ví
                        ten_ngan_hang: "",
                        stk: "",
                        qrRut: "",
                        ngan_hang_id: null, // Đặt null nếu không có ngân hàng
                    };
                })
                .catch((errors) => {
                    this.$toast.error("Không thể tải thông tin ví.");
                });
        },

    },
}

</script>

<style scoped>
/* Tùy chỉnh nút chung */
.btn-custom {
    padding: 8px 12px; /* Đặt padding cho các nút */
    border-radius: 8px; /* Bo góc cho nút */
    transition: all 0.3s ease; /* Thêm hiệu ứng chuyển động */
    min-width: 100px; /* Đặt chiều rộng tối thiểu để các nút đều nhau */
}

/* Hiệu ứng hover */
.btn-custom:hover {
    transform: translateY(-2px); /* Nút nhô lên nhẹ khi hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Bóng đổ khi hover */
}

/* Tùy chỉnh màu nút */
.btn-primary {
    background-color: #007bff; /* Màu xanh */
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3; /* Màu xanh đậm hơn khi hover */
}

.btn-danger {
    background-color: #dc3545; /* Màu đỏ */
    border: none;
}

.btn-danger:hover {
    background-color: #c82333; /* Màu đỏ đậm hơn khi hover */
}

.btn-secondary {
    background-color: #6c757d; /* Màu xám */
    border: none;
}

.btn-secondary:hover {
    background-color: #5a6268; /* Màu xám đậm hơn khi hover */
}

/* Đảm bảo khoảng cách giữa các nút */
.me-2 {
    margin-right: 8px; /* Khoảng cách phải */
}



.page-wrapper {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    width: 105%;
    margin: -5px;
    padding: 7px;
    height: 70vh;
}

.breadcrumb-title {
    font-size: 1.5rem;
    color: #343a40;
    font-weight: bold;
}

.breadcrumb {
    background-color: transparent;
}

.card {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 10px;
}

.btn {
    border-radius: 30px;
    transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-primary {
    background-color: #007bff;
    border: none;
}

.btn-primary-nd {
    background-color: #17a2b8;
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-info {
    background-color: #17a2b8;
    border: none;
}

.btn-info:hover {
    background-color: #138496;
}

.btn-warning {
    background-color: #ffc107;
    border: none;
}

.btn-warning:hover {
    background-color: #e0a800;
}

.table {
    margin-top: 10px;
    border-collapse: separate;
    border-spacing: 0 15px;
}

.table th,
.table td {
    vertical-align: middle;
    border: none;
    padding: 23px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-light {
    background-color: #e9ecef;
}

.modal-content {
    border-radius: 15px;
}

.modal-header {
    background-color: #007bff;
    color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.modal-title {
    font-weight: bold;
}

.modal-footer .btn-primary {
    background-color: #007bff;
    border: none;
}

.position-relative input[type="text"] {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    padding-left: 2.5rem;
}

.position-absolute.top-50.product-show {
    left: 15px;
    color: #007bff;
}

img.img-thumbnail {
    border-radius: 50%;
    border: 2px solid #007bff;
}

.table-responsive {
    max-height: 400px;
    overflow-y: auto;
}
</style>