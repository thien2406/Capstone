<template>
    <div class="review-container">
        <div class="review-header">
            <h1>Xem Đánh Giá Khách Hàng</h1>
            <p class="sub-header">Những phản hồi quý giá từ khách hàng</p>
        </div>
        <div class="review-summary">
            <p><strong>Tổng số đánh giá:</strong> 10</p>
            <p><strong>Xếp hạng trung bình:</strong> 4.5/5</p>
        </div>
        <div class="review-list">
            <template v-for="(value, index) in DanhGia" :key="index">
                <div class="review-item">
                    <div class="avatar">
                        {{ value.ten_nguoi_dung ? value.ten_nguoi_dung.charAt(0) : 'N/A' }}
                    </div>
                    <div class="review-body">
                        <div class="customer-details">
                            <div class="customer-name">{{ value.ten_nguoi_dung }}</div>
                        </div>
                        <div class="rating">
                            <i v-for="starIndex in 5" :key="starIndex" :class="starIndex <= value.so_sao ? 'fa fa-star' : 'fa fa-star-o'"></i>
                        </div>
                        <p class="review-comment">{{ value.nhan_xet }}</p>
                        <div class="report">Báo cáo</div>
                    </div>
                </div>
            </template>
        </div>
        <div class="see-more">
            <button>Xem thêm</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            DanhGia: [],
            id_nhan_vien: this.$route.params.id_nhan_vien,
        }
    },
    mounted() {
        this.loadDanhGia();
    },
    methods: {
        loadDanhGia() {
            axios
                .get('http://127.0.0.1:8000/api/nguoi-dung/lay-danh-gia-nhan-vien/data/' + this.id_nhan_vien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.DanhGia = res.data.data;
                    console.log('đánh giá của nhân viên là :', this.DanhGia);
                })
                .catch((error) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
    },
}
</script>
<style scoped>
.review-container {
    max-width: 1000px;
    margin: 10px auto;
    padding: 20px;
    background: linear-gradient(135deg, #ffffff, #f2f7ff);
    border-radius: 12px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    ;
}

/* Header */
.review-header {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.review-header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
    color: #0066cc;
}

.review-header .sub-header {
    font-size: 1rem;
    margin-top: 8px;
    color: #555;
}

/* Tóm tắt */
.review-summary {
    text-align: center;
    margin-bottom: 30px;
    font-size: 1rem;
    color: #555;
}

/* Danh sách đánh giá */
.review-item {
    display: flex;
    align-items: flex-start;
    background: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-item:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.avatar {
    width: 60px;
    height: 60px;
    background: #0066cc;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 20px;
}

.review-body {
    flex: 1;
}

.customer-details {
    margin-bottom: 8px;
}

.customer-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.rating {
    display: flex;
    margin-bottom: 10px;
}

.rating .fa {
    color: #ffc107;
    font-size: 1.2rem;
    margin-right: 4px;
}

.review-comment {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
    margin-bottom: 10px;
}

.report {
    font-size: 0.9rem;
    color: #0066cc;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s ease;
}

.report:hover {
    color: #004999;
}

/* Nút xem thêm */
.see-more {
    text-align: center;
    margin-top: 20px;
}

.see-more button {
    background-color: #0066cc;
    color: #ffffff;
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.see-more button:hover {
    background-color: #004999;
    transform: translateY(-3px);
}
</style>

