<template>
    <div class="container " style="margin-top: -70px;">
        <h2 class="text-center mb-4">Lịch sử Đơn dịch vụ</h2>
        <div class="row">
            <template v-for="(value, index) in thongTinCV" :key="index">
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <strong>Đơn dịch vụ #{{ index + 1 }}</strong>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Trạng thái:
                                <span v-if="value.tinh_trang_don_hang === 2" class="text-success">Đang Thực Hiện</span>
                                <span v-if="value.tinh_trang_don_hang === 3" class="text-success">Đã Hoàn Thành</span>
                            </h5>
                            <p class="card-text">
                                <strong v-if="value.ngay_bat_dau_lam">Ngày bắt đầu:</strong> {{ value.ngay_bat_dau_lam }} <br />
                                <strong v-if="value.ngay_ket_thuc">Ngày kết thúc:</strong> {{ value.ngay_ket_thuc }}<br />
                                <strong v-if="value.gio_bat_dau_lam_viec">Giờ bắt đầu:</strong> {{ value.gio_bat_dau_lam_viec }} <br />
                                <strong v-if="value.gio_ket_thuc_lam_viec">Giờ kết thúc:</strong> {{ value.gio_ket_thuc_lam_viec }}<br />
                                <strong v-if="value.tong_tien">Tổng tiền:</strong> {{ formatVNDd(value.tong_tien) }} <br />
                                <strong v-if="value.id_dich_vu">Tên Dịch Vụ:</strong>
                                <span v-if="value.id_dich_vu == 1" class="text-success">Giúp việc theo giờ</span>
                                <span v-if="value.id_dich_vu == 2" class="text-success">Giúp việc theo định kì</span>
                                <span v-if="value.id_dich_vu == 3" class="text-success">Tổng vệ sinh</span>
                            </p>
                        </div>
                        <div class="card-footer text-end">
                            <button class="btn btn-primary btn-sm" :data-bs-target="'#modal' + index" data-bs-toggle="modal">
                                Chi tiết
                            </button>
                        </div>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" :id="'modal' + index" tabindex="-1" aria-labelledby="'modalLabel' + index" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" :id="'modalLabel' + index">Đơn dịch vụ #{{ index + 1 }}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p v-if="value.tinh_trang_don_hang"><strong>Trạng thái:</strong>
                                        <span v-if="value.tinh_trang_don_hang === 2">Đang Thực Hiện</span>
                                        <span v-if="value.tinh_trang_don_hang === 3">Đã Hoàn Thành</span>
                                    </p>
                                    <p v-if="value.ngay_ket_thuc"><strong>Ngày kết thúc:</strong> {{ value.ngay_ket_thuc }}</p>
                                    <p v-if="value.tong_tien"><strong>Tổng tiền:</strong> {{ formatVNDd(value.tong_tien) }}</p>
                                    <p v-if="value.id_dich_vu"><strong>Tên Dịch Vụ:</strong></p>
                                    <ul v-if="value.id_dich_vu">
                                        <li v-if="value.id_dich_vu == 1">Giúp việc theo giờ</li>
                                        <li v-if="value.id_dich_vu == 2">Giúp việc theo định kì</li>
                                        <li v-if="value.id_dich_vu == 3">Tổng vệ sinh</li>
                                    </ul>
                                    <p v-if="value.so_tang_phuc_vu"><strong>Số tầng phục vụ:</strong> {{ value.so_tang_phuc_vu }}</p>
                                    <p v-if="value.loai_nha"><strong>Loại nhà:</strong> {{ value.loai_nha }}</p>
                                    <p v-if="value.dien_tich_tong_san"><strong>Diện tích tổng sàn:</strong> {{ value.dien_tich_tong_san }}</p>
                                    <p v-if="value.ghi_chu"><strong>Ghi chú:</strong> {{ value.ghi_chu }}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            thongTinCV: [],
        };
    },
    mounted() {
        this.loadCV();
    },
    methods: {
        formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        loadCV() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/don-hang/getAllDataDon", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thongTinCV = res.data.data;
                        console.log(this.thongTinCV);

                    } else {
                        console.log("Không có thông báo nào:", res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách thông báo:", error);
                });
        },
    },
};
</script>

<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    /* Khoảng cách giữa các thẻ */
}

.col-md-4 {
    flex: 1 1 calc(33.333% - 20px);
    /* Chia đều không gian */
    display: flex;
    /* Đảm bảo nội dung bên trong có thể giãn */
}

.card {
    flex-grow: 1;
    /* Đảm bảo các thẻ card có chiều cao bằng nhau */
    display: flex;
    flex-direction: column;
    /* Nội dung xếp theo cột */
    width: 1400px;
    margin-left: -110px;
}

.card-body {
    flex-grow: 1;
    /* Đẩy footer xuống đáy nếu nội dung ngắn hơn */
}

body {
    background-color: #f8f9fa;
    /* Màu nền nhẹ nhàng */
}

h2 {
    font-size: 24px;
    font-weight: bold;
    color: #343a40;
}

.card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
        width: 1450px;
    margin-left: -90px;
}

.card:hover {
    transform: scale(1.02);
    /* Hiệu ứng phóng nhẹ khi hover */
}



.card-body {
    padding: 15px;
    font-size: 14px;
    color: #495057;
}

.card-footer {
    background-color: #f1f1f1;
    padding: 10px 15px;
}

.card-footer .btn {
    padding: 5px 10px;
    font-size: 14px;
}

.text-success {
    color: #28a745 !important;
}

/* /* .text-warning {
    color: #ffc107 !important;
} */

/* .text-danger {
    color: #dc3545 !important;
} */

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    background-color: #f8f9fa;
    margin-bottom: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
}

.container {
    max-width: 1200px;
}
.table-responsive {
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
  max-width: 100%;
}
</style>