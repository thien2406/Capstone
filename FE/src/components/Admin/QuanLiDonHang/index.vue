<template>
    <div class="page-wrapper">
        <div class="page-content mb" style="margin-top: -50px">
            <!-- Breadcrumb -->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Quản lý Đơn dịch vụ</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                            <li class="breadcrumb-item active" aria-current="page">Danh Sách Đơn dịch vụ</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <!-- Card -->
            <div class="card move-up shadow-sm">
                <div class="card-body">
                    <div class="d-lg-flex align-items-center mb-4 gap-3">
                        <!-- Search Bar -->
                        <div class="position-relative w-40">
                            <input type="text" class="form-control ps-5 radius-30" placeholder="Tìm kiếm Đơn dịch vụ theo mã Đơn dịch vụ hoặc tên dịch vụ" v-model="searchTerm" @input="searchGiaoDich">
                            <span class="position-absolute top-50 search-icon translate-middle-y">
                                <i class="bx bx-search"></i>
                            </span>
                        </div>
                    </div>
                    <!-- Table -->
                     <div class="table-responsive">
                        <table class="table table-striped align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Mã Đơn dịch vụ</th>
                                    <th class="text-center">Dịch Vụ</th>
                                    <th class="text-center">Khách Hàng</th>
                                    <th class="text-center">Số Điện Khách Hàng</th>
                                    <th class="text-center">Nhân Viên Nhận</th>
                                    <th class="text-center">Ngày Đặt</th>
                                    <th class="text-center">Tổng Tiền (VNĐ)</th>
                                    <th class="text-center">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in thongtinDonHang" :key="index">
                                    <tr>
                                        <td class="text-center">{{ index + 1 }}</td>
                                        <td class="text-center">{{ value.ma_don_hang }}</td>
                                        <td class="text-center">{{ value.ten_lua_chon }}</td>
                                        <td class="text-center">{{ value.ten_nguoi_nhan }}</td>
                                        <td class="text-center">{{ value.so_dien_thoai }}</td>
                                        <template v-if="value.nhan_vien && value.nhan_vien.length">
                                            <td class="text-center">
                                                {{ value.nhan_vien.map(nhanVien => nhanVien.ho_va_ten).join(', ') }}
                                            </td>
                                        </template>
                                        <template v-else>
                                            <td class="text-center">Nhân viên chưa nhận đơn</td>
                                        </template>
                                        <td class="text-center">{{ formatDate(value.created_at) }}</td>
                                        <td class="text-center">{{ formatVNDd(value.so_tien_thanh_toan) }}</td>
                                        <td class="text-center">
                                            <button :class="getStatusClass(value.tinh_trang_don_hang)"
                                                class="btn btn-status">
                                                {{ getStatusLabel(value.tinh_trang_don_hang) }}
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
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
            thongtinDonHang: [],
            searchTerm: '',
        };
    },
    mounted() {
        this.loadThongTinDonHang();
    },
    methods: {
        getStatusLabel(status) {
            switch (status) {
                case 0:
                    return "Chưa Đặt Dịch Vụ";
                case 1:
                    return "Đang Xử Lý";
                case 2:
                    return "Đã Nhận Đơn";
                case 3:
                    return "Hoàn Thành";
                case 4:
                    return "Đã Hủy Đơn";
                default:
                    return "Không Xác Định";
            }
        },
        // Lấy lớp CSS tương ứng với tình trạng
        getStatusClass(status) {
            switch (status) {
                case 0:
                    return "btn-secondary"; // Màu xám
                case 1:
                    return "btn-warning"; // Màu vàng
                case 2:
                    return "btn-primary"; // Màu xanh dương
                case 3:
                    return "btn-success"; // Màu xanh lá
                case 4:
                    return "btn-danger"; // Màu đỏ
                default:
                    return "btn-dark"; // Màu đen nếu không xác định
            }
        },
        formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        formatDate(inputDate) {
            if (!inputDate) return ""; // Trả về rỗng nếu không có dữ liệu đầu vào
            const date = new Date(inputDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
            const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
            return `${year}-${month}-${day}`;
        },
        loadThongTinDonHang() {
            axios
                .get("http://127.0.0.1:8000/api/admin/don-hang/getDataAll", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thongtinDonHang = res.data.data;
                        console.log('123', JSON.stringify(this.thongtinDonHang));
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
        searchGiaoDich() {
            if (this.searchTerm.trim() === '') {
                this.loadThongTinDonHang();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/don-hang/search",
                    {
                        noi_dung_tim: this.searchTerm
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                        }
                    })
                .then((res) => {
                        this.thongtinDonHang = res.data.data;
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '</span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
    }

}
</script>

<style scoped>
.card.move-up.shadow-sm {
    border: 1px solid #ddd; /* Viền nhẹ cho thẻ */
    border-radius: 10px; /* Bo góc nhẹ */
    
    margin: 20px auto; /* Tạo khoảng cách giữa các thẻ và căn giữa */
    max-width: 1480px; /* Chiều rộng tối đa của thẻ */
    width: 240%;
    margin-left: -190px;
}


.table-responsive {
    max-height: 341px; /* Chiều cao tối đa cho bảng */
    overflow-y: auto; /* Cho phép cuộn dọc */
    border: 1px solid #ddd; /* Viền nhẹ quanh bảng */
    
    width: 240%; /* Chiều rộng đầy đủ */
    max-width: 1462px; /* Giới hạn chiều rộng tối đa nếu cần */
    
    margin-left: -10px; /* Đẩy bảng sát bên trái */

}

/* Đảm bảo tiêu đề bảng (thead) cố định khi cuộn */
.table-responsive thead th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa; /* Nền tiêu đề */
    z-index: 2;
    border-bottom: 1px solid #ddd;
}
.table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.95rem;
    margin-bottom: 0;
}

.table thead th {
    background-color: #f8f9fa;
    color: #495057;
    font-weight: bold;
    text-transform: uppercase;
    padding: 12px 15px;
    border-bottom: 2px solid #dee2e6;
    text-align: center;
}

.table tbody tr {
    transition: background-color 0.3s ease;
    /* Hiệu ứng hover */
}

.table tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
    /* Màu kẻ sọc */
}

.table tbody tr:nth-child(even) {
    background-color: #ffffff;
}

/* Hiệu ứng hover */
.table tbody tr:hover {
    background-color: #e9ecef;
    /* Màu nổi bật khi hover */
    cursor: pointer;
}

.table tbody td {
    padding: 12px 15px;
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
}

.badge {
    padding: 5px 10px;
    font-size: 0.85rem;
    font-weight: bold;
    border-radius: 12px;
}

.badge.bg-success {
    background-color: #28a745;
    color: #ffffff;
}

.badge.bg-warning {
    background-color: #ffc107;
    color: #212529;
}

@media (max-width: 768px) {
    .table thead {
        display: none;
    }

    .table tbody td {
        display: block;
        text-align: right;
        position: relative;
        padding-left: 50%;
    }

    .table tbody td::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 15px;
        font-weight: bold;
        text-align: left;
    }
}

.page-breadcrumb {
    margin-top: -150px;
    margin-left: -180px;
}

.btn-status {
    padding: 8px 15px;
    font-size: 0.85rem;
    font-weight: bold;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.btn-success {
    background-color: #28a745;
    color: #ffffff;
}

.btn-success:hover {
    background-color: #218838;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-warning {
    background-color: #ffc107;
    color: #212529;
}

.btn-warning:hover {
    background-color: #e0a800;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
