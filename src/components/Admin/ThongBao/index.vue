<template>
    <div class="container" style="margin-top: -50px;">
        <div class="container">
            <div v-for="(value, index) in paginatedThongbao" :key="index" class="notification"
                :class="{ 'new-notification': value.is_read === 0 }">
                <div class="details">
                    <h4>Thông Báo: {{ (currentPage - 1) * rowsPerPage + index + 1 }}</h4>
                    <p>{{ value.loi_nhan }}</p>
                </div>
                <div v-if="value.so_tien_rut" class="menu">
                    <template v-if="value.loai_nguoi_gui === 2">
                        <!-- Đường dẫn cho người dùng -->
                        <router-link :to="`/admin/ruttien-nguoiDung/${value.id}`" @click="markAsRead(value.id)">
                            <button type="button" class="btn btn-danger detail-button" data-bs-dismiss="modal">
                                Xem Chi Tiết
                            </button>
                        </router-link>
                    </template>
                    <template v-else-if="value.loai_nguoi_gui === 1">
                        <!-- Đường dẫn cho nhân viên -->
                        <router-link :to="`/admin/ruttien/${value.id}`" @click="markAsRead(value.id)">
                            <button type="button" class="btn btn-danger detail-button" data-bs-dismiss="modal">
                                Xem Chi Tiết
                            </button>
                        </router-link>
                    </template>
                </div>
                <div v-else class="menu">
                    <router-link :to="value.loai_nguoi_gui === 2 ? '/admin/vinguoidung' : '/admin/vinhanvien'"
                        @click="markAsRead(value.id)">
                        <button type="button" class="btn btn-danger detail-button" data-bs-dismiss="modal">
                            Qua Trang Quản Lý Ví
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="flex justify-between items-center mt-4 pagination-bar">
                <div class="text-gray-400">
                    Rows per page:
                    <select v-model="rowsPerPage" @change="currentPage = 1" class="pagination-bar-select">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div class="text-gray-400">
                    {{ startItem }} - {{ endItem }} of {{ thongbao.length }}
                    <button @click="prevPage" class="ml-2 text-gray-400 hover:text-white" :disabled="currentPage === 1">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button @click="nextPage" class="ml-2 text-gray-400 hover:text-white"
                        :disabled="currentPage === totalPages">
                        <i class="fas fa-chevron-right"></i>
                    </button>
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
            thongbao: [],
            currentPage: 1,
            rowsPerPage: 5,
            check: false,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.thongbao.length / this.rowsPerPage);
        },
        paginatedThongbao() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.thongbao.slice(start, end);
        },
        startItem() {
            return (this.currentPage - 1) * this.rowsPerPage + 1;
        },
        endItem() {
            return Math.min(this.currentPage * this.rowsPerPage, this.thongbao.length);
        },
    },
    mounted() {
        this.loadtb();
        this.listenToNotifications();
        this.loadCurrentUserId();
    },
    methods: {
        loadCurrentUserId() {
            axios
                .get("http://127.0.0.1:8000/api/admin/id", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin"),
                    },
                })
                .then((res) => {
                    this.currentUserId = res.data.admin_id;
                    console.log("Current User ID:", this.currentUserId);
                    this.listenToNotifications();
                })
                .catch((errors) => {
                    console.error("Lỗi khi lấy ID admin hiện tại:", errors);
                });
        },
        listenToNotifications() {
            if (!this.currentUserId) {
                console.error("currentUserId chưa được gán, không thể đăng ký channel.");
                return;
            }

            console.log(`Đăng ký channel: notifications.${this.currentUserId}`);
            this.$echo.channel(`notifications_ad.${this.currentUserId}`)
                .listen('.thongbao.created', (data) => {
                    console.log('Thông báo mới nhận:', data);
                    if (data.thongBao.types === 3) {
                        console.log('Thông báo dành cho admin:', data);
                    }
                    this.thongbao.unshift(data.thongBao);
                    this.scrollToTop();
                });
        },
        scrollToTop() {
            const container = document.querySelector('.container');
            if (container) container.scrollTop = 0;
        },
        loadtb() {
            axios
                .get("http://127.0.0.1:8000/api/admin/getData-Yeu-Cau-Rut-Tien-NV-ND", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thongbao = res.data.data;
                        console.log("Danh sách thông báo:" + JSON.stringify(this.thongbao));
                    } else {
                        console.log("Không có thông báo nào:", res.data.message);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        markAsRead(id) {
            axios
                .post(`http://127.0.0.1:8000/api/admin/thay-doi-trang-thai-doc/${id}`, {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then(() => {
                    this.loadtb();
                })
                .catch((error) => {
                    console.error("Lỗi khi cập nhật trạng thái:", error);
                });
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        viewDetails(id_don_hang) {
            console.log("Chi tiết Đơn dịch vụ:", id_don_hang);
        },
    },
};
</script>

<style scoped>
/* Thông Báo */
.notification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    /* Cân đối padding */
    background-color: #ffffff;
    /* Màu trắng đồng nhất */
    border: 1px solid #e0e0e0;
    /* Viền xám nhẹ */
    border-radius: 8px;
    margin-bottom: 12px;
    /* Khoảng cách đều giữa các thông báo */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Bóng nhẹ */
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.new-notification {
    background-color: #f0f9ff;
    /* Màu nền xanh nhạt */
    font-weight: bold;
    /* Chữ đậm */
    border-left: 4px solid #007bff;
    /* Viền trái màu xanh */
}

.notification:hover {
    transform: translateY(-4px);
    /* Hiệu ứng nhấc khi hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    /* Bóng rõ hơn */
}

.notification .details h4 {
    margin: 0 0 6px;
    font-size: 18px;
    /* Cỡ chữ lớn hơn */
    color: #333;
    font-weight: bold;
    /* Đậm để nổi bật */
}

.notification .details p {
    margin: 0;
    font-size: 14px;
    /* Cỡ chữ nhỏ hơn tiêu đề */
    color: #666;
    /* Xám trung tính */
}

.notification .menu {
    margin-left: 20px;
    /* Tạo khoảng cách giữa menu và chi tiết */
}

/* Nút Chi Tiết */
.detail-button {
    padding: 8px 16px;
    /* Padding đều */
    font-size: 14px;
    /* Giảm kích thước để hài hòa */
    background-color: #46DFB1;
    /* Màu xanh dương */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.detail-button:hover {
    background-color: #0056b3;
    /* Xanh đậm hơn khi hover */
    transform: scale(1.05);
    /* Phóng to nhẹ */
}

.detail-button:active {
    background-color: #004085;
    /* Màu đậm hơn khi nhấn */
}

/* Thanh Phân Trang */
.pagination-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    /* Tạo khoảng cách trên */
}

.pagination-bar select {
    padding: 4px 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
}

.pagination-bar button {
    padding: 4px 10px;
    font-size: 14px;
    border: none;
    background: none;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.2s ease;
}

.pagination-bar button:hover {
    color: #0056b3;
    transform: scale(1.2);
    /* Phóng to nhẹ */
}

.pagination-bar button:disabled {
    color: #ccc;
    /* Xám khi vô hiệu */
    cursor: not-allowed;
}

.pagination-bar select {
    padding: 6px 12px;
    /* Padding lớn hơn để dễ nhìn */
    font-size: 16px;
    /* Cỡ chữ lớn hơn */
    border-radius: 6px;
    /* Bo góc mượt hơn */
    border: 1px solid #007bff;
    /* Viền màu xanh rõ nét */
    background-color: #ffffff;
    /* Nền trắng để nổi bật */
    color: #333;
    /* Màu chữ đậm */
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Hiệu ứng bóng nhẹ */
    transition: all 0.3s ease;
    /* Hiệu ứng khi hover hoặc focus */
}

.pagination-bar select:hover {
    border-color: #0056b3;
    /* Viền đậm hơn khi hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    /* Bóng rõ hơn khi hover */
}

.pagination-bar select:focus {
    outline: none;
    /* Bỏ viền mặc định */
    border-color: #007bff;
    /* Viền xanh khi focus */
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    /* Hiệu ứng sáng viền */
}
</style>