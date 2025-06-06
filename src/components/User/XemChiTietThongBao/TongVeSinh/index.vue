<template>
    <div class="container mt-4">
        <h2 class="order-title">Chi tiết Đơn dịch vụ Tổng Vệ Sinh</h2>
        <div class="order-details" v-if="donHang">
            <p><span class="label">Mã Đơn dịch vụ:</span> <span class="value">{{ donHang.ma_don_hang }}</span></p>
            <p><span class="label">Loại Nhà:</span> <span class="value">{{ donHang.loai_nha || 'Không có thông tin' }}</span></p>
            <p><span class="label">Diện Tích Tổng Sàn:</span> <span class="value">{{ getDienTichTongSan(donHang.dien_tich_tong_san) }}</span></p>
            <p><span class="label">Ngày bắt đầu làm:</span> <span class="value">{{ donHang.ngay_bat_dau_lam }}</span></p>
            <p><span class="label">Giờ bắt đầu làm việc:</span> <span class="value">{{ donHang.gio_bat_dau_lam_viec }}</span></p>
            <p><span class="label">Giờ kết thúc làm việc:</span> <span class="value">{{ donHang.gio_ket_thuc_lam_viec }}</span></p>
            <p><span class="label">Địa chỉ khách hàng:</span> <span class="value">{{ donHang.dia_chi_nguoi_nhan }}</span></p>
            <p><span class="label">Ghi Chú Đơn dịch vụ:</span> <span class="value">{{ donHang.ghi_chu || 'Không có ghi chú' }}</span></p>
            <p><span class="label">Người sử dụng dịch vụ:</span> <span class="value">{{ donHang.ten_nguoi_nhan }}</span></p>
            <p><span class="label">Số điện thoại người sử dụng:</span> <span class="value">{{ donHang.so_dien_thoai_nguoi_nhan }}</span></p>
            <p><span class="label">Số Tiền:</span> <span class="value">{{formatVND(donHang.so_tien_thanh_toan || 0) }}</span></p>
            <div class="button-group">
                <router-link to="/" class="btn-accept">Về Trang Chủ</router-link>   
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            donHang: {
                'id': this.$route.params.id_don_hang
            },
        };
    },
    mounted() {
        this.loadDonHang();
    },
    methods: {
        loadDonHang() {
            const idDonHang = this.$route.params.id_don_hang;
            axios
                .get(`http://127.0.0.1:8000/api/nguoi-dung/chi-tiet-don-hang/getData/${idDonHang}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.donHang = res.data.data;
                    } else {
                        console.log("Đơn dịch vụ không tồn tại:", res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy Đơn dịch vụ chi tiết:", error);
                });
        },
        getDienTichTongSan(value) {
            switch (value) {
                case 1:
                    return 'Dưới 60m²';
                case 1.5:
                    return '60-90m²';
                case 2:
                    return 'Trên 90m²-120m²';
                case 2.5:
                    return '120-150m²';
                case 3:
                    return '150-180m²';
                case 3.5:
                    return '180-210m²';
                default:
                    return 'Không có thông tin';
            }
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        
    }
    }
</script>
<style scoped>
.container {
    max-width: 600px;
    margin-top: 40px;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.order-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.order-details p {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    background-color: #f8f9fa;
    border-radius: 8px;
    align-items: center;
    padding: 12px 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: background-color 0.3s ease;
}

.order-details p:hover {
    background-color: #eef1f5;
}

.label {
    font-weight: 600;
    color: #555;
    width: 50%;
    word-wrap: break-word;
}

.value {
    color: #333;
    text-align: right;
    width: 50%;
    word-wrap: break-word;
    padding-left: 10px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}

.btn-accept,
.btn-cancel {
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
    outline: none;
    text-transform: uppercase;
}

.btn-accept {
    background-color: #28a745;
    color: #fff;
    box-shadow: 0 2px 8px rgba(40,167,69,0.2);
}

.btn-accept:hover {
    background-color: #218838;
    box-shadow: 0 4px 12px rgba(33,136,56,0.2);
}

.btn-cancel {
    background-color: #dc3545;
    color: #fff;
    box-shadow: 0 2px 8px rgba(220,53,69,0.2);
}

.btn-cancel:hover {
    background-color: #c82333;
    box-shadow: 0 4px 12px rgba(200,35,51,0.2);
}
</style>