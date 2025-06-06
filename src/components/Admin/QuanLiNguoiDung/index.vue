<template>
    <div class="page-wrapper">
        <div class="page-content mb" style="margin-top: -90px;">
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Quản lý Tài Khoản</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                            <li class="breadcrumb-item active" aria-current="page">Tài Khoản Người Dùng</li>
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
                                Thêm Người Dùng Mới
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
                                    <th class="text-center">Ngày Sinh</th>
                                    <th class="text-center">Giới Tính</th>
                                    <th class="text-center">Số Điện Thoại</th>
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
                                        <td class="align-middle text-center">{{ value.ngay_sinh }}</td>
                                        <td class="align-middle text-center">
                                            <span v-if="value.gioi_tinh == 1" class="text-success">Nam</span>
                                            <span v-else class="text-danger">Nữ</span>
                                        </td>
                                        <td class="align-middle text-center">{{ value.so_dien_thoai }}</td>
                                        <td class="align-middle text-center">
                                            <div class="d-flex flex-column">
                                                <!-- Nút Kích Hoạt hoặc Chưa Kích Hoạt -->
                                                <button v-on:click="kichhoatnguoidung(value)"
                                                    v-if="value.is_active == 1" class="btn text-nowrap mb-2"
                                                    style="background-color: #28A745; color: white;">
                                                    Đã Kích Hoạt
                                                </button>
                                                <button v-on:click="kichhoatnguoidung(value)" v-else
                                                    class="btn text-nowrap mb-2"
                                                    style="background-color: #DC3545; color: white;">
                                                    Chưa Kích Hoạt
                                                </button>
                                                <!-- Nút Chặn hoặc Mở Chặn -->
                                                <button v-on:click="blocknguoidung(value)" v-if="value.is_block == 1"
                                                    class="btn" style="background-color: #FD7E14; color: white;">Chặn
                                                    Tài Khoản</button>
                                                <button v-on:click="blocknguoidung(value)" v-else class="btn"
                                                    style="background-color: #6C757D; color: white;">Mở Chặn Tài
                                                    Khoản</button>
                                            </div>
                                        </td>
 <td class="align-middle text-center" style="vertical-align: middle;">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
    <button class="btn btn-custom btn-primary" data-bs-toggle="modal"
      data-bs-target="#capnhatnv"
      v-on:click="Object.assign(update_nd, value)">
      Cập nhật
    </button>

    <button class="btn btn-custom btn-danger" data-bs-toggle="modal"
      data-bs-target="#deletenv" v-on:click="delete_nd = value">
      Xóa
    </button>
  </div>
</td>


                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
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
                                        <input type="text" class="form-control" v-model="create_nd.email"
                                            id="Nhập Email" placeholder="Nhập Email">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Họ và Tên</label>
                                        <input type="text" class="form-control" v-model="create_nd.ho_va_ten"
                                            id="Nhập Họ và Tên" placeholder="Nhập Họ Và Tên">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Mật Khẩu</label>
                                        <input type="password" class="form-control" v-model="create_nd.password"
                                            id="Nhập Mật Khẩu" placeholder="Nhập Mật Khẩu">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Nhập Lại Mật Khẩu</label>
                                        <input type="password" class="form-control" v-model="create_nd.re_password"
                                            id="Nhập Mật Khẩu" placeholder="Nhập Mật Khẩu">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Ngày Sinh</label>
                                        <input type="date" class="form-control" v-model="create_nd.ngay_sinh"
                                            id="Nhập Ngày Sinh">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Giới Tính</label>
                                        <select v-model="create_nd.gioi_tinh" class="form-control">
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Số Điện Thoại</label>
                                        <input type="text" class="form-control" v-model="create_nd.so_dien_thoai"
                                            id="Nhập Số Điện Thoại" placeholder="Nhập Số Điện Thoại">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Trạng Thái</label>
                                        <select v-model="create_nd.tinh_trang" class="form-control">
                                            <option value="1">Đã Kích Hoạt</option>
                                            <option value="0">Ngừng Kích Hoạt</option>
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
                                    <input type="text" class="form-control" v-model="update_nd.ho_va_ten"
                                        placeholder="Nhập họ và tên">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" v-model="update_nd.email"
                                        placeholder="Nhập email">
                                </div>
                                <div class="col-md-6 ">
                                    <label class="form-label">Mật Khẩu</label>
                                    <input type="password" class="form-control" v-model="update_nd.password"
                                        id="Nhập Mật Khẩu" placeholder="Nhập Mật Khẩu">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Nhập Lại Mật Khẩu</label>
                                    <input type="password" class="form-control" v-model="update_nd.re_password"
                                        id="Nhập Mật Khẩu" placeholder="Nhập Mật Khẩu">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="text" class="form-control" v-model="update_nd.so_dien_thoai"
                                        placeholder="Nhập số điện thoại">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Sinh</label>
                                    <input type="date" class="form-control" v-model="update_nd.ngay_sinh"
                                        placeholder="Nhập ngày sinh">
                                </div>
                                <div class="col-md-6">
    <label class="form-label">Giới Tính</label>
    <select v-model="update_nd.gioi_tinh" class="form-control custom-select-style">
        <option value="1">Nam</option>
        <option value="0">Nữ</option>
    </select>
