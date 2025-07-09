<template>
    <div class="completed-orders-container " style="margin-top: -30px;">
        <h2 class="text-center mb-4">Lịch Sử Đơn dịch vụ Đã Hủy</h2>
        <div class="table-container">
        <table class="table table-bordered table-striped">
            <thead class="table-header">
                <tr>
                    <th>Mã Đơn dịch vụ</th>
                    <th>Ngày Bắt Đầu Làm</th>
                    <th>Ngày Kết Thúc Làm</th>
                    <th>Tổng Số Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Chi Tiết</th>
                    <th>Đặt lại</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(value, index) in DonHangDaHuy" :key="index">
                    <template v-if="value.tinh_trang_don_hang === 4">
                        <tr>
                            <td>{{ value.ma_don_hang }}</td>
                            <td>{{ value.ngay_bat_dau_lam }}</td>
                            <td>{{ value.ngay_ket_thuc }}</td>
                            <td>{{ formatVND(value.so_tien_thanh_toan) }}</td>
                            <td>
                                <button class="btn text-nowrap mb-2" style="background-color: #DC3545; color: white;">
                                    Đã hủy
                                </button>
                                
                            </td>
                            <td>
                                <button class="btn text-nowrap mb-2" style="background-color: #28A745; color: white;">
                                    Xem Thêm
                                </button>
                            </td>
                            <td>
                                <button class="btn text-nowrap mb-2" style="background-color: #28A745; color: white;">
                                    Đặt lại Đơn dịch vụ
                                </button>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        * Chú thích: Khách Hàng Bấm Nút Đã Hủy để có thể đặt lại Đơn dịch vụ (Nếu muốn đặt nhanh).
                    </td>
                </tr>
            </tfoot>
        </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            DonHangDaHuy: [],
        };
    },
    mounted() {
        this.loadDonHangDaHuy();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadDonHangDaHuy() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/lich-su-don-hang-da-huy-don/getDataLSHDToND", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.DonHangDaHuy = res.data.data;
                        // console.log("Don Hang da huy", JSON.stringify(this.DonHangDaHuy));
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '</span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '</span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
        changeStatus(id) {
            axios
                .post(`http://127.0.0.1:8000/api/nguoi-dung/thay-doi-status-don-hang/changeStaTusHoanThanh/` + id, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    console.log('Response from changeStatus:', res.data);
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '</span>';
                        this.$toast.success(thong_bao);
                        this.loadDonHangDaHuy();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '</span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((error) => {
                    console.log('Error in changeStatus:', error.response);
                    var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + error.response.data.message + '</span>';
                    this.$toast.error(thong_bao);
                });
        },

    },
};
</script>

<style scoped>.table-container::-webkit-scrollbar {
    height: 0px; 
}
.table-container::-webkit-scrollbar {
    width: 0px;
}
.table-container::-webkit-scrollbar-track {
    background-color: #f1f1f1; 
    border-radius: 10px; 
}
.completed-orders-container::-webkit-scrollbar {
    width: 1px; 
    height: 1px; 
}
.btn-success {
    color: white;
    border: none;
    padding: 1px 5px;
    cursor: pointer;
    border-radius: 4px;
}
.completed-orders-container {
    position: relative;
    top: -30px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    overflow: auto; 
}
.table-container {
    width: 100%;
    max-height: 350px; 
    overflow-x: auto; 
    overflow-y: auto; 
}
.table {
    width: 100%; 
    min-width: 1000px; 
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
}
h2 {
    font-weight: 700;
    color: #333;
    font-size: 24px;
}
.table th,
.table td {
    vertical-align: middle;
    text-align: center;
    padding: 12px;
}
.table th {
    background-color: #f5f5f5;
    color: #333;
    font-weight: 600;
}
.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}
.table-header {
    background-color: #f5f5f5;
    color: #333;
}
.text-center {
    text-align: center;
}
.text-muted {
    color: #888 !important;
}
.status-delivered {
    color: #28a745;
    font-weight: bold;
}

</style>
