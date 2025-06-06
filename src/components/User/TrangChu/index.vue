<template>
    <div class="container">
<div class="col-lg-9" style="padding: 0; margin: -85px 0px 0px -120px; width: 99.25vw;">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="height: 100vh; width: 99.25vw;">
        <div class="carousel-inner" style="height: 110vh; width: 99.25vw; object-fit: cover;">   
            <div class="carousel-item active" data-bs-interval="3000">
                <img src="/src/assets/images/introductiory for.jpg" 
                    style="height: 100vh; width: 99.25vw; object-fit: cover;" alt="Slide 1">
            </div>
        </div>
    </div>
</div>

        <div class="card shadow-lg border-0" style="border: 0.5px solid #999999; border-radius: 10px; padding: 5px;margin-top: 20px;">
            <div class="row mt-2" style="text-align: center;">
                <h2><b>Dịch Vụ Của Chúng Tôi</b></h2>
            </div>
            <div style="display: flex; justify-content: space-around; padding: 20px; gap: 20px; flex-wrap: nowrap;">
                <template v-for="(value, index) in Dichvu" :key="index">
                    <div style="text-align: center; padding: 10px; border: 1px solid #e5e5e5; border-radius: 10px; width: 300px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;"
                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0px 8px 15px rgba(0, 0, 0, 0.2)';"
                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)';">
                        <div class="service-icon-wrapper">
          <i v-if="value.id === 1" class="fa-solid fa-clock service-icon" ></i>
          <i v-else-if="value.id === 2" class="fa-solid fa-calendar-alt service-icon" ></i>
          <i v-else class="fa-solid fa-broom service-icon"></i>
        </div>                      
                        <h2 style="color: #333333; font-size: 24px; margin-top: 10px;">{{ value.ten_lua_chon }}</h2>
                        <router-link :to="{
                            path: value.id === 1
                                ? `/nguoi-dung/donhangtheogio/` + value.id + `-` + value.slug_dich_vu
                                : value.id === 2
                                    ? `/nguoi-dung/donhangdinhky/` + value.id + `-` + value.slug_dich_vu
                                    : `/nguoi-dung/donhangtongvesinh/` + value.id + `-` + value.slug_dich_vu
                        }">
                            <div style="display: inline-block; background-color: #46DFB1; color: white; padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;"
                                onmouseover="this.style.backgroundColor='#15919B';"
                                onmouseout="this.style.backgroundColor='#46DFB1';">
                                Đặt dịch vụ ngay
                            </div>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
        <!-- <div class="row mt-4">
            <div class="col-lg-12">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="fw-bold">
                                <i class="fa-solid fa-fire text-danger"></i> Danh sách nhân viên Flash Sale của tuần
                            </h4>
                            <a href="" class="fs-5 text-primary">Xem tất cả</a>
                        </div>
                        <hr>
                        <div class="card-container">
                            <template v-for="(value, index) in nvflash_sale" :key="index">
                                <div class="col-md-3 col-sm-6">
                                    <div class="card h-100 shadow-sm">
                                        <img v-bind:src="value.hinh_anh"
                                            class="card-img-top rounded-circle mx-auto mt-4"
                                            style="width: 150px; height: 150px;" alt="...">
                                        <div class="card-body text-center">
                                            <h6 class="fw-bold">{{ value.ho_va_ten }}</h6>
                                            <p>{{ value.tuoi_nhan_vien }} Tuổi || Kinh Nghiệm {{ value.kinh_nghiem }}
                                            </p>

                                            <div class="star-rating">
                                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                                <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                                <i class="fa-solid fa-star-half-alt" style="color: #FFD43B;"></i>
                                            </div>
                                            <a href="" class="text-primary mt-2 d-block"><b>XEM CHI TIẾT</b></a>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

        </div> -->
        
        <div class="row mt-4">
            <div class="col-lg-12">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="fw-bold">
                                <i class="fa-solid fa-fire text-danger"></i> Danh sách nhân viên nổi bật của tuần
                            </h4>
                            <a href="" class="fs-5 text-primary">Xem tất cả</a>
                        </div>
                        <hr>
                        <div class="card-container">
                            <template v-for="(value, index) in nvnoibat" :key="index">
                                <div class="col-md-3 col-sm-6">
                                    <div class="card h-100 ">
                                        <img v-bind:src="value.hinh_anh"
                                            class="card-img-top rounded-circle mx-auto mt-4"
                                            style="width: 150px; height: 150px;" alt="...">
                                        <div class="card-body text-center">
                                            <h6 class="fw-bold">{{ value.ho_va_ten }}</h6>
                                            <p class="no-wrap">{{ value.tuoi_nhan_vien }} Tuổi || Kinh Nghiệm {{
                                                value.kinh_nghiem }}</p>
                                            <div class="star-rating">
                                                <!-- Hiển thị sao được đánh giá -->
                                                <template v-for="n in Math.min(value.tong_so_sao, 5)"
                                                    :key="'filled-' + n">
                                                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                                                </template>
                                                <!-- Hiển thị sao chưa được đánh giá -->
                                                <template v-for="n in (5 - Math.min(value.tong_so_sao, 5))"
                                                    :key="'empty-' + n">
                                                    <i class="fa-regular fa-star" style="color: #FFD43B;"></i>
                                                </template>
                                            </div>
                                            <router-link :to="`/nguoi-dung/chitietnhanvien/` + value.id">
                                                <a href="/nguoi-dung/chitietnhanvien"
                                                    class="text-primary mt-2 d-block"><b>XEM CHI TIẾT</b></a>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Tự tin với lựa chọn của bạn</h2>
        </div>
        <div class="custom-image-box-container-wrapper">
            <div class="custom-image-box-container">
                <div class="custom-image-box-wrapper">
                    <figure class="custom-image-box-img">
                        <img width="334" height="334" src="/src/assets/images/badge-time-clock.png"
                            alt="badge-time-clock" loading="lazy" />
                    </figure>
                    <div class="custom-image-box-content">
                        <h3 class="custom-image-box-title">Đặt lịch linh hoạt</h3>
                        <p class="custom-image-box-description">
                            Thao tác dễ dàng, chỉ cần vài phút trên ứng dụng, bạn có thể đặt người giúp việc theo nhu
                            cầu với thời gian linh hoạt nhất.
                        </p>
                    </div>
                </div>
            </div>

            <div class="custom-image-box-container">
                <div class="custom-image-box-wrapper">
                    <figure class="custom-image-box-img">
                        <img width="334" height="334" src="/src/assets/images/badge-pay.png" alt="badge-time-clock"
                            loading="lazy" />
                    </figure>
                    <div class="custom-image-box-content">
                        <h3 class="custom-image-box-title">Giá cả minh bạch
                        </h3>
                        <p class="custom-image-box-description">
                            Giá dịch vụ rõ ràng, được hiển thị minh bạch trên ứng dụng. Bạn không cần lo lắng về bất kỳ
                            khoản phí ẩn nào.
                        </p>
                    </div>
                </div>
            </div>

            <div class="custom-image-box-container">
                <div class="custom-image-box-wrapper">
                    <figure class="custom-image-box-img">
                        <img width="334" height="334" src="/src/assets/images/badge-service.png" alt="badge-time-clock"
                            loading="lazy" />
                    </figure>
                    <div class="custom-image-box-content">
                        <h3 class="custom-image-box-title">Đa dạng dịch vụ</h3>
                        <p class="custom-image-box-description">
                            Chúng tôi cung cấp nhiều loại hình dịch vụ từ dọn dẹp nhà cửa,
                            giặt giũ , đáp ứng mọi nhu cầu của gia đình bạn.
                        </p>
                    </div>
                </div>
            </div>
            <div class="custom-image-box-container">
                <div class="custom-image-box-wrapper">
                    <figure class="custom-image-box-img">
                        <img width="334" height="334" src="/src/assets/images/badge-insurrance.png"
                            alt="badge-time-clock" loading="lazy" />
                    </figure>
                    <div class="custom-image-box-content">
                        <h3 class="custom-image-box-title">An toàn và đáng tin cậy</h3>
                        <p class="custom-image-box-description">
                            Người giúp việc được duyệt kỹ càng với hồ sơ lý lịch rõ ràng . Đội ngũ giám sát
                            đảm bảo quá trình làm việc diễn ra an toàn và hiệu quả.
                        </p>
                    </div>
                </div>
            </div>


        </div>
        <h2 class="">Quy Trình Sử Dụng Dịch Vụ</h2>
        <div class="container py-5">

            <div class="row gy-4">
                <div class="col-md-3 col-sm-6">
                    <div class="card step-card text-center">
                        <div class="step-number">1</div>
                        <img src="/src/assets/images/Anh04.png" alt="Chọn Dịch Vụ"
                            class="card-img-top img-large mx-auto mt-3" />
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Chọn Dịch Vụ</h5>
                            <p class="card-text text-muted">Chúng tôi có nhiều dịch vụ tiến hành hỗ trợ bạn và đồng hành
                                với bạn
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="card step-card text-center">
                        <div class="step-number">2</div>
                        <img src="/src/assets/images//vitri.png" alt="Chọn Thời Gian Và Vị Trí"
                            class="card-img-top img-large mx-auto mt-3" />
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Chọn Thời Gian Và Vị Trí</h5>
                            <p class="card-text text-muted">
                                Xác định ngày, giờ và địa điểm để đặt dịch vụ House Keeper trong vòng chưa đầy 60 giây.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="card step-card text-center">
                        <div class="step-number">3</div>
                        <img src="/src/assets/images/Qt02.jpg" alt="Tiến Hành Công Việc"
                            class="card-img-top img-large mx-auto mt-3" />
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Tiến Hành Công Việc</h5>
                            <p class="card-text text-muted">
                                Người giúp việc gia đình/đối tác sẽ xác nhận đến nhà bạn như đã hẹn và thực hiện nhiệm
                                vụ.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="card step-card text-center">
                        <div class="step-number">4</div>
                        <img src="/src/assets/images/Qt04.png" alt="Đánh giá và xếp hạng"
                            class="card-img-top img-large mx-auto mt-3" />
                        <div class="card-body">
                            <h5 class="card-title fw-bold">Đánh Giá và Xếp Hạng</h5>
                            <p class="card-text text-muted">
                                Bạn có thể đánh giá chất lượng dịch vụ thông qua ứng dụng House Keeper.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="text-center text-lg-start bg-body-tertiary text-muted">
            <!-- Mạng Xã Hội -->
            <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div>
                    <a href="https://www.facebook.com" class="me-4 text-reset"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.twitter.com" class="me-4 text-reset"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com" class="me-4 text-reset"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com" class="me-4 text-reset"><i class="fab fa-linkedin"></i></a>
                </div>
            </section>
            <section class="container text-center text-md-start mt-5">
                <div class="row mt-3">
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4"><i class="fas fa-gem me-3"></i>House Keeper</h6>
                        <p>Chúng tôi cung cấp dịch vụ giúp việc gia đình chuyên nghiệp và đáng tin cậy, giúp bạn giải
                            quyết công việc nhà một cách tiện lợi. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng
                            tôi.</p>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Dịch vụ</h6>
                        <p><a href="#!" class="text-reset">Dọn Dẹp Định Kì</a></p>
                        <p><a href="#!" class="text-reset">Dọn Dẹp Tổng Quát</a></p>
                        <p><a href="#!" class="text-reset">Dọn Dẹp Ghế Sofa</a></p>
                        <p><a href="#!" class="text-reset"></a></p>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Liên kết hữu ích</h6>
                        <p><a href="#!" class="text-reset">Bảng giá</a></p>
                        <p><a href="#!" class="text-reset">Câu hỏi thường gặp</a></p>
                        <p><a href="#!" class="text-reset">Đánh giá khách hàng</a></p>
                        <p><a href="#!" class="text-reset">Liên hệ hỗ trợ</a></p>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Liên hệ</h6>
                        <p><i class="fas fa-home me-3"></i>123 Đường Chính, Đà Nẵng, Việt Nam</p>
                        <p><i class="fas fa-envelope me-3"></i>hotro@congtyban.com</p>
                        <p><i class="fas fa-phone me-3"></i>+84 123 456 789</p>
                    </div>
                </div>
            </section>
            <!-- <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2024 Bản quyền thuộc về:
    <a class="text-reset fw-bold" href=""></a>
  </div> -->
        </footer>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            nvnoibat: [],
            Dichvu: [],
            nvflash_sale: [],
        };
    },
    mounted() {
        this.loadnoibat();
        this.loaddichvu();
        this.loadplash_sale();
    },
    methods: {
        loaddichvu() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/get-Data-Dich-Vu")
                .then((res) => {
                    this.Dichvu = res.data.data;
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
                });
        },
        loadnoibat() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/get-Data-Nhan-Vien-Noi-Bat")
                .then((res) => {
                    this.nvnoibat = res.data.data.map(item => {
                        // Chuyển sang kiểu số
                        let soSao = parseInt(item.tong_so_sao);
                        // Nếu chưa có hoặc bằng 0 => mặc định 5
                        if (isNaN(soSao) || soSao === 0) {
                            soSao = 5;
                        }
                        item.tong_so_sao = soSao;
                        return item;
                    });
                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên nổi bật:", error);
                });
        },
        loadplash_sale() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/get-Data-NhanVien-Flash-Sale")
                .then((res) => {
                    this.nvflash_sale = res.data.data;

                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên:", error);
                });
        },
    },
}
</script>
<style scoped>
.no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.step-card {
    border: none;
    border-radius: 10px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.step-number {
    width: 60px;
    height: 60px;
    line-height: 60px;
    background-color: #09D1C7;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 50%;
    margin: auto;
    position: relative;
    top: -30px;
}

.card-img-top {
    max-width: 120px;
    height: auto;
}

.card-title {
    margin-top: 10px;
    font-size: 1.2rem;
}

.card-text {
    font-size: 0.9rem;
    color: #6c757d;
}

h2 {
    color: #343a40;
}

.card-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: 1rem;

}

