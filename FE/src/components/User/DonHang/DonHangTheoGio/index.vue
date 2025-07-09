<template>
    <div class="d-flex justify-content-center my">
        <div class="col-lg-8">
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="text-center mb-4">Giúp Việc Theo Giờ </h4>
                    <div class="section mb-3">
                        <p class="section-title">
                            <i class="fas fa-map-marker-alt text-success"></i> Địa điểm làm việc
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <select v-model="donHang.id_dia_chi" class="form-select">
                                <template v-for="(value, index) in diaChi" :key="index">
                                    <option v-bind:value="value.id">{{ value.ten_nguoi_nhan }} - {{
                                        value.so_dien_thoai }} -{{ value.dia_chi }}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="section mb-3">
                        <p class="section-title">
                            <i class="fas fa-users text-success"></i> Số lượng nhân viên
                        </p>
                        <div class="employee-selection">
                            <button @click="donHang.so_luong_nv = 1"
                                :class="{ 'employee-btn': true, 'active': donHang.so_luong_nv === 1 }">
                                1 x Nhân viên
                            </button>
                            <button @click="donHang.so_luong_nv = 2"
                                :class="{ 'employee-btn': true, 'active': donHang.so_luong_nv === 2 }">
                                2 x Nhân viên
                            </button>
                            <button @click="donHang.so_luong_nv = 3"
                                :class="{ 'employee-btn': true, 'active': donHang.so_luong_nv === 3 }">
                                3 x Nhân viên
                            </button>
                        </div>
                    </div>
                    <div class="section mb-3">
                        <p class="section-title">
                            <i class="fas fa-clock text-success"></i> Thời Gian Dọn Dẹp
                        </p>
                        <div class="employee-selection">
                            <button @click="donHang.so_gio_phuc_vu = 2"
                                :class="{ 'employee-btn': true, 'active': donHang.so_gio_phuc_vu === 2 }">
                                2 Giờ
                                <p>Tối đa 60m2 Tổng Sàn</p>
                            </button>
                            <button @click="donHang.so_gio_phuc_vu = 2.5"
                                :class="{ 'employee-btn': true, 'active': donHang.so_gio_phuc_vu === 2.5 }">
                                2.5 Giờ
                                <p>Tối đa 90m2 Tổng Sàn</p>
                            </button>
                            <button @click="donHang.so_gio_phuc_vu = 3"
                                :class="{ 'employee-btn': true, 'active': donHang.so_gio_phuc_vu === 3 }">
                                2.5 Giờ
                                <p>Tối đa 90m2 Tổng Sàn</p>
                            </button>
                            <button @click="donHang.so_gio_phuc_vu = 4"
                                :class="{ 'employee-btn': true, 'active': donHang.so_gio_phuc_vu === 4 }">
                                4 Giờ
                                <p>Tối đa 100m2 Tổng Sàn</p>
                            </button>
                        </div>
                        <div class="date-time-section">
                            <div class="date-picker">
                                <label for="ngayBatDau" class="section-title"><i
                                        class="fas fa-calendar-alt text-success"></i> Ngày Bắt Đầu
                                    Làm</label>
                                <input v-model="donHang.ngay_bat_dau_lam" id="ngayBatDau" type="date"
                                    class="form-control styled-input" />
                            </div>
                            <div class="time-picker">
                                <label for="gioBatDau" class="section-title">
                                    <i class="fas fa-clock text-success"></i> Giờ Bắt Đầu Làm
                                </label>
                                <select v-model="donHang.gio_bat_dau_lam_viec" id="gioBatDau"
                                    class="form-control styled-input">
                                    <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="section mb-3">
                        <p class="section-title">
                            <i class="fas fa-ellipsis-h text-success"></i> Chọn Phương thức thanh toán
                        </p>
                        <div class="employee-selection">
                            <button @click="donHang.phuong_thuc_thanh_toan = 1"
                                :class="{ 'employee-btn': true, 'active': donHang.phuong_thuc_thanh_toan === 1 }">
                                Thanh toán bằng tiền mặt
                            </button>
                            <button @click="donHang.phuong_thuc_thanh_toan = 0"
                                :class="{ 'employee-btn': true, 'active': donHang.phuong_thuc_thanh_toan === 0 }">
                                Thanh toán qua ngân hàng
                            </button>
                            <button class="employee-btn"
                            @click="donHang.phuong_thuc_thanh_toan = 2"
                                :class="{ 'employee-btn': true, 'active': donHang.phuong_thuc_thanh_toan === 2 }">  
                                Thanh Toán Qua Ví
                            </button>
                        </div>
                    </div>
                    <div class="section mb3">
                        <div class="note-section">
                            <div class="note-header">
                                <i class="fas fa-sticky-note text-success"></i> GHI CHÚ
                            </div>
                            <textarea v-model="donHang.ghi_chu" class="note-input"
                                placeholder="Các lưu ý của quý khách dành cho nhân viên giúp việc"></textarea>
                        </div>
                    </div>
                    <div class="section mb3">
                        <p class="section-title">
                            <i class="fas fa-tags text-success"></i> Mã Giảm Giá
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <input v-model="code" type="text" class="form-control"
                                placeholder="Nhập Mã Giảm Giá (Nếu Có)" />
                            <button type="button" class="btn btn-outline-success-1 small-button custom-btn"
                                v-on:click="apDungCode()">Mã Giảm</button>
                        </div>
                        <div
                            class="bottom-bar d-flex justify-content-between align-items-center p-3 mt-4 shadow-sm rounded">
                            <!-- Phần thông tin bên trái -->
                            <div class="left-section d-flex align-items-center gap-4">
                                <!-- Thông tin nhân viên -->
                                <div class="info d-flex flex-column align-items-center">
                                    <i class="fa-solid fa-user fa-lg text-primary"></i>
                                    <p class="mb-0">
                                        <b>{{ donHang.so_luong_nv }}</b> Nhân Viên x <b>{{ donHang.so_gio_phuc_vu }}</b>
                                        giờ
                                    </p>
                                </div>

                                <!-- Tổng tiền hóa đơn -->
                                <div class="pricing d-flex flex-column align-items-center">
                                    <i class="fa-solid fa-money-bill fa-lg text-success"></i>
                                    <p class="mb-0 text-muted">Tổng Tiền Hóa Đơn:</p>
                                    <span class="text-danger">{{ formatVND(donHang.tong_tien || 0) }}</span>
                                </div>

                                <!-- Số tiền giảm -->
                                <div class="discount d-flex flex-column align-items-center">
                                    <i class="fa-solid fa-money-bill-trend-up fa-lg text-warning"></i>
                                    <p class="mb-0 text-muted">Số Tiền Giảm:</p>
                                    <span class="text-danger">{{ formatVND(tien_giam || 0) }}</span>
                                </div>
                            </div>

                            <!-- Phần tổng tiền thanh toán bên phải -->
                            <div class="right-section d-flex align-items-center gap-4">
                                <!-- Tổng tiền thanh toán -->
                                <div class="total d-flex flex-column align-items-center">
                                    <i class="fa-solid fa-money-bill-transfer fa-lg text-info"></i>
                                    <p class="mb-0 text-muted">Tổng Tiền:</p>
                                    <span class="text-danger">{{ formatVND(donHang.so_tien_thanh_toan || 0) }}</span>
                                </div>

                                <!-- Nút thanh toán -->
                                <button type="button" class="btn btn-success px-4 py-2 d-flex align-items-center " 
                                    v-on:click="createDonHang()">
                                    <i class="fa-solid "></i> Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id_dich_vu', 'slug_dich_vu'],
    data() {
        return {
            id_dich_vu: this.$route.params.id_dich_vu,
            diaChi: [],
            donHang: {},
            tong_tien: 0,
            tien_giam: 0,
            soTienMacDinh: 0,
            code: '',
            timeOptions: []
        }

    },
    mounted() {
        this.loadDiaChi();
        this.laySoTien();
        this.timeOptions = this.generateTimeOptions();
    },
    watch: {
        'donHang.so_gio_phuc_vu': function () {
            this.tinhTongTien();
        },
        'donHang.so_luong_nv': function () {
            this.tinhTongTien();
        }
    },
    methods: {
        generateTimeOptions() {
            const options = [];
            let hour = 8; // Bắt đầu từ 8h
            let minute = 0;

            while (hour < 17 || (hour === 17 && minute === 0)) {
                const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
                options.push(time);

                minute += 30;
                if (minute === 60) {
                    minute = 0;
                    hour += 1;
                }
            }
            return options;
        },
        loadDiaChi() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/dia-chi/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.diaChi = res.data.data;
                    // console.log('123', JSON.stringify(this.diaChi));

                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu địa chỉ:", error);
                });
        },
        apDungCode() {
            var payload = {
                'code': this.code
            };
            axios.post("http://127.0.0.1:8000/api/ma-giam-gia/kiem-tra", payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        var coupon = res.data.coupon;

                        // Tính tổng tiền trước khi áp dụng giảm giá
                        var tongTien = this.tong_tien;

                        // Áp dụng mã giảm giá nếu tổng tiền đạt điều kiện tối thiểu
                        if (tongTien >= coupon.dk_toi_thieu_don_hang) {
                            if (coupon.loai_giam_gia == 1) {
                                // Giảm trực tiếp số tiền
                                this.tien_giam = coupon.so_giam_gia;
                            } else {
                                // Giảm theo phần trăm, với mức giảm tối đa là `coupon.so_tien_toi_da`
                                this.tien_giam = Math.min(coupon.so_giam_gia * tongTien / 100, coupon.so_tien_toi_da);
                            }

                            // Tính tổng tiền sau khi giảm
                            this.donHang.so_tien_thanh_toan = tongTien - this.tien_giam;

                            // Thông báo thành công
                            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + 'Đơn dịch vụ đã cập nhật giảm giá' + '<span>';
                            this.$toast.success(thong_bao);
                        } else {
                            // Không đủ điều kiện áp dụng mã giảm giá
                            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + 'Đơn dịch vụ chưa đủ điều kiện' + '<span>';
                            this.$toast.warning(thong_bao);
                            this.tien_giam = 0;
                            this.donHang.so_tien_thanh_toan = tongTien; // Tổng tiền không thay đổi
                        }
                    } else {
                        // Mã giảm giá không hợp lệ
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.tien_giam = 0;
                        this.donHang.so_tien_thanh_toan = this.tong_tien; // Tổng tiền không thay đổi
                    }
                })
                .catch((error) => {
                    console.error('Error applying coupon:', error);
                });
        },
        tinhTongTien() {
            // Tính toán tổng tiền
            this.tong_tien = this.soTienMacDinh * this.donHang.so_gio_phuc_vu * this.donHang.so_luong_nv;
            this.donHang.tong_tien = this.tong_tien,
                // Cập nhật tổng tiền thanh toán sau khi giảm (nếu có)
                this.donHang.so_tien_thanh_toan = this.tong_tien - this.tien_giam;
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        createDonHang() {
            const idDichVu = this.$route.params.id;
            axios.post(`http://127.0.0.1:8000/api/nguoi-dung/dat-don-hang/create/${idDichVu}`, this.donHang, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        const donHang = res.data.donHang; // Lấy thông tin Đơn dịch vụ từ phản hồi
                        if (this.donHang.phuong_thuc_thanh_toan === 0) {
                            // Nếu thanh toán online, chuyển hướng đến trang thanh toán
                            this.$router.push({ name: 'ThanhToan', params: { maDonHang: donHang.ma_don_hang } });
                        } else {
                            const idDonHang = donHang.id;
                            this.$router.push({
                                path: `/nguoi-dung/chitietdonhangtheogio/${idDonHang}`,
                            });
                        }
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
        laySoTien() {
            const idDichVu = this.$route.params.id;
            axios
                .get(`http://127.0.0.1:8000/api/nguoi-dung/so-tien-mac-dinh/${idDichVu}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.soTienMacDinh = res.data.so_tien;
                    console.log('Số tiền mặc định:', this.soTienMacDinh);
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        console.error("Lỗi khi lấy dữ liệu số tiền:", error.response.data.error);
                    } else {
                        console.error("Lỗi khi lấy dữ liệu số tiền:", error);
                    }
                });
        },

    },
}
</script>

<style scoped>

.custom-btn {
        padding: 2px 6px; 
        font-size: 12px; 
    }
.bottom-bar {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    gap: 20px;
    margin-top: 20px; 
}
.left-section {
    display: flex;
    gap: 20px;
    align-items: center;
    flex: 1.5; 
    justify-content: space-between;
}
.right-section {
    display: flex;
    gap: 20px;
    align-items: center;
    flex: 1;  
    justify-content: space-between;
}
.info, .pricing, .discount, .total {
    text-align: center;
    flex: 1;
}

.info i, .pricing i, .discount i, .total i {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.info p, .pricing p, .discount p, .total p {
    font-size: 0.9rem;
    color: #495057;
    margin: 5px 0 0;
}

.info span, .pricing span, .discount span, .total span {
    font-weight: bold;
    font-size: 1.1rem;
    color: #dc3545;
}
/* Đáp ứng (Responsive) */
@media (max-width: 768px) {
    .bottom-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .right-section {
        width: 100%;
        justify-content: space-between;
    }

    .btn-success {
        width: 100%;
        justify-content: center;
    }
}

.date-time-section {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 15px;
}
.date-picker,
.time-picker {
    flex: 1;
}

.note-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
    font-family: Arial, sans-serif;
}

.note-header {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
}

.note-input {
    width: 100%;
    height: 80px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    color: #555;
    resize: vertical;
    /* Cho phép thay đổi chiều cao */
    background-color: #f9f9f9;
    outline: none;
}

.note-input::placeholder {
    color: #aaa;
}

.property-type-options {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 10px;
}

.property-type-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100px;
    height: 100px;
    border: 2px solid #e9e9e9;
    border-radius: 50%;
    color: #555;
    background-color: #fff;
    /* Nền trắng cho nút */
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    outline: none;
    border: none;
    /* Xóa đường viền mặc định của button */
}

.property-type-item i {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.property-type-item p {
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
}

.property-type-item  {
    background-color: #e0f7e9;
    color: #28a745;
    border: 2px solid #28a745;
}

.property-type-item:hover {
    background-color: #f1f1f1;
}

.employee-selection {
    display: flex;
    gap: 10px;
}

.employee-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: #555;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.employee-btn.active {
    background-color: #06D7A0;
    color: white;
}

.employee-btn:hover {
    background-color: #d9d9d9;
}

.card {
    border: 1px solid #e9ecef;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-weight: bold;
    margin-bottom: 10px;
}

.badge-light {
    background-color: #e9ecef;
    color: #495057;
}

button.btn-success {
    font-weight: bold;
    color: #fff;
}

.bottom-bar {
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.section-title {
    text-align: left;
}
</style>
