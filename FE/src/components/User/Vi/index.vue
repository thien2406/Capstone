<template>
    <!-- Modal -->
    <div class="modal fade" id="napTien" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="staticBackdropLabel">Xác nhận nạp tiền</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="hasBankAccount">
                    <div class="qr-wrapper text-center mb-4">
                        <img :src="qrCodeUrl" class="qr-code" alt="QR Code">
                    </div>
                    <p class="modal-text text-center">
                        Vui lòng quét mã QR bên trên và hoàn tất thanh toán.<br>
                        Sau khi chuyển khoản, nhấn "Xác nhận nạp tiền".
                    </p>
                </div>
                <div class="modal-body" v-else>
                    <p class="modal-text text-center text-danger">
                        Bạn phải cập nhật số tài khoản cá nhân trước khi sử dụng ví để nạp tiền.
                    </p>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Thoát</button>
                    <button v-if="hasBankAccount" v-on:click="xacNhanThanhToan()" type="button"
                        class="btn btn-primary">Xác nhận nạp tiền</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="capNhat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="capNhatLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="capNhatLabel">Cập Nhật Số Tài Khoản Ngân Hàng</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        
                        <div class="mb-3">
                            <label for="soTaiKhoan" class="form-label">Số Tài Khoản</label>
                            <input v-model="tkNguoiDung.stk" type="text" id="soTaiKhoan" class="form-control"
                                placeholder="Nhập số tài khoản" required>
                        </div>
                        <div class="mb-3">
                            <label for="tenNganHang" class="form-label">Ngân Hàng</label>
                            <select v-model="tkNguoiDung.ten_ngan_hang" id="tenNganHang" class="form-select" required>
                                <option value="">-- Chọn Ngân Hàng --</option>
                                <option value="Agribank">Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam
                                    (Agribank)</option>
                                <option value="Vietcombank">Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam
                                    (Vietcombank)</option>
                                <option value="BIDV">Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)</option>
                                <option value="VietinBank">Ngân hàng Kông thương Việt Nam (VietinBank)</option>
                                <option value="Techcombank">Ngân hàng Thương mại Cổ phần Kỹ Thương (Techcombank)
                                </option>
                                <option value="MBBank">Ngân hàng Quân đội (MB Bank)</option>
                                <option value="Sacombank">Ngân hàng Sài Gòn Thương Tín (Sacombank)</option>
                                <option value="ACB">Ngân hàng Thừ Đình (ACB)</option>
                                <option value="SCB">Ngân hàng Thương mại Cổ phần Sài Gòn (SCB)</option>
                                <option value="HDBank">Ngân hàng TMCP Phát Triển TP.HCM (HDBank)</option>
                                <option value="SHB">Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)</option>
                                <option value="BaoVietBank">Ngân hàng TMCP Bảo Việt (BaoViet Bank)</option>
                                <option value="NamABank">Ngân hàng TMCP Nam Á (NamABank)</option>
                                <option value="DongABank">Ngân hàng TMCP Đông Á (DongABank)</option>
                                <option value="TPBank">Ngân hàng TMCP Tiên Phong (TPBank)</option>
                                <option value="VietABank">Ngân hàng TMCP Việt Á (VietABank)</option>
                                <option value="PVcomBank">Ngân hàng TMCP Đại Chúng Việt Nam (PVcomBank)</option>
                                <option value="NCB">Ngân hàng TMCP Quốc Dân (NCB)</option>
                                <option value="PGBank">Ngân hàng TMCP Xăng Dầu Petrolimex (PG Bank)</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Thoát</button>
                    <button @click="capNhatSTKNguoiDung()" type="button" class="btn btn-primary">Lưu Thông Tin</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container wallet-container">
        <div class="balance-section d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 class="text-muted"><i class="fas fa-wallet"></i> Số Dư</h4>
                <h3 class="balance-amount text-success">{{ formatVND(dataVi.so_du) }}</h3>
                <h3 class="balance-amount text-success"></h3>
            </div>
            <button type="button" class="btn btn-primary btn-lg shadow-sm" data-bs-toggle="modal"
                data-bs-target="#napTien">
                <i class="fas fa-plus-circle"></i> Nạp tiền
            </button>
        </div>
        <button type="button"
            class="btn btn-outline-success w-100 shadow-sm d-flex align-items-center justify-content-center gap-2"
            data-bs-toggle="modal" data-bs-target="#capNhat">
            <i class="fas fa-sync-alt"></i>
            <span>Cập Nhật Số Tài Khoản Ngân Hàng</span>
        </button>
        <div class="transaction-section mb-4 mt-4">
            <div class="d-flex justify-content-start align-items-center mb-3" style="gap: 20px;">
                <h4 class="text-muted"><i class="fas fa-history"></i> Lịch Sử Giao Dịch</h4>
                <select v-model="filterType" class="form-select form-select-sm" @change="applyFilter()">
                    <option value="">Tất cả giao dịch</option>
                    <option value="nạp tiền">Nạp tiền</option>
                    <option value="rút tiền">Rút tiền</option>
                </select>
            </div>
            <ul v-if="filteredTransactions.length > 0" class="transaction-list">
                <li class="transaction-item" v-for="(item, index) in filteredTransactions" :key="index">
                    <span>{{ formatTransaction(item).date }} - {{ formatTransaction(item).type }}</span>
                    <span :class="formatTransaction(item).amountClass">
                        {{ formatTransaction(item).amount }}
                    </span>
                </li>
            </ul>
            <p v-else class="text-center text-muted">Không có giao dịch nào được tìm thấy.</p>
        </div>
        <div class="options-section mt-4">
            <button type="button" class="btn btn-outline-success btn-block shadow-sm" data-bs-toggle="modal"
                data-bs-target="#rutTien">
                <i class="fas fa-wallet"></i> Rút tiền
            </button>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="rutTien" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-lg rounded-3">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="staticBackdropLabel">Yêu cầu rút tiền</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="hasBankAccount">
                        <div class="form-group mb-4">
                            <label for="soTienRut" class="form-label fw-bold">Nhập số tiền bạn muốn rút:</label>
                            <input id="soTienRut" class="form-control form-control-lg border-success" type="text"
                                placeholder="Nhập số tiền (VND)" :value="formatVNDd(soTienRut.so_tien_rut)"
                                @input="updateValue($event)">
                        </div>
                        <div class="alert alert-warning" role="alert">
                            <i class="bi bi-info-circle"></i>
                            Lưu ý: Số tiền rút phải nhỏ hơn số dư hiện có. Nếu gặp vấn đề, vui lòng liên hệ hỗ trợ.
                        </div>
                    </div>
                    <div class="modal-body" v-else>
                        <p class="modal-text text-center text-danger">
                            Bạn phải cập nhật số tài khoản cá nhân trước khi sử dụng ví để rút tiền.
                        </p>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle"></i> Thoát
                        </button>
                        <button v-if="hasBankAccount" v-on:click="guiYeuCau()" type="button" class="btn btn-success"
                            data-bs-dismiss="modal">
                            <i class="bi bi-check-circle"></i> Xác nhận rút tiền
                        </button>
                    </div>
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
            dataVi: {},
            isLoading: false,
            soTienRut: {},
            tkNguoiDung: {},
            transactions: [],  // Mảng lưu lịch sử giao dịch ở FE
            filterType: '',  // Loại giao dịch cần lọc (nạp tiền, rút tiền, thanh toán)
            hasBankAccount: false, // Trạng thái kiểm tra tài khoản ngân hàng\
            lSGiaoDich: [],
        };
    },

    mounted() {
        this.getVi();
        this.checkTKNguoiDung();
        this.loadTransactionsFromLocalStorage();
        this.loadlSGiaoDich();
    },
    computed: {
        qrCodeUrl() {
            const addInfo = encodeURIComponent(this.dataVi.so_dien_thoai+ ' , ' +this.dataVi.ho_va_ten );
            return `https://img.vietqr.io/image/MB-0369396097-qr_only.png?addInfo=${addInfo}`;
        },
        filteredTransactions() {
            if (!this.filterType) {
                // Trả về tất cả giao dịch nhưng chỉ lọc các giao dịch nạp/rút
                return this.lSGiaoDich.filter(item => item.type === 1 || item.type === 2);
            }
            // Ánh xạ filterType với type trong bảng
            const typeMapping = {
                'nạp tiền': 1, // Credit
                'rút tiền': 2  // Debit
            };
            const selectedType = typeMapping[this.filterType];
            // Lọc lịch sử giao dịch theo type
            return this.lSGiaoDich.filter(item => item.type === selectedType);
        },
    },
    methods: {
        formatTransaction(item) {
            const typeMapping = {
                1: 'nạp tiền', // Credit
                2: 'rút tiền'  // Debit
            };
            const isCredit = item.type === 1; // Kiểm tra nếu là nạp tiền
            const amount = isCredit ? item.creditAmount : item.debitAmount;
            const amountClass = isCredit ? 'text-success' : 'text-danger'; // Credit: xanh, Debit: đỏ
            const formattedAmount = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(amount);
            return {
                date: new Date(item.created_at).toLocaleDateString('vi-VN'),
                type: typeMapping[item.type],
                amount: formattedAmount,
                amountClass
            };
        },
        applyFilter() {
            console.log("Loại giao dịch được chọn:", this.filterType);
            console.log("Kết quả sau khi lọc:", this.filteredTransactions);
        },
        loadTransactionsFromLocalStorage() {
            const stored = localStorage.getItem('transactions');
            if (stored) {
                try {
                    this.transactions = JSON.parse(stored);
                } catch (e) {
                    console.error("Dữ liệu trong LocalStorage bị lỗi:", e);
                    this.transactions = []; // Reset nếu dữ liệu không hợp lệ
                }
            }
        },
        saveTransactionsToLocalStorage() {
            localStorage.setItem('transactions', JSON.stringify(this.transactions));
        },
        // Khi người dùng nạp tiền thành công
        addTransaction(type, amount) {
            const newTransaction = {
                date: new Date().toLocaleDateString('vi-VN'),
                type: type,
                amount: amount
            };
            this.transactions.unshift(newTransaction);
            this.saveTransactionsToLocalStorage();
        },
        updateValue(event) {
            const rawValue = event.target.value.replace(/\D/g, '');
            this.rawInput = rawValue; // Giữ giá trị gốc
            this.soTienRut.so_tien_rut = rawValue || '0';
        },
        formatValue() {
            this.rawInput = this.formatVNDd(this.soTienRut.so_tien_rut); // Định dạng sau khi rời khỏi ô
        },
        formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        getVi() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/vi-dien-tu/getData", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.data) {
                        this.dataVi = res.data.data;
                        console.log("vi data: " + JSON.stringify(this.dataVi));

                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    });
                })
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
        xacNhanThanhToan() {
            this.isLoading = true;
            this.$toast.info("Hệ thống đang xử lý giao dịch, hãy đợi trong ít phút.");
            const modal = bootstrap.Modal.getInstance(document.getElementById("napTien"));
            modal.hide();
            axios
                .post(
                    "http://127.0.0.1:8000/api/nguoi-dung/vi-dien-tu/napTien",
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nguoi_dung"),
                        },
                    }
                )
                .then((res) => {
                    var thong_bao =
                        "<b>Thông báo</b><span style='margin-top: 5px'>" +
                        res.data.message +
                        "<span>";
                    if (res.data.status) {
                        this.$toast.success(thong_bao);
                        this.getVi();
                    } else {
                        this.$toast.error(thong_bao);
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
        guiYeuCau() {
            if (!this.soTienRut.so_tien_rut || this.soTienRut.so_tien_rut < 10000) {
                this.$toast.error("Số tiền rút phải lớn hơn hoặc bằng 10,000 VNĐ!");
                return;
            }
            axios
                .post(
                    "http://127.0.0.1:8000/api/nguoi-dung/vi-dien-tu/guiYeuCauRutTien", this.soTienRut,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nguoi_dung"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.getVi();
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
                })
        },
        checkTKNguoiDung() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/nguoi-dung/ngan-hang-vi/check", {},
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nguoi_dung"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.hasBankAccount = res.data.status;
                        console.log("tình trạng ngân hàng" + this.hasBankAccount);

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
                })
        },
        capNhatSTKNguoiDung() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/nguoi-dung/ngan-hang-vi/create", this.tkNguoiDung,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nguoi_dung"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        console.log(" ngân hàng người dùng" + this.tkNguoiDung);

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
                })
        },
        loadlSGiaoDich() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/getData-giao-dich", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.lSGiaoDich = res.data.data;
                        // console.log("lịch sử giao dịch người dùng", JSON.stringify(this.lSGiaoDich));
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
    },
};
</script>

