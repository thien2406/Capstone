<template>
    <div class="container " style="margin-top: -70px;">
        <h2 class="order-title">Đơn dịch vụ Theo Giờ</h2>
            <div class="order-details">
            <p><span class="label">Mã Đơn dịch vụ:</span> <span class="value">{{ donHang.ma_don_hang }}</span></p>
            <p><span class="label">Ngày bắt đầu làm:</span> <span class="value">{{ donHang.ngay_bat_dau_lam }}</span></p>
            <p><span class="label">Giờ bắt đầu làm việc:</span> <span class="value">{{ donHang.gio_bat_dau_lam_viec }}</span></p>
            <p><span class="label">Giờ kết thúc làm việc:</span> <span class="value">{{ donHang.gio_ket_thuc_lam_viec }}</span></p>
            <p><span class="label">Địa chỉ khách hàng:</span> <span class="value">{{ donHang.dia_chi_khach_hang }}</span></p>
            <p><span class="label">Ghi Chú Đơn dịch vụ</span> <span class="value">{{ donHang.ghi_chu || 'Không có thông tin' }}</span></p>
            <p><span class="label">Người sử dụng dịch vụ:</span> <span class="value">{{ donHang.ten_nguoi_su_dung_dich_vu }}</span></p>
            <p><span class="label">Số điện thoại người sử dụng:</span> <span class="value">{{ donHang.so_dien_thoai_nguoi_su_dung_dich_vu }}</span></p>
            <p><span class="label">Số Tiền</span> <span class="value">{{formatVND(donHang.so_tien_thanh_toan || 0) }}</span></p>
            <div class="button-group">
                <button v-on:click="nhanDon()" class="btn-accept">Nhận đơn</button>
                <router-link to="/nhan-vien/lich" class="btn-cancel">
                <button class="btn-cancel">Xem Lịch Ngay</button>
                </router-link>
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
                    .get(`http://127.0.0.1:8000/api/nhan-vien/don-hang/getDataDon/${idDonHang}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                        }
                    })
                    .then((res) => {
                        if (res.data.status) {
                            this.donHang = res.data.data;
                            console.log('123456', JSON.stringify(this.donHang));
                        } 
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lấy Đơn dịch vụ chi tiết: ", error);
                    });
            },
            formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        nhanDon(){
            const idDonHang = this.$route.params.id_don_hang;
            axios.post("http://127.0.0.1:8000/api/nhan-vien/don-hang/nhanDon",{ id: idDonHang }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
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
    padding: 8px 11px;
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
    background-color: #2436c3;
    color: #fff;
    box-shadow: 0 2px 8px rgba(220,53,69,0.2);
}

.btn-cancel:hover {
    background-color: #9f23c8;
    box-shadow: 0 4px 12px rgba(200,35,51,0.2);
}

</style>