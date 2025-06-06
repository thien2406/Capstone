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
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Thoát</button>
                    <button v-on:click="xacNhanThanhToan()" type="button" class="btn btn-primary">Xác nhận nạp
                        tiền</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container wallet-container" >

        <div class="balance-section d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 class="text-muted"><i class="fas fa-wallet"></i> Số dư của bạn: </h4>
                <h3 class="balance-amount text-success">{{ formatVNDd(dataVi.so_du) }}</h3>
            </div>
            <button type="button" class="btn btn-primary btn-lg shadow-sm" data-bs-toggle="modal"
                data-bs-target="#napTien">
                <i class="fas fa-plus-circle"></i> Nạp tiền
            </button>
        </div>
        
      
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
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle"></i> Thoát
                        </button>
                        <button v-on:click="guiYeuCau()" type="button" class="btn btn-success" data-bs-dismiss="modal">
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
            transactions: [],  
            filterType: ''  ,
            lSGiaoDich: [],
            hasBankAccount: false,
        };
    },

    mounted() {
        this.getVi();
        this.loadlSGiaoDich();
        this.checkTKNhanVien();
    },
    computed: {
        qrCodeUrl() {
            const addInfo = encodeURIComponent(this.dataVi.can_cuoc_cong_dan+ ' , ' + this.dataVi.ho_va_ten);
            return `https://img.vietqr.io/image/MB-0369396097-qr_only.png?addInfo=${addInfo}`;
        },
        filteredTransactions() {
            if (!this.filterType) {
                return this.lSGiaoDich.filter(item => item.type === 1 || item.type === 2);
            }
            const typeMapping = {
                'nạp tiền': 1, 
                'rút tiền': 2 
            };
            const selectedType = typeMapping[this.filterType];
            return this.lSGiaoDich.filter(item => item.type === selectedType);
        },
    },
    methods: {
        formatTransaction(item) {
            const typeMapping = {
                1: 'nạp tiền',
                2: 'rút tiền' 
            };
            const isCredit = item.type === 1; 
            const amount = isCredit ? item.creditAmount : item.debitAmount;
            const amountClass = isCredit ? 'text-success' : 'text-danger';
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
        updateValue(event) {
            const rawValue = event.target.value.replace(/\D/g, '');
            this.soTienRut.so_tien_rut = rawValue || '0';
            event.target.value = this.formatVND(this.soTienRut.so_tien_rut);
        },
        formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        checkTKNhanVien() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/nhan-vien/ngan-hang-vi/check", {},
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nhan_vien"),
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
        getVi() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/vi-dien-tu/getData", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.data) {
                        this.dataVi = res.data.data;
                        // console.log("vi data: " + JSON.stringify(this.dataVi));
                        // console.log("Số dư: ", this.dataVi.so_du); 
                        // console.log("Kiểu dữ liệu số dư: ", typeof this.dataVi.so_du);

                    } else {
                        this.$toast.error('Không tìm thấy địa chỉ.');
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
            modal.hide(); // Tắt modal
            axios
                .post(
                    "http://127.0.0.1:8000/api/nhan-vien/vi-dien-tu/napTien",
                    {}, // Payload nếu có
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nhan_vien"),
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
                    this.isLoading = false; // Kết thúc trạng thái xử lý
                });
        },
        guiYeuCau() {
            if (!this.soTienRut.so_tien_rut || this.soTienRut.so_tien_rut < 10000) {
                this.$toast.error("Số tiền rút phải lớn hơn hoặc bằng 10,000 VNĐ!");
                return;
            }
            axios
                .post(
                    "http://127.0.0.1:8000/api/nhan-vien/vi-dien-tu/guiYeuCauRutTien", this.soTienRut,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_nhan_vien"),
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
        loadlSGiaoDich() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/getData-giao-dich", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.lSGiaoDich = res.data.data;
                         console.log("lịch sử giao dịch người dùng", JSON.stringify(this.lSGiaoDich));

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
    /* chìu rông */
    background-color: #f8f9fa;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    margin-top : -50px;
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