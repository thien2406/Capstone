<template>
    <div class="page-wrapper ">
        <div class="page-content mb" style="margin-top: -70px;">
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-2">
                <div class="breadcrumb-title pe-3">Lịch Sử Giao Dịch</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a></li>
                            <li class="breadcrumb-item active" aria-current="page">Giao Dịch Của Tôi</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div class="card mt-4">
                <div class="card-body">
                    <div class="d-lg-flex align-items-center mb-4 gap-3">
                        <div class="position-relative"><input type="text" class="form-control ps-5 radius-30"
                                placeholder="Tìm kiếm theo nội dung giao dịch hoặc số tiền giao dịch"
                                v-mod   el="searchTerm" @input="searchGiaoDich">
                            <span class="position-absolute top-50 product-show translate-middle-y"><i
                                    class="bx bx-search"></i></span>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered mb-0"  >
                            <thead class="table-light">
                                <tr>
                                    <th class="text-center"></th>
                                    <th class="text-center">Ngày Giao Dịch</th>
                                    <th class="text-center">Phương Thức Thanh Toán</th>
                                    <th class="text-center">Đã Chuyển </th>
                                    <th class="text-center">Đã Nhận </th>
                                    <th class="text-center" style="width: -20px;">Kiểu Giao Dịch</th>
                                    <th class="text-center">Nội Dung Chuyển</th>
                                    <th class="text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in lSGiaoDich" :key="index">
                                    <tr>
                                        <td class="text-center">{{ index + 1 }}</td>
                                        <td class="text-center">{{ formattedTime(value.created_at) }}</td>
                                        <td class="text-center">Chuyển Khoản</td>
                                        <td class="text-center">{{ formatVND(value.creditAmount) }}</td>
                                        <td class="text-center">{{ formatVND(value.debitAmount) }}</td>
                                        <td class="text-center">
                                            <button v-if="value.type == 1" class="btn text-nowrap mb-2"
                                                style="background-color: #80EE98; color: white;">
                                                Nạp tiền Vào ví
                                            </button>
                                            <button v-else-if="value.type == 2" class="btn text-nowrap mb-2"
                                                style="background-color: #46DFB1; color: white;">
                                                Rút tiền Từ ví
                                            </button>
                                            <button v-else class="btn text-nowrap mb-2"
                                                style="background-color: #09D1C7; color: white;">
                                                Thanh Toán Đơn dịch vụ
                                            </button>
                                        </td>
                                        <td class="text-center">
                                            <div v-if="!isExpanded" class="truncate-multiline">{{ value.description }}
                                            </div>
                                            <div v-else>{{ value.description }}</div>
                                            <button @click="isExpanded = !isExpanded" class="btn-toggle">
                                                {{ isExpanded ? 'Ẩn bớt' : 'Xem thêm' }}
                                            </button>
                                        </td>
                                        <td class="text-center">
                                            <button v-if="value.is_done == 1" class="btn text-nowrap mb-2"
                                                style="background-color: #28A745; color: white;">
                                                Đã Hoàn Thành
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
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
            lSGiaoDich: [],
            isExpanded: false,
            searchTerm: '',
        };
    },
    mounted() {
        this.loadlSGiaoDich();
    },
    methods: {
        formattedTime(rawTime) {
            const date = new Date(rawTime);
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        searchGiaoDich() {
            // Kiểm tra nếu ô tìm kiếm trống thì load lại tất cả giao dịch
            if (this.searchTerm.trim() === '') {
                this.loadlSGiaoDich();
                return;
            }

            axios
                .post("http://127.0.0.1:8000/api/nguoi-dung/search-giao-dich", {}, {
                    params: {
                        noi_dung_tim: this.searchTerm
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.data) {
                        this.lSGiaoDich = res.data.data;
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



.table-responsive {
    max-height: 317px;
    overflow-y: auto;
    overflow-x: hidden;
}

/* Đảm bảo tiêu đề bảng cố định khi cuộn */
.table thead th {
    position: sticky;
    top: 0;
    background-color: #f1f1f1;
    z-index: 2;
}

/* Giữ nội dung bảng gọn gàng */
.table td,
.table th {
    word-wrap: break-word;
    white-space: normal;
    text-align: center;
    vertical-align: middle;
}


.breadcrumb-title {
    font-size: 1.5rem;
    color: #343a40;
}


.btn-transaction {
    color: white;
    padding: 8px 15px;
    border-radius: 30px;
    font-size: 0.9rem;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    border: none;
}

.btn-transaction.deposit {
    background-color: #80EE98;
}

.btn-transaction.withdraw {
    background-color: #46DFB1;
}

.btn-transaction.payment {
    background-color: #09D1C7;
}

.btn-transaction:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-toggle {
    background-color: #0C6478;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.btn-toggle:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-toggle:active {
    transform: translateY(0);
    box-shadow: none;

}

.truncate-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-width: 300px;
    text-align: left;
}

.page-wrapper {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
    max-width: 1400px;
    margin: 0px auto;
    padding: 0px;
}


.card-body {
    padding: 24px;
}

.form-control {
    border-radius: 30px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 7px 10px;
}

.btn {
    border-radius: 30px;
    transition: all 0.3s ease-in-out;
    padding: 8px 15px;
    font-size: 0.9rem;
    font-weight: bold;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.table {
    margin-top: -15px;
    border-collapse: separate;
    border-spacing: 0 10px;
}

.table thead th {
    font-weight: bold;
    color: #495057;
    text-align: center;
    background-color: #f1f3f5;
    border: none;
}

.table td {
    vertical-align: middle;
    border: none;
    padding: 12px 15px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.table tbody tr {
    transition: transform 0.2s;
}

.table tbody tr:hover {
    transform: translateY(-2px);
    background-color: #f8f9fa;
}

.position-relative input[type="text"] {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    padding-left: 2.5rem;
}

.position-absolute.top-50.product-show {
    left: 15px;
    color: #495057;
}

.page-content {
    margin-top: 0;
    padding-top: 5px;
}


.table-light {
    background-color: #e9ecef;
}
</style>
