<template>
    <div class="container mt">
        <h2 class="text-center mb-4">Thanh Toán</h2>
        <div class="alert custom-alert text-center" role="alert">
            Để nạp tiền vào tài khoản, vui lòng quét mã QR hoặc chuyển khoản với các thông tin bên dưới.
        </div>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="left-panel">
                <div class="qr-wrapper mb-4 text-center">
                    <img :src="qrCodeUrl" class="qr-code">
                </div>
                <div class="text-center">
                    <button class="btn btn-primary mx-2 shadow-sm">
                        <i class="fas fa-download"></i> Tải về
                    </button>
                    <button class="btn btn-secondary mx-2 shadow-sm">
                        <i class="fas fa-share"></i> Chia sẻ
                    </button>
                </div>
            </div>
            <div class="card right-panel-card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Thông tin chi tiết</h5>
                    <p><strong>Họ và tên:</strong> {{ diaChi.ten_nguoi_nhan }}</p>
                    <p><strong>Địa chỉ:</strong> {{ diaChi.dia_chi }}</p>
                    <p><strong>Số điện thoại:</strong> {{ diaChi.so_dien_thoai }}</p>
                    <p><strong>Giờ phục vụ:</strong> {{ donHang.so_gio_phuc_vu }}h</p>
                    <p><strong>Giờ bắt đầu:</strong> {{ formattedGioBatDauLamViec }}h</p>
                    <p><strong>Giờ kết thúc:</strong> {{ gioKetThucLamViec }}h</p>
                    <p><strong>Số tiền cần thanh toán:</strong> {{ formatVND(donHang.so_tien_thanh_toan) }}</p>
                </div>
            </div>
        </div>
        <div v-if="soTienThieu > 0" class="card right-panel-card shadow-sm">
            <div class="card-body">
                <h5 class="card-title">Thông tin thanh toán còn thiếu</h5>
                <p><strong>Đã thanh toán:</strong> {{ formatVND(tongTienDaThanhToan) }}</p>
                <p><strong>Số tiền còn thiếu:</strong> {{ formatVND(soTienThieu) }}</p>
                <p>Vui lòng tiếp tục thanh toán số tiền còn thiếu để hoàn tất giao dịch.</p>
            </div>
        </div>
        <div class="card bank-info-card shadow-sm mt-4">
            <div class="card-body">
                <div class="info-item mb-4">
                    <strong>Ngân hàng:</strong>
                    <span class="text-muted">MBBANK - Chi Nhánh Đà Nẵng</span>
                </div>
                <div class="info-item d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <strong>Số tài khoản:</strong>
                        <span class="text-muted">0369396097</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm shadow-sm">
                        <i class="fas fa-copy"></i> Sao chép
                    </button>
                </div>
                <div class="info-item mb-4">
                    <strong>Người thụ hưởng:</strong>
                    <span class="text-muted">Nguyen Thanh Tung</span>
                </div>
            </div>
            <div class="card-footer">
                <button v-on:click="xacNhanThanhToan()" class="btn btn-primary">Xác Nhận Thanh Toán</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ThanhToan',
    data() {
        return {
            donHang: {},
            diaChi: {},
            isLoading: false,
            tongTienDaThanhToan: 0,
            soTienThieu: 0,
        };
    },
    mounted() {
        this.getDonHangTheoMaDonHang();
    },
    computed: {
        gioKetThucLamViec() {
            const gioBatDau = this.donHang.gio_bat_dau_lam_viec;
            const soGioPhucVu = this.donHang.so_gio_phuc_vu;

            if (gioBatDau && soGioPhucVu) {
                const [hours, minutes] = gioBatDau.split(':').map(Number);
                const startTime = new Date();
                startTime.setHours(hours);
                startTime.setMinutes(minutes);
                startTime.setSeconds(0);
                const endTime = new Date(startTime.getTime() + soGioPhucVu * 60 * 60 * 1000);
                const endHours = String(endTime.getHours()).padStart(2, '0');
                const endMinutes = String(endTime.getMinutes()).padStart(2, '0');
                return `${endHours}:${endMinutes}`;
            } else {
                return '';
            }
        },
        formattedGioBatDauLamViec() {
            const gioBatDau = this.donHang.gio_bat_dau_lam_viec;

            if (gioBatDau) {
                const [hours, minutes] = gioBatDau.split(':').map(Number);
                const startTime = new Date();
                startTime.setHours(hours);
                startTime.setMinutes(minutes);
                startTime.setSeconds(0);

                const formattedHours = String(startTime.getHours()).padStart(2, '0');
                const formattedMinutes = String(startTime.getMinutes()).padStart(2, '0');

                return `${formattedHours}:${formattedMinutes}`;
            } else {
                return '';
            }
        },
        qrCodeUrl() {
            const amount = this.donHang.so_tien_thanh_toan || 0;
            const addInfo = encodeURIComponent( this.donHang.ma_don_hang);
            return `https://img.vietqr.io/image/MB-0369396097-qr_only.png?amount=${amount}&addInfo=${addInfo}`;
        },
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
        getDonHangTheoMaDonHang() {
            const maDonHang = this.$route.params.maDonHang;
            if (maDonHang) {
                axios.get(`http://127.0.0.1:8000/api/nguoi-dung/don-hang/${maDonHang}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                    .then((res) => {
                        if (res.data.status) {
                            this.donHang = res.data.donHang;
                            console.log("Đơn dịch vụ " + JSON.stringify(this.donHang));
                            this.getDiaChi(this.donHang.id_dia_chi);
                        } else {
                            this.$toast.error('Không tìm thấy Đơn dịch vụ.');
                            this.$router.push({ name: 'TrangChu' });
                        }
                    })
                    .catch((error) => {
                        console.error('Lỗi khi lấy thông tin Đơn dịch vụ:', error);
                        this.$toast.error('Lỗi khi lấy thông tin Đơn dịch vụ.');
                        this.$router.push({ name: 'TrangChu' });
                    });
            } else {
                this.$toast.error('Không có thông tin Đơn dịch vụ.');
                this.$router.push({ name: 'TrangChu' });
            }
        },
        getDiaChi(idDiaChi) {
            axios.get(`http://127.0.0.1:8000/api/nguoi-dung/dia-chi-thanh-toan/data/${idDiaChi}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                }
            })
                .then((res) => {
                    if (res.data.data) {
                        this.diaChi = res.data.data;
                    } else {
                        this.$toast.error('Không tìm thấy địa chỉ.');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy thông tin địa chỉ:', error);
                    this.$toast.error('Lỗi khi lấy thông tin địa chỉ.');
                });
        },
        xacNhanThanhToan() {
            this.isLoading = true; // Bắt đầu trạng thái xử lý
            this.$toast.info("Hệ thống đang xử lý giao dịch, hãy đợi trong ít phút.");
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/giao-dich-thanh-toan", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                    if (res.data.status && res.data.payment_sufficient) {
                        this.$toast.success(thong_bao);
                        const idDonHang = this.donHang.id;
                        if (this.donHang.id_dich_vu === 1) {
                            this.$router.push({
                                path: `/nguoi-dung/chitietdonhangtheogio/${idDonHang}`,
                            });
                        } else if (this.donHang.id_dich_vu === 2) {
                            this.$router.push({
                                path: `/nguoi-dung/chitietdonhangdinhki/${idDonHang}`,
                            });
                        } else if (this.donHang.id_dich_vu === 3) {
                            this.$router.push({
                                path: `/nguoi-dung/chitietdonhangtongvesinh/${idDonHang}`,
                            });
                        }
                    } else {
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
                .catch((error) => {
                    var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + error.response.data.message + '<span>';
                    this.$toast.error(thong_bao);
                })
                .finally(() => {
                    this.isLoading = false; // Kết thúc trạng thái xử lý
                });
        },


    },
};
</script>
<style scoped>

