<template>
    <div class="page-wrapper">
        <div class="page-content mb" style="margin-top: -90px;">
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Quản lý Ví Điện Tử</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                            <li class="breadcrumb-item active" aria-current="page">Ví Người Dùng</li>
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
                    </div>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Email</th>
                                    <th class="text-center">Họ Và Tên</th>
                                    <th class="text-center">Số Tài Khoản</th>
                                    <th class="text-center">Tên Ngân Hàng</th>
                                    <th class="text-center">Số Dư Ví</th>
                                    <th class="text-center">Số Điện Thoại</th>
                                    <th class="text-center">link qr</th>
                                    <th class="text-center">Chỉnh Sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in thongtinVi" :key="index">
                                    <tr>
                                        <th class="align-middle text-center">{{ index + 1 }}</th>
                                        <td class="align-middle text-center">{{ value.email }}</td>
                                        <td class="align-middle text-center">{{ value.ho_va_ten }}</td>
                                        <td class="align-middle text-center">{{ value.stk }}</td>
                                        <td class="align-middle text-center">{{ value.ten_ngan_hang }}</td>
                                        <td class="align-middle text-center">{{ value.so_du }}</td>
                                        <td class="align-middle text-center">{{ value.so_dien_thoai }}</td>
                                        <td class="text-center">
  <div v-if="expandedIndex !== index" class="truncate-multiline">
    {{ value.qrRut }}
  </div>
  <div v-else>
    {{ value.qrRut }}
  </div>
  <button @click="toggleExpand(index)" class="btn-toggle">
    {{ expandedIndex === index ? 'Ẩn bớt' : 'Xem thêm' }}
  </button>
