<template>
    <div class="row">
        <!-- Phần Đặt Lịch Gần Đây Theo Tỉnh Thành -->
        <div class="row">
            <div class="col-12">
                <div class="card" style="margin-top:-60px">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="input-group">
                                    <span class="input-group-text">Từ ngày</span>
                                    <input v-model="dl.tu_ngay" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="input-group">
                                    <span class="input-group-text">Đến ngày</span>
                                    <input v-model="dl.den_ngay" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <button v-on:click="sendBE()" class="btn btn-primary w-100">Thống Kê</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Phần Thống Kê -->
        <div class="col-12 col-lg-5 col-xl-4 d-flex">
            <div class="card w-100 radius-10">
                <div class="card-body">
                    <div class="card radius-10 border shadow-none">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng Số Khách Hàng hiện tại</p>
                                    <h4 class="my-1">{{ tongSoKhachHang.tong_khach_hang_toan_bo }}</h4>
                                    <p class="mb-0 font-13">+{{ tongSoKhachHang.ty_le_thay_doi }}% so với tháng trước</p>
                                </div>
                                <div class="widgets-icons-2 bg-gradient-cosmic text-white ms-auto"><i
                                        class="bx bxs-user-check"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="card radius-10 border shadow-none">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Đánh Giá Mới</p>
                                    <h4 class="my-1">{{ tongSoDanhGia.tong_danh_gia_toan_bo }}</h4>
                                    <p class="mb-0 font-13">+{{ tongSoDanhGia.ty_le_thay_doi }}% so với tháng trước</p>
                                </div>
                                <div class="widgets-icons-2 bg-gradient-ibiza text-white ms-auto"><i
                                        class="bx bxs-star-half"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="card radius-10 mb-0 border shadow-none">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="mb-0 text-secondary">Tổng Số Đặt Lịch hiện tại</p>
                                    <h4 class="my-1">{{ tongSoDatLich.tong_dat_lich_toan_bo }}</h4>
                                    <p class="mb-0 font-13">+{{ tongSoDatLich.ty_le_thay_doi }}% so với tháng trước</p>
                                </div>
                                <div class="widgets-icons-2 bg-gradient-kyoto text-dark ms-auto"><i
                                        class="bx bxs-calendar-check"></i></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        Thống Kê Thu Nhập Theo Tháng
                    </div>
                    <div class="card-body">
                        <Bar v-if="is_load" :data="chartData" />
                    </div>
                </div>
            </div>

    </div>

</template>
<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: {
        Bar
    },
    data() {
        return {
            tongSoKhachHang: {},
            tongSoDanhGia : {},
            tongSoDatLich : {},
            dl    : {},
            is_load: false,
            chartData   : null,
            chartData   : {
                labels: [],
                datasets: [ 
                    {
                        label: 'Thống Kê',
                        backgroundColor: [
                            "#C0392B", "#1ABC9C", "#F1C40F", "#E67E22", "#8E44AD", "#2980B9", "#27AE60"
                        ],
                        data: []
                    }
                 ]
            },
            chartOptions: {
                responsive: true
            }

        }
    },
    mounted() {
        this.getTongSoLuongKhachHang();
        this.getTongSoLuongDanhGia();
        this.getTongSoLuongDatLich();
        this.is_load = false;
    },
    methods: {
        getTongSoLuongKhachHang() {
            axios
            .get("http://127.0.0.1:8000/api/admin/thong-ke/so-luong-khach-hang", { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }})
                .then(res => {
                    this.tongSoKhachHang = res.data;

                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
        getTongSoLuongDanhGia() {
            axios
            .get("http://127.0.0.1:8000/api/admin/thong-ke/so-luong-danh-gia", { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }})
                .then(res => {
                    this.tongSoDanhGia = res.data;
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
        getTongSoLuongDatLich() {
            axios
            .get("http://127.0.0.1:8000/api/admin/thong-ke/so-luong-dat-lich", { headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }})
                .then(res => {
                    this.tongSoDatLich = res.data;
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
        sendBE() {
            this.is_load = false;
            
            
            axios
                .post("http://127.0.0.1:8000/api/admin/thong-ke/thong-ke-thu-nhap-he-thong", this.dl, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                    var array_ngay_thang = res.data.array_ngay_thang;
                    var array_tong_thu_nhap = res.data.array_tong_thu_nhap;
                    this.chartData.labels = array_ngay_thang;
                    this.chartData.datasets[0].data = array_tong_thu_nhap;
                    this.is_load = true;
                })
        },
    },
}
</script>
<style scoped></style>