<style scoped>
.modal-header {
    padding: 1rem;
    border-bottom: 2px solid #e9ecef;
}

.modal-header.bg-success {
    background-color: #28a745;
}

.modal-header .modal-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.modal-header .btn-close-white {
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
}

/* Modal Body */
.modal-body {
    padding: 1rem 1.5rem;
}

.modal-body .form-group {
    margin-bottom: 1rem;
}

.modal-body .form-label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: #333;
}

.modal-body .form-control {
    border-radius: 8px;
    border: 1px solid #ced4da;
    padding: 10px;
    font-size: 1rem;
}

.modal-body .form-control:focus {
    border-color: #28a745;
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

.modal-body .note {
    font-size: 0.9rem;
    color: #6c757d;
    margin-top: 10px;
    font-style: italic;
}

/* Modal Footer */
.modal-footer {
    padding: 1rem 1.5rem;
    border-top: 2px solid #e9ecef;
}

.modal-footer .btn {
    padding: 10px 16px;
    font-size: 1rem;
}

.modal-footer .btn-success {
    background-color: #28a745;
    border-color: #28a745;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.modal-footer .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.modal-footer .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.modal-footer .btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.modal-header {
    padding: 1rem;
    border-bottom: 2px solid #e9ecef;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.qr-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.qr-code {
    max-width: 150px;
    width: 100%;
    height: auto;
    border: 2px solid #007bff;
    border-radius: 8px;
}

.modal-text {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
}

.modal-footer {
    padding: 1rem;
    border-top: 2px solid #e9ecef;
    display: flex;
    gap: 10px;
}

.modal-footer .btn {
    padding: 8px 16px;
    font-size: 0.9rem;
}

.modal-footer .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.modal-footer .btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.modal-footer .btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.modal-footer .btn-outline-secondary:hover {
    color: #ffffff;
    background-color: #6c757d;
}

.wallet-container {
    max-width: 1000px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    
}

.balance-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.balance-amount {
    font-size: 2rem;
    font-weight: bold;
    color: #28a745;
}

.transaction-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.transaction-list {
    list-style-type: none;
    padding: 0;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e9ecef;
}

.transaction-item:last-child {
    border-bottom: none;
}

.options-section .btn-block {
    width: 100%;
    font-size: 1rem;
    padding: 10px 0;
}

.text-success {
    color: #28a745 !important;
}

.text-danger {
    color: #dc3545 !important;
}
select.form-select-sm {
  width: auto;
  min-width: 200px; /* hoặc phù hợp */
}
</style>