</td>

                                        <td class="align-middle text-center">
                                            <div class="btn-group d-flex justify-content-center" role="group"
                                                aria-label="Button group">
                                                <!-- Nút Cộng Tiền -->
                                                <button v-on:click="Object.assign(soTienCong, value)"
                                                    class="btn btn-custom btn-success me-2" data-bs-toggle="modal"
                                                    data-bs-target="#modalCongTien">
                                                    <i class="bx bx-plus-circle"></i> Cộng Tiền
                                                </button>

                                                <!-- Nút Trừ Tiền -->
                                                <button v-on:click="Object.assign(soTienTru, value)"
                                                    class="btn btn-custom btn-danger me-2" data-bs-toggle="modal"
                                                    data-bs-target="#modalTruTien">
                                                    <i class="bx bx-minus-circle"></i> Trừ Tiền
                                                </button>

                                                <!-- Nút Chỉnh Sửa -->
                                                <button v-on:click="Object.assign(upDateQR, value)"
                                                    class="btn btn-custom btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#capnhatnv">
                                                    <i class="bx bx-edit-alt"></i> Chỉnh Sửa
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

            <div class="modal fade" id="modalCongTien" tabindex="-1" aria-labelledby="modalCongTienLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalCongTienLabel">Cộng Tiền</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formCongTien">
                                <div class="mb-3">
                                    <label for="soTienCong" class="form-label">Nhập số tiền muốn cộng:</label>
                                    <input v-model="soTienCong.so_tien" type="number" class="form-control" min="0"
                                        placeholder="Nhập số tiền">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button v-on:click="congTienVaoVi()" type="button" class="btn btn-primary"
                                id="xacNhanCongTien">Xác
                                Nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="capnhatnv" tabindex="-1" aria-labelledby="capnhatnvLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
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
                                <!-- Tên Ngân Hàng -->
                                <div class="mb-3">
                                    <label class="form-label"><i class="bx bx-bank"></i> Tên Ngân Hàng</label>
                                    <input v-model="upDateQR.ten_ngan_hang" type="text" class="form-control"
                                        value="Ngân Hàng ACB" readonly>
                                </div>

                                <!-- Số Tài Khoản -->
                                <div class="mb-3">
                                    <label class="form-label"><i class="bx bx-credit-card"></i> Số Tài Khoản</label>
                                    <input v-model="upDateQR.stk" type="text" class="form-control" value="123456789"
                                        readonly>
                                </div>

                                <!-- Link QR -->
                                <div class="mb-3">
                                    <label class="form-label"><i class="bx bx-qr"></i> Link QR</label>
                                    <input v-model="upDateQR.qrRut" type="text" class="form-control"
                                        placeholder="Nhập link QR mới">
                                </div>
                            </form>
                        </div>

                        <!-- Footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i
                                    class="bx bx-x"></i>
                                Đóng</button>
                            <button @click="updateQRCode()" type="button" class="btn btn-primary"><i
                                    class="bx bx-save"></i> Lưu
                                thay
                                đổi</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal Trừ Tiền -->
            <div class="modal fade" id="modalTruTien" tabindex="-1" aria-labelledby="modalTruTienLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalTruTienLabel">Trừ Tiền</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="formTruTien">
                                <div class="mb-3">
                                    <label for="soTienTru" class="form-label">Nhập số tiền muốn trừ:</label>
                                    <input v-model="soTienTru.so_tien" type="number" class="form-control" id="soTienTru"
                                        name="soTienTru" min="0" placeholder="Nhập số tiền">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button v-on:click="truTienVaoVi()" type="button" class="btn btn-primary"
                                id="xacNhanTruTien">Xác
                                Nhận</button>

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
            thongtinVi: [],
            upDateQR: {},
            soTienCong: {
                so_tien: 0
            },
            soTienTru: {
                so_tien: 0
            },
            isExpanded: false,
                expandedIndex: null, // Dùng để biết dòng nào đang mở QR

        };
    },
    mounted() {
        this.loadThongTinVi();
    },
    methods: {
        formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        loadThongTinVi() {
            axios
                .get("http://127.0.0.1:8000/api/admin/ngan-hang-vi-nguoi-dung/getData", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.thongtinVi = res.data.data;
                    console.log('123', JSON.stringify(this.thongtinVi));

                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
                
        },
        updateQRCode() {
            axios
                .post("http://127.0.0.1:8000/api/admin/ngan-hang-vi-nguoi-dung/updateQr", this.upDateQR, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadThongTinVi();
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
        validateSoTien(value) {
            if (!value || value <= 0) {
                const thong_bao = `<b>Thông báo</b><span style="margin-top: 5px">Số tiền không được bé hơn hoặc bằng 0!<span>`;
                this.$toast.error(thong_bao);
                return false;
            }
            return true;
        },
        congTienVaoVi() {
            if (!this.validateSoTien(this.soTienCong.so_tien)) {
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/ngan-hang-vi-nguoi-dung/congTien", this.soTienCong, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadThongTinVi();
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
        truTienVaoVi() {
            if (!this.validateSoTien(this.soTienCong.so_tien)) {
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/ngan-hang-vi-nguoi-dung/truTien", this.soTienTru, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadThongTinVi();
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
        toggleExpand(index) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
    }
    
}
</script>

<style scoped>
/* Tùy chỉnh chung cho nút */
.btn-custom {
    padding: 10px 16px;
    /* Kích thước padding */

    border-radius: 8px;
    /* Bo tròn góc nút */
    transition: all 0.3s ease;
    /* Hiệu ứng mượt khi hover */
    display: inline-flex;
    align-items: center;
    /* Căn icon và text thẳng hàng */
    gap: 5px;
    /* Khoảng cách giữa icon và text */
    min-width: 120px;
    /* Chiều rộng tối thiểu */
    justify-content: center;
}

/* Hiệu ứng hover */
.btn-custom:hover {
    transform: translateY(-2px);
    /* Nút nhô lên khi hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    /* Hiệu ứng bóng đổ */
}

/* Nút Cộng Tiền */
.btn-success {
    background-color: #28a745;
    /* Màu xanh */
    border: none;
}

.btn-success:hover {
    background-color: #218838;
    /* Màu xanh đậm khi hover */
}

/* Nút Trừ Tiền */
.btn-danger {
    background-color: #dc3545;
    /* Màu đỏ */
    border: none;
}

.btn-danger:hover {
    background-color: #c82333;
    /* Màu đỏ đậm khi hover */
}

/* Nút Chỉnh Sửa */
.btn-primary {
    background-color: #007bff;
    /* Màu xanh dương */
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3;
    /* Màu xanh dương đậm khi hover */
}

/* Hiệu ứng cho biểu tượng */
.btn-custom i {
    font-size: 16px;
    /* Kích thước icon */
}


.btn-toggle {
    background-color: #007bff;
    /* Màu nền xanh dương */
    color: #fff;
    /* Màu chữ trắng */
    border: none;
    /* Loại bỏ viền */
    border-radius: 20px;
    /* Làm tròn góc */
    padding: 8px 16px;
    /* Khoảng cách nội dung */
    font-size: 14px;
    /* Cỡ chữ */
    font-weight: bold;
    /* In đậm chữ */
    cursor: pointer;
    /* Thêm hiệu ứng trỏ chuột */
    transition: all 0.3s ease-in-out;
    /* Hiệu ứng chuyển động mượt mà */
}

.btn-toggle:hover {
    background-color: #0056b3;
    /* Thay đổi màu khi hover */
    transform: translateY(-2px);
    /* Hiệu ứng di chuyển lên */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Thêm bóng */
}

.btn-toggle:active {
    transform: translateY(0);
    /* Giảm hiệu ứng khi nhấn */
    box-shadow: none;
    /* Loại bỏ bóng */
}

.truncate-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: 100px;
    text-align: left;
}

.modal-content {
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
    background-color: #007bff;
    color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.modal-title i {
    font-size: 1.5rem;
}

.modal-body {
    padding: 20px;
    background-color: #f9f9f9;
}

.modal-footer {
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-footer .btn {
    display: flex;
    align-items: center;
    gap: 5px;
}

.modal-footer .btn-secondary {
    background-color: #6c757d;
    border: none;
}

.modal-footer .btn-primary {
    background-color: #007bff;
    border: none;
}

.modal-footer .btn:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

input.form-control {
    border-radius: 10px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px 15px;
}

.page-wrapper {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    width: 105%;
    margin: -5px;
    padding: 7px;
    height: 70vh;
}

.page-breadcrumb {
    margin-left: -85px;
}
.breadcrumb-title {
    font-size: 1.5rem;
    color: #343a40;
}

.breadcrumb {
    background-color: transparent;
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