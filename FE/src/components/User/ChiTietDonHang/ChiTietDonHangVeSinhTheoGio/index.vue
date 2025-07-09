<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="card mb-4 shadow-sm" style="width: 100%; max-width: 600px;">
            <div class="card-body">
                <h5 class="card-title text-center mb-4">Đơn dịch vụ Theo Giờ</h5>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <tbody>
                            <tr>
                                <th>Mã Đơn dịch vụ</th>
                                <td>{{ chiTietDonHang.ma_don_hang }}</td>
                            </tr>
                            <tr>
                                <th>Trạng Thái Đơn dịch vụ</th>
                                <td>
                                    <span class="badge bg-success">Đang Thực Hiện</span>
                                </td>
                            </tr>
                            <tr>
                                <th >Tên Khách Hàng </th>
                                <td>{{ chiTietDonHang.ten_nguoi_nhan }}</td>
                            </tr>
                            <tr>
                                <th>Số Điện Thoại</th>
                                <td>{{ chiTietDonHang.so_dien_thoai_nguoi_nhan }}</td>
                            </tr>
                            <tr>
                                <th>Địa Chỉ Cung Cấp Dịch Vụ</th>
                                <td>{{ chiTietDonHang.dia_chi_nguoi_nhan }}</td>
                            </tr>
                            <tr>
                                <th>Ngày Bắt Đầu</th>
                                <td>{{ chiTietDonHang.ngay_bat_dau_lam }}</td>
                            </tr>
                            <tr>
                                <th>Ngày Kết Thúc</th>
                                <td>{{ chiTietDonHang.ngay_ket_thuc }}</td>
                            </tr>
                            <tr>
                                <th>Giờ Bắt Đầu </th>
                                <td>{{ chiTietDonHang.gio_bat_dau_lam_viec }}h</td>
                            </tr>
                            <tr>
                                <th>Giờ kết thúc </th>
                                <td>{{ chiTietDonHang.gio_ket_thuc_lam_viec }}h</td>
                            </tr>
                            <tr>
                                <th>Tên Nhân Viên Giúp Việc</th>
                                <td>
                                    <span v-if="!chiTietDonHang.nhanVien">Chưa có nhân viên nhận đơn</span>
                                    <span v-else>{{ chiTietDonHang.nhanVien.ten_nhan_vien }}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Kinh Nghiệm Nhân Viên</th>
                                <td>
                                    <span v-if="!chiTietDonHang.nhanVien">Chưa có nhân viên nhận đơn</span>
                                    <span v-else>{{ chiTietDonHang.nhanVien.kinh_nghiem_nhan_vien }}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Số điện thoại nhân viên</th>
                                <td>
                                    <span v-if="!chiTietDonHang.nhanVien">Chưa có nhân viên nhận đơn</span>
                                    <span v-else>{{ chiTietDonHang.nhanVien.so_dien_thoai_nhan_vien }}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Ghi Chú </th>
                                <td v-if="!chiTietDonHang.ghi_chu">Không có ghi chú</td>
                                <td>{{ chiTietDonHang.ghi_chu }}</td>
                            </tr>
                            <tr>
                                <th>Tổng Chi Phí</th>
                                <td>{{ formatVND(chiTietDonHang.so_tien_thanh_toan) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-4">
                    <router-link to="/">
                        <button type="button" class="btn btn-primary me-2 px-4">Quay về Trang Chủ</button>
                    </router-link>
                    <button v-on:click="huyDonHang()" type="submit" class="btn btn-danger px-4">Hủy Đơn dịch vụ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id_don_hang'],
    data() {
        return {
            chiTietDonHang: {},
        };
    },
    mounted() {
        this.loadChiTietDonHang(this.id_don_hang);
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadChiTietDonHang(id) {
            axios
                .get(`http://127.0.0.1:8000/api/nguoi-dung/chi-tiet-don-hang/getData/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.chiTietDonHang = res.data.data;
                        if (this.chiTietDonHang.nhanViens && this.chiTietDonHang.nhanViens.length > 0) {
                            this.chiTietDonHang.nhanVien = this.chiTietDonHang.nhanViens[0];
                        } else {
                            this.chiTietDonHang.nhanVien = null;
                        }
                        console.log("ChiTietDonHang" + JSON.stringify(this.chiTietDonHang));
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
        huyDonHang() {
            axios
                .post(`http://127.0.0.1:8000/api/nguoi-dung/huy-don-hang/delete/${this.id_don_hang}`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        //  this.$router.push('/');
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

.table {
    font-size: 1rem;
    color: #495057;
}

.table th {
    font-weight: bold;
    background-color: #f8f9fa;
    color: #495057;
    padding: 10px;
    text-align: left;
}

.table td {
    padding: 10px;
    color: #212529;
}
.table-striped tbody tr:nth-child(odd) {
    background-color: #f9fafb;
}
.card-title {
    font-weight: bold;
    font-size: 1.25rem;
    color: #000000;
}
.btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
}
</style>
