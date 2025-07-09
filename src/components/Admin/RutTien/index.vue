<template>
    <div class="container">
        <div class="card-horizontal">
            <div class="card-left">
                <h2 class="card-title">{{ dataNhanVien.ho_va_ten }}</h2>
                <p class="card-subtitle"><strong>CDCD:</strong> {{ dataNhanVien.can_cuoc_cong_dan }}</p>
                <p class="card-subtitle"><strong>Ngày Sinh:</strong> {{ dataNhanVien.ngay_sinh }}</p>
                <p class="card-subtitle"><strong>Ngày Gửi Yêu Cầu:</strong> {{ dataNganHang.created_at }}</p>
            </div>
            <div class="card-right">
                <p><strong>Ngân hàng:</strong>{{ dataNhanVien.ten_ngan_hang }}</p>
                <p><strong>Số Tài Khoản:</strong> {{ dataNhanVien.stk }}</p>
                <p><strong>Số tiền cần rút:</strong> {{ formatVND(dataNganHang.so_tien_rut) }}</p>
                <div class="qr-container">
                    <img v-bind:src="dataNhanVien.qrRut" alt="QR Code" class="qr-code" />
                </div>
                <div v-if="soTienThieu > 0" class="alert alert-warning mt-4">
                <p>Bạn đã thanh toán: {{ formatVND(tongTienDaThanhToan) }}</p>
                <p>Số tiền còn thiếu: {{ formatVND(soTienThieu) }}</p>
                <p>Vui lòng tiếp tục thanh toán số tiền còn thiếu.</p>
            </div>
                <div class="card-footer">
                    <button v-on:click="xacNhanThanhToan()" class="btn btn-primary">Thanh Toán Ngay</button>
                    <router-link to="">
                        <button class="btn btn-danger">Trở lại trang thông báo</button>
                    </router-link>
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
            dataNhanVien:{},
            dataNganHang:{},
            isLoading: false,
            tongTienDaThanhToan: 0,
            soTienThieu: 0,
        }
    },
    mounted() {
        this.loadInfRut();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadInfRut() {
            const id_Thong_Bao = this.$route.params.id_thong_bao;
            axios
                .get(`http://127.0.0.1:8000/api/admin/getData-thanh-toan-yeu-cau-rut-tien-NV/${id_Thong_Bao}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.dataNganHang = res.data.thong_bao;
                    this.dataNhanVien = res.data.nhan_vien;
                    console.log('123', JSON.stringify(this.dataNhanVien));
                    console.log('456', JSON.stringify(this.dataNganHang));
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        xacNhanThanhToan() {
            this.isLoading = true;
            this.$toast.info("Hệ thống đang xử lý giao dịch, hãy đợi trong ít phút.");
            axios
                .post(
                    `http://127.0.0.1:8000/api/admin/vi-dien-tu/nhan-vien-rut-Tien/${this.dataNganHang.id}`,{}, // Payload nếu có
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_admin"),
                        },
                    }
                )
                .then((res) => {
                    var thong_bao =
                        "<b>Thông báo</b><span style='margin-top: 5px'>" +
                        res.data.message +
                        "<span>";
                    if (res.data.status && res.data.payment_sufficient) {
                        this.$toast.success(thong_bao);
                        // this.loadInfRut();
                    }  else {
                        // Thanh toán thiếu hoặc lỗi khác
                        this.$toast.error(thong_bao);
                        if (res.data.payment_sufficient === false) {
                            // Cập nhật số tiền đã thanh toán và số tiền còn thiếu
                            this.soTienThieu = res.data.amount_due || 0;
                            this.tongTienDaThanhToan = this.donHang.so_tien_thanh_toan - this.soTienThieu;
                            // Hiển thị thông báo số tiền còn thiếu
                            this.$toast.info(`Số tiền còn thiếu: ${this.formatVND(this.soTienThieu)}`);
                        }
                        // Giữ nguyên trang để khách hàng tiếp tục thanh toán
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },

}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    /* Chiều cao bằng màn hình */
}

.card-horizontal {
    display: flex;
    flex-direction: row;
    /* Hiển thị ngang */
    width: 900px;
    /* Chiều rộng của thẻ */
    border: 1px solid #ddd;
    border-radius: 12px;
    /* Bo góc nhẹ */
    background-color: #fff;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    /* Đổ bóng đẹp */
    overflow: hidden;
}

.card-left {
    flex: 1;
    /* Phần trái chiếm 1 phần */
    padding: 20px;
    background-color: #f9f9f9;
    /* Nền nhẹ cho phần trái */
    border-right: 1px solid #ddd;
    /* Đường ngăn cách */
}

.card-title {
    font-size: 24px;
    /* Tiêu đề lớn hơn */
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
}

.card-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
}

.card-right {
    flex: 2;
    /* Phần phải chiếm nhiều hơn */
    padding: 20px;
}

.card-right p {
    font-size: 16px;
    margin: 10px 0;
    color: #333;
}

.qr-container {
    text-align: center;
    margin: 20px 0;
}

.qr-code {
    width: 180px;
    /* Tăng kích thước QR Code */
    height: 180px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.card-footer {
    text-align: center;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
}

.card-footer .btn {
    padding: 12px 20px;
    /* Kích thước nút */
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.card-footer .btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
}

.card-footer .btn-primary:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    /* Hiệu ứng nút */
}

.card-footer .btn-danger {
    background-color: #dc3545;
    color: #fff;
    border: none;
}

.card-footer .btn-danger:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    /* Hiệu ứng nút */
}
</style>