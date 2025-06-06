<template>
    <div class="d-flex justify-content-center">
        <div class="col-lg-6">
            <div class="card employee-card">
                <div class="card-body text-center">
                    <!-- Icon Wrapper for Heart and Dots -->
                    <div class="icon-wrapper">
                        <span class="heart-icon" @click="toggleHeart">&#9825;</span> <!-- Icon for Heart -->
                        <span class="dots-icon" @click="toggleOptions">&#8226;&#8226;&#8226;</span>
                        <!-- Icon for Dots -->
                    </div>

                    <!-- Options that appear when clicking the Dots -->
                    <div class="options-menu d-none" id="optionsMenu">
                        <button class="btn btn-outline-secondary btn-sm w-100 my-1">Option 1</button>
                        <button class="btn btn-outline-secondary btn-sm w-100 my-1">Option 2</button>
                        <button class="btn btn-outline-secondary btn-sm w-100 my-1">Option 3</button>
                    </div>

                    <div class="badge-wrapper">
                        <span class="badge bg-secondary text-white">#1</span>
                    </div>
                    <img v-bind:src="nhanvien.hinh_anh" alt="" class="rounded-circle p-1 bg-primary mt-3" width="110">

                    <h4 class="mt-2">{{ nhanvien.ho_va_ten }}</h4>
                    <p class="text-muted mb-1">{{ nhanvien.dia_chi }}</p>
                    <div class="d-flex justify-content-center mt-2">
                        <div class="px-2">
                            <p class="mb-1">{{ nhanvien.tuoi_nhan_vien }}</p>
                            <small class="text-muted">Tuổi</small>
                        </div>
                        <div class="px-2">
                            <p class="mb-1">5 <span class="text-warning">&#9733;</span></p>
                            <small class="text-muted">Số sao</small>
                        </div>
                        <div class="px-2">
                            <p class="mb-1">{{ nhanvien.kinh_nghiem }}</p>
                            <small class="text-muted">Kinh Ngiệm</small>
                        </div>
                        <router-link :to="`/nguoi-dung/xemdanhgia/` +nhanvien.id">
                            <a href="/nguoi-dung/xemdanhgia/">
                                <div class="px-2">
                                    <p class="mb-1">{{ count }} Đánh giá</p>
                                    <small class="text-muted">Xem Đánh Giá</small>
                                </div>
                            </a>
                        </router-link>
                    </div>
                    <div class="mini-calendar">
                        <div class="calendar-row">
                            <div v-for="(day, index) in calendar" :key="index" class="calendar-day"
                                @click="selectDay(day)">
                                <div class="day-header">
                                    <span class="day-date">{{ day.ngayRanh.split('-')[2] }}/{{
                                        day.ngayRanh.split('-')[1] }}</span>
                                </div>
                                <ul class="schedule-times" v-if="day.thoiGianRanh.length">
                                    <li v-for="(time, indx) in day.thoiGianRanh" :key="indx" class="time-item">
                                        {{ time.batDau }} - {{ time.ketThuc }}
                                    </li>
                                </ul>
                                <div v-else class="no-schedule">Không có lịch</div>
                            </div>
                        </div>
                    </div>
                    <router-link :to="`/nguoi-dung/dat-lich-ngay-voi-nhan-vien/` + nhanvien.id">
                        <button class="btn btn-success mt-4 w-100">Đặt lịch với nhân viên</button>
                    </router-link>
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
            nhanvien: {},
            lichRanh: [],
            id_nhan_vien: this.$route.params.id_nhan_vien,
            calendar: [],
            count: "",
        }
    },
    mounted() {
        this.loadChiTietNhanVien();
        this.loadLichRanhNhanVien();
        this.generateCalendar();
        this.coutDanhGiaNV();
    },
    methods: {
        loadChiTietNhanVien() {
            axios
                .get('http://127.0.0.1:8000/api/nguoi-dung/get-Data-Chi-Tiet-Nhan-Vien/' + this.id_nhan_vien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.nhanvien = res.data.data;
                    console.log('nhân viên là :', this.nhanvien);
                })
                .catch((error) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        loadLichRanhNhanVien() {
            axios
                .get('http://127.0.0.1:8000/api/nguoi-dung/lay-lich-lam-ranh-nv/' + this.id_nhan_vien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.lichRanh = res.data.data;
                    console.log('lịch rảnh của nhân viên là :', this.nhanvien);
                    this.generateCalendar();
                })
                .catch((error) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        coutDanhGiaNV() {
            axios
                .get('http://127.0.0.1:8000/api/nguoi-dung/dem-danh-gia/' + this.id_nhan_vien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.count = res.data.data;
                    console.log('số sao của nhân viên là :', this.count);
                    this.generateCalendar();
                })
                .catch((error) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
        generateCalendar() {
            if (!this.lichRanh.length) return;


            const today = new Date();
            const next7Days = [];


            for (let i = 0; i < 7; i++) {
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + i);


                const formattedDate = nextDay.toISOString().split('T')[0];


                const foundDay = this.lichRanh.find((item) => item.ngayRanh === formattedDate);


                next7Days.push(foundDay || { ngayRanh: formattedDate, thoiGianRanh: [] });
            }

            this.calendar = next7Days;
            console.log('7 ngày tiếp theo:', this.calendar);
        }
    },
}
</script>
<style>
.mini-calendar {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
}

.calendar-header {
    background-color: #007bff;
    color: #fff;
    text-align: center;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
}

.calendar-row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 10px;
}

.calendar-day {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f8f9fa;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.calendar-day:hover {
    background-color: #e9ecef;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.day-header {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #007bff;
}

.day-date {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.schedule-times {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
}

.time-item {
    font-size: 0.8rem;
    color: #28a745;
    margin-top: 5px;
}

.no-schedule {
    font-size: 0.9rem;
    color: #6c757d;
    margin-top: 10px;
}

.calendar-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
}

.calendar-header {
    background-color: #f8f9fa;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.calendar-cell {
    height: 100px;
    border: 1px solid #ddd;
    vertical-align: top;
    cursor: pointer;
}

.calendar-cell:hover {
    background-color: #f1f1f1;
}

.day-container {
    padding: 5px;
    text-align: center;
}

.day-number {
    font-size: 1.2rem;
    font-weight: bold;
}

.schedule-times {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
}

.time-item {
    font-size: 0.8rem;
    color: #007bff;
    margin-top: 5px;
}

.employee-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    width: 120%;
    max-width: 1200px;
    height: auto;
    min-height: 500px;
    margin: 20px 0 20px -10%;
    padding: 20px;
}


.schedule-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.schedule-date {
    font-size: 1.1em;
    margin-bottom: 0.5em;
}

.schedule-times {
    list-style-type: none;
    padding: 0;
}

.schedule-time-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
}

.schedule-time-item i {
    margin-right: 0.5em;
    color: #007bff;
}

.badge-wrapper {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
}

.icon-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.heart-icon {
    color: #ff5e5e;
    font-size: 18px;
    cursor: pointer;
}

.dots-icon {
    color: #000;
    font-size: 18px;
    cursor: pointer;
}

.options-menu {
    position: absolute;
    top: 30px;
    right: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px;
    z-index: 100;
}

.d-none {
    display: none;
}
</style>