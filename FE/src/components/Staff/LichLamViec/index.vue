    <template>
        <div class="container" style="margin-top: -70px;">
            <h1 class="title">Lịch Làm Việc Của Tôi</h1>
            <CustomCalendar />
            <div class="color-legend">
                <h2>Bảng chú thích màu trên lịch</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Màu</th>
                            <th>Tên Loại Lớp</th>
                            <th>Mô Tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="background-color: #ffffcc; width: 50px; height: 30px;"></td>
                            <td>Giúp Việc Định Kì</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <p class="note">Lưu ý: Không thể chỉnh sửa Lịch Làm Việc. 
                    Nếu có sự thay đổi,Lịch Làm sẽ tự động cập nhật sau 1 giờ kể từ lúc thay đổi.<br>
                </p>        
            </div>
        </div>
</template>
<script>
import CustomCalendar from './CustomCalendar.vue';

export default {
    components: {
        CustomCalendar,
    },
    mounted() {
        document.body.style.zoom = '100%';
    },
    beforeDestroy() {
        document.body.style.zoom = '100%';
    },
    //chuyển tran về lkai bth
    beforeRouteLeave(to, from, next) {
        document.body.style.zoom = '100%';
        next();
    },
};
</script>
<style scoped>
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.title {
    font-size: 2rem;
    font-weight: bold;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 2px solid #3182ce;
    padding-bottom: 10px;
    width: 100%;
}
.custom-calendar {
    width: 100%;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
}
.color-legend {
    width: 100%;
    margin-top: 20px;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.color-legend h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
}
.color-legend table {
    width: 100%;
    border-collapse: collapse;
}
.color-legend th,
.color-legend td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.color-legend th {
    background-color: #f2f2f2;
    font-weight: bold;
}
.color-legend    {
    margin-top: 10px;
    font-style: italic;
    font-size: 0.9rem;
    color: #555;
}

.color-legend button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #3182ce;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.color-legend button:hover {
    background-color: #256aa1;
}
</style>