.card-container::-webkit-scrollbar {
    height: 8px;
}

.card-container::-webkit-scrollbar-thumb {
    background-color: #d1d1d1;
    border-radius: 4px;
}

.card-container::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

.card {
    border: none;
    border-radius: 15px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
    padding: 1.5rem;
}

.card-img-top {
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.fw-bold {
    font-weight: bold;
    font-size: 1.2rem;
}

h6 {
    font-size: 1.1rem;
    color: #333;
}

p {
    color: #666;
}

.text-primary {
    color: #007bff;
}

.text-primary:hover {
    color: #0056b3;
}

.text-center {
    text-align: center;
}

.mt-2 {
    margin-top: 0.5rem;
}

.fs-6 {
    font-size: 0.875rem;
}

.fa-star,
.fa-star-half-alt {
    font-size: 18px;
}

.card-shadow-sm {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.g-4 {
    gap: 1.5rem;
}

.custom-image-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.custom-image-box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.custom-image-box-container-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
}

.custom-image-box-container {
    flex: 1;
    max-width: 300px;
    /* Bạn có thể điều chỉnh kích thước tối đa của mỗi thẻ */
}

.custom-image-box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.custom-image-box-wrapper:hover {
    transform: translateY(-5px);
}

.custom-image-box-img img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.custom-image-box-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 15px;
}

.custom-image-box-description {
    font-size: 14px;
    color: #666;
    max-width: 250px;
    margin-top: 10px;
}

.carousel-item {
    transition: transform 1s ease-in-out;
    /* Thời gian chuyển slide là 1 giây, bạn có thể điều chỉnh */
}

</style>