.right-panel-card {
    border-radius: 12px;
    background: linear-gradient(135deg, #f9f9f9, #ffffff);
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.2s;
}

.right-panel-card:hover {
    transform: scale(1.02);
}

.right-panel-card .card-title {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 15px;
}

.right-panel-card p {
    font-size: 1rem;
    margin: 5px 0;
    color: #34495e;
}

.right-panel-card strong {
    color: #2c3e50;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.d-flex {
    display: flex;
    gap: 30px;
    /* Khoảng cách giữa các cột */
}

.flex-wrap {
    flex-wrap: wrap;
    /* Đảm bảo các phần tử tự xuống dòng trên màn hình nhỏ */
}

.left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Căn giữa nội dung trong cột */
    text-align: center;
}

.right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
}

.qr-wrapper img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin-bottom: 15px;
}

.btn {
    margin-top: 10px;
}

.card.bank-info-card {
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-alert {
    background-color: #fff3cd;
    /* Màu nền vàng nhạt */
    color: #856404;
    /* Màu chữ nâu đậm */
    border-color: #ffeeba;
    /* Viền màu vàng */
    font-weight: 500;
    font-size: 1rem;
    border-radius: 8px;
    padding: 15px;
}

.container {
    max-width: 800px;
    background-color: #f0f4f8;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h2 {
    font-weight: bold;
    color: #333;
}

.qr-wrapper {
    display: inline-block;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.qr-code {
    width: 220px;
    height: 220px;
}

.bank-info-card {
    border: none;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 25px;
    transition: transform 0.2s;
}

.bank-info-card:hover {
    transform: scale(1.01);
}

.info-item {
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.info-item strong {
    color: #333;
}

.info-item .text-muted {
    font-size: 0.95rem;
    color: #6c757d;
    margin-left: 8px;
}

.btn-outline-primary,
.btn-primary,
.btn-secondary {
    font-size: 0.9rem;
    border-radius: 8px;
}

.btn-primary,
.btn-secondary {
    padding: 8px 16px;
}

.shadow-sm {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-outline-primary i,
.btn-primary i,
.btn-secondary i {
    margin-right: 5px;
}
</style>