</div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" v-on:click="updateUser(update_nd.id)"
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
                            <h5 class="modal-title" id="deletenvLabel">Xóa Người Dùng</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
                            <p><strong>{{ delete_nd.ho_va_ten }}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-danger" v-on:click="deleteUser(delete_nd.id)"
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
            create_nd: {},
            update_nd: {},
            delete_nd: {},
        };
    },
    mounted() {
        this.loadusers();
    },
    methods: {
        loadusers() {
            axios
                .get("http://127.0.0.1:8000/api/admin/getDataNguoiDung", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.users = res.data.data;
                    console.log('123', JSON.stringify(this.users));

                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên:", error);
                });
        },

        createUser() {
            axios
                .post("http://127.0.0.1:8000/api/admin/createNguoiDung", this.create_nd, {
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

        updateUser(id) {
            axios
                .put(`http://127.0.0.1:8000/api/admin/updateNguoiDung/${id}`, this.update_nd, {
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
                .delete(`http://127.0.0.1:8000/api/admin/deleteNguoiDung/${id}`, {
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
        kichhoatnguoidung(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/kich-Hoat-TK-Nguoi-dung", payload, {
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
        blocknguoidung(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/change-Block-NhanVien", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);

                        // Cập nhật trực tiếp trạng thái is_block trong dữ liệu users
                        const index = this.users.findIndex(user => user.id === payload.id);
                        if (index !== -1) {
                            this.users[index].is_block = this.users[index].is_block === 1 ? 0 : 1;
                        }
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                });
        }

    },
}

</script>

<style scoped>
.custom-select-style {
    width: 207%; /* Chiều rộng chiếm toàn bộ container */
    
}


.btn-custom {
    padding: 8px 12px;
    /* Đặt padding cho các nút */
    border-radius: 8px;
    /* Bo góc cho nút */
    transition: all 0.3s ease;
    /* Thêm hiệu ứng chuyển động */
    min-width: 100px;
    /* Đặt chiều rộng tối thiểu để các nút đều nhau */
}

/* Hiệu ứng hover */
.btn-custom:hover {
    transform: translateY(-2px);
    /* Nút nhô lên nhẹ khi hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    /* Bóng đổ khi hover */
}

/* Tùy chỉnh màu nút */
.btn-primary {
    background-color: #007bff;
    /* Màu xanh */
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3;
    /* Màu xanh đậm hơn khi hover */
}

.btn-danger {
    background-color: #dc3545;
    /* Màu đỏ */
    border: none;
}

.btn-danger:hover {
    background-color: #c82333;
    /* Màu đỏ đậm hơn khi hover */
}

.btn-secondary {
    background-color: #6c757d;
    /* Màu xám */
    border: none;
}

.btn-secondary:hover {
    background-color: #5a6268;
    /* Màu xám đậm hơn khi hover */
}

/* Đảm bảo khoảng cách giữa các nút */
.me-2 {
    margin-right: 8px;
    /* Khoảng cách phải */
}

.page-wrapper {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    width: 105%;
    margin: -5px;
    padding: 7px;
    height: 70vh;
}



.breadcrumb {
    background-color: transparent;
}
.page-breadcrumb {
    margin-left: -85px;
}
.breadcrumb-title {
    font-size: 1.5rem;
    color: #343a40;
}

.card {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 1450px;
    margin-left: -90px;
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
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
  max-width: 100%;
}
</style>