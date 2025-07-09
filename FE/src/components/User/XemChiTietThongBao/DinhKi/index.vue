<template>
    <div class="container mt-4">
        <h2 class="order-title">Chi tiết Đơn dịch vụ Định Kì</h2>
        <div class="order-details" v-if="donHang">
            <p><span class="label">Mã Đơn dịch vụ:</span> <span class="value">{{ donHang.ma_don_hang }}</span></p>
            <p><span class="label">Ngày bắt đầu làm:</span> <span class="value">{{ donHang.ngay_bat_dau_lam }}</span></p>
            <p><span class="label">Ngày kết thúc làm:</span> <span class="value">{{ donHang.ngay_ket_thuc }}</span></p>
            <p><span class="label">Ngày Làm Việc Trong Tuần:</span>
                <span class="value">
                    <template v-for="(ngay, index) in getNgayTrongTuan(donHang.so_ngay_phuc_vu_hang_tuan)" :key="index">
                        {{ ngay }}<span v-if="index < getNgayTrongTuan(donHang.so_ngay_phuc_vu_hang_tuan).length - 1">, </span>
                    </template>
                    Hàng tuần
                </span>
            </p>
            <p><span class="label">Số tháng phục vụ :</span> <span class="value">{{ donHang.so_thang_phuc_vu }}</span></p>
            <p><span class="label">Tổng số buổi làm:</span> <span class="value">{{ donHang.tong_so_buoi_phuc_vu_theo_so_thang_phuc_vu }}</span></p>
            <p><span class="label">Giờ bắt đầu làm việc:</span> <span class="value">{{ donHang.gio_bat_dau_lam_viec }}</span></p>
            <p><span class="label">Giờ kết thúc làm việc:</span> <span class="value">{{ donHang.gio_ket_thuc_lam_viec }}</span></p>
            <p><span class="label">Địa chỉ khách hàng:</span> <span class="value">{{ donHang.dia_chi_nguoi_nhan }}</span></p>
            <p><span class="label">Ghi Chú Đơn dịch vụ:</span> <span class="value">{{ donHang.ghi_chu || 'Không có ghi chú' }}</span></p>
            <p><span class="label">Người sử dụng dịch vụ:</span> <span class="value">{{ donHang.ten_nguoi_nhan }}</span></p>
            <p><span class="label">Số điện thoại người sử dụng:</span> <span class="value">{{ donHang.so_dien_thoai_nguoi_nhan }}</span></p>
            <p><span class="label">Số Tiền:</span> <span class="value">{{formatVND(donHang.so_tien_thanh_toan || 0) }}</span></p>
        </div>
        <div class="button-group">
            <router-link to="/" class="btn-accept">Về Trang Chủ</router-link>
            </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id_don_hang'],
    data() {
        return {
            donHang: null,
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
                        console.log('123', JSON.stringify(this.donHang));
                    } else {
                        console.log("Đơn dịch vụ không tồn tại:", res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy Đơn dịch vụ chi tiết: ", error);
                });
        },
        getNgayTrongTuan(soNgay) {
        // Loại bỏ dấu ngoặc vuông và khoảng trắng, sau đó tách chuỗi thành mảng
        soNgay = soNgay.replace(/[\[\]\s]/g, ''); // Loại bỏ dấu ngoặc vuông và khoảng trắng
        const ngayTrongTuan = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return soNgay.split(',').map(ngay => ngayTrongTuan[parseInt(ngay.trim())]);
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