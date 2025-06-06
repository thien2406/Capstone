<template>
    <div class="weekly-calendar">
        <div class="calendar-header">
            <button @click="prevWeek" class="nav-button">← Tuần trước</button>
            <span class="header-title">{{ formattedWeek }}</span>
            <button @click="nextWeek" class="nav-button">Tuần sau →</button>
        </div>
        <div class="calendar-body">
            <div class="time-column">
                <div class="time-cell empty-cell"></div>
                <div v-for="hour in hours" :key="hour" class="time-cell">{{ hour }}</div>
            </div>
            <div v-for="(day, index) in weekDays" :key="index" class="day-column">
                <div class="day-header">{{ day.label }}</div>
                <div class="day-body">
                    <div v-for="(hour) in hours" :key="hour" class="day-cell"></div>
                    <!-- Hiển thị sự kiện cho ngày này -->
                    <template v-for="event in events" :key="event.id">
                        <div v-if="isEventInDay(event, day.date)" class="event" :style="{
                            top: calculateEventTopPosition(event),
                            height: getEventSpan(event) + '%'
                        }">
                            <p>{{ event.ma_don_hang }}</p>
                            <p>{{ event.gio_bat_dau }} - {{event.gio_ket_thuc }}</p>
                            <p>{{ event.dia_chi_khach_hang }}</p>
                        </div>
                    </template>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

export default {
    name: 'CustomCalendar',
    data() {
        return {
            currentWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
            hours: (() => {
                const startHour = 8; // Giờ bắt đầu
                const endHour = 20; // Giờ kết thúc
                const intervals = [];

                for (let hour = startHour; hour <= endHour; hour++) {
                    intervals.push(`${hour.toString().padStart(2, '0')}:00`);
                    // if (hour !== endHour) {
                    //     intervals.push(`${hour.toString().padStart(2, '0')}:30`);
                    // }
                }
                return intervals;
            })(),
            events: [],
        };
    },
    computed: {
        weekDays() {
            return Array.from({ length: 7 }, (_, i) => {
                const date = addDays(this.currentWeek, i);
                const dayLabel = format(date, 'EEE', { locale: vi });
                const formattedDayLabel = dayLabel.replace(/^Thứ\s?(\d)/, 'T$1').replace('CN', 'CN');
                return { label: `${formattedDayLabel}, ${format(date, 'dd')}`, date };
            });
        },
        formattedWeek() {
            // Hiển thị ngày, tháng và năm
            return `${format(this.currentWeek, 'dd/MM/yyyy')} - ${format(addDays(this.currentWeek, 6), 'dd/MM/yyyy')}`;
        },
    },
    mounted() {
        this.fetchWeekData();
    },
    methods: {
        isEventInDay(event, date) {
            const eventDate = format(new Date(event.ngay_lam_viec), 'yyyy-MM-dd');
            const cellDate = format(new Date(date), 'yyyy-MM-dd');
            return eventDate === cellDate;
        },
        getHourPosition(eventTime) {
            if (!eventTime) {
                console.error('Giờ sự kiện không hợp lệ:', eventTime);
                return NaN;
            }
            const [hour, minute] = eventTime.split(':').map(Number);
            return (hour - 8) * 58 + minute; 
        },
        isEventStart(event, date, hour) {
            const eventDate = format(new Date(event.ngay_lam_viec), 'yyyy-MM-dd');
            const cellDate = format(new Date(date), 'yyyy-MM-dd');
            const eventStartTime = `${event.gio_bat_dau}`;

            console.log(`Kiểm tra sự kiện ${event.ma_don_hang}`);
            console.log('Ngày sự kiện:', eventDate, 'Ngày ô:', cellDate);
            console.log('Giờ bắt đầu của sự kiện:', eventStartTime, 'Giờ của ô:', hour);

            return eventDate === cellDate && eventStartTime === hour;
        },
        calculateEventTopPosition(event) {
            const offsetMinutes = this.getHourPosition(event.gio_bat_dau);
            const totalMinutes = 13 * 60; // Tổng số phút từ 08:00 đến 21:00
            return (offsetMinutes / totalMinutes) * 100 + '%';
        },
        getEventSpan(event) {
            const startOffset = this.getHourPosition(event.gio_bat_dau);
            const endOffset = this.getHourPosition(event.gio_ket_thuc);
            const durationMinutes = endOffset - startOffset;
            const totalMinutes = 13 * 60; // Tổng số phút từ 08:00 đến 21:00
            return (durationMinutes / totalMinutes) * 98; 
        },
        async fetchWeekData() {
            const startDate = format(this.currentWeek, 'yyyy-MM-dd');
            const endDate = format(addDays(this.currentWeek, 6), 'yyyy-MM-dd');
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/nhan-vien/lich-lam/getDataLichLam", {
                    params: { start_date: startDate, end_date: endDate },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien"),
                    }
                });

                if (res.data.status) {
                    this.events = res.data.data.map(event => ({
                        ...event,
                        gio_bat_dau: event.gio_bat_dau.slice(0, 5),
                        gio_ket_thuc: event.gio_ket_thuc.slice(0, 5),
                    }));
                    console.log('Dữ liệu từ API:', JSON.stringify(this.events));
                } else {
                    console.log('Không có dữ liệu lịch làm:', res.data.message);
                    this.events = [];
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        },
        prevWeek() {
            this.currentWeek = addDays(this.currentWeek, -7);
            this.fetchWeekData();
        },
        nextWeek() {
            this.currentWeek = addDays(this.currentWeek, 7);
            this.fetchWeekData();
        },
    }
};
</script>
<style scoped>
.calendar-body {
    display: flex;
    width: 100%;
    height: 700px;
    overflow-y: auto;
    
}

.time-column,
.day-column {
    flex-shrink: 0;
}

.weekly-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* Chỉnh lại thành 100% để mở rộng ra 2 bên */
    margin: auto;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
}

.calendar-header {
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* Đảm bảo header chiếm toàn bộ chiều rộng */
    padding: 10px;
    background-color: #3182ce;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
}

.header-title {
    flex: 1;
    text-align: center;
}

.nav-button {
    background-color: #63b3ed;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.nav-button:hover {
    background-color: #4299e1;
}

.calendar-body {
    display: flex;
    width: 100%;
}

.time-column {
    width: 60px;
    text-align: right;
    padding-right: 10px;
    border-right: 1px solid #e2e8f0;
    background-color: #edf2f7;
}

.time-cell {
    flex: 1; /* Đảm bảo ô giờ tự động chia đều */
    height: 50px; /* Tăng chiều cao lên 50px để vừa với ô ngang */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem; /* Chữ rõ hơn */
    color: #4a5568;
    border-bottom: 1px solid #e2e8f0; /* Thêm đường viền để phân chia */
    background-color: #f7fafc; /* Màu nền nhẹ */
    
}
.day-column {
    flex: 1;
    border-left: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: relative;
}

.day-body {
    position: relative;
    flex: 1;
}

.day-header {
    text-align: center;
    padding: 13px;
    background-color: #e6fffa;
    font-weight: bold;
    color: #2c7a7b;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.day-cell {
    height: 50px;
    border-top: 1px solid #e2e8f0;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7fafc;
    transition: background-color 0.2s;
}

.day-cell:hover {
    background-color: #bee3f8;
}

.event {
    position: absolute;
    width: calc(100% - 10px);
    left: 5px;
    background-color: #ffec99;
    border: 1px solid #e0c866;
    border-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
    z-index: 2;
    overflow-wrap: break-word;
}

.event p {
    margin: 0;
    white-space: normal;
}
</style>
