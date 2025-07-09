<template>
    <div class="completed-orders-container " style="margin-top: -30px;">
        <h2 class="text-center mb-4">Lịch Sử Đơn dịch vụ Mới Đặt</h2>
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
                    <th>Hủy Đơn dịch vụ</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(value, index) in DonHangMoiDat" :key="index">
                    <template v-if="value.tinh_trang_don_hang === 1">
                        <tr>
                            <td>{{ value.ma_don_hang }}</td>
                            <td>{{ value.ngay_bat_dau_lam }}</td>
                            <td>{{ value.ngay_ket_thuc }}</td>
                            <td>{{ formatVND(value.so_tien_thanh_toan) }}</td>
                            <td>
                                <td >
                                    <span class="status-delivered">Chờ Xác Nhận</span>
                                </td>
                            </td>
                            <td>
                                <button class="btn text-nowrap mb-2" style="background-color: #28A745; color: white;">
                                    Xem Thêm
                                </button>
                            </td>
                            <td>
                                <button v-on:click="huyDonHang(value.id)" class="btn text-nowrap mb-2" style="background-color: red; color: white;">
                                    Hủy Đơn dịch vụ
                                </button>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        * Chú thích: Đơn dịch vụ Mới Đặt,Khách Hàng Bấm vào Nút Đã Hủy sẽ hủy đơn.
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
            DonHangMoiDat: [],
        };
    },
    mounted() {
        this.loadDonHangMoiDat();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadDonHangMoiDat() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/lich-su-don-hang-moi-dat/getDataLSDDToND", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.DonHangMoiDat = res.data.data;
                        console.log("Don Hang moi dat", JSON.stringify(this.DonHangMoiDat));
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
        huyDonHang(id) {
            axios
                .post(`http://127.0.0.1:8000/api/nguoi-dung/huy-don-hang/delete/`+id ,{}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadDonHangMoiDat();
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

    },
};
</script>
<style scoped>
.table-container::-webkit-scrollbar {
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
