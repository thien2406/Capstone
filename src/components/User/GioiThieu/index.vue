<!-- src/components/User/GioiThieu/index.vue -->
<template>
    <div class="bg-light" style="margin-top: -110px;">
        <section class="py-5" >
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-md-6">
                        <h2 class="fw-bold">Tổng Quan</h2>
                        <p>
                            Thành lập năm <strong>2025</strong>, <em>Dịch Vụ Giúp Việc HouseKeeper</em> hoạt động trong
                            lĩnh vực cung cấp dịch vụ hỗ trợ gia đình như giúp việc nhà, nấu ăn, chăm sóc trẻ nhỏ...
                        </p>
                        <p>
                            Với mong muốn trở thành người bạn đồng hành đáng tin cậy cho mọi gia đình Việt, chúng tôi
                            không ngừng đổi mới và nâng cao chất lượng dịch vụ.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="" alt="" class="img-fluid rounded shadow-sm" />
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5 bg-white">
            <div class="container">
                <div class="row g-4 text-center">
                    <div class="col-md-6">
                        <i class="fas fa-bullseye fa-3x text-primary mb-3"></i>
                        <h3 class="fw-bold">Sứ Mệnh</h3>
                        <p>
                            Mang đến giải pháp giúp việc tiện lợi, an toàn và tận tâm, giúp các gia đình tiết kiệm thời
                            gian và tận hưởng cuộc sống.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <i class="fas fa-eye fa-3x text-primary mb-3"></i>
                        <h3 class="fw-bold">Tầm Nhìn</h3>
                        <p>
                            Trở thành nền tảng giúp việc hàng đầu tại Việt Nam, gắn kết cộng đồng và xây dựng hệ sinh
                            thái dịch vụ gia đình hiện đại.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-5 bg-light achievements-section">
            <div class="container text-center">
                <h2 class="fw-bold mb-4">Thành Tựu & Sự Tin Tưởng</h2>
                <div class="row g-4">
                    <div class="col-md-3 achievement">
                        <h1 class="text-primary fw-bold">{{ counters.satisfiedCustomers }} +</h1>
                        <p>Khách hàng hài lòng</p>
                    </div>
                    <div class="col-md-3 achievement">
                        <h1 class="text-primary fw-bold">{{ counters.yearsExperience }}+</h1>
                        <p>Năm kinh nghiệm</p>
                    </div>
                    <div class="col-md-3 achievement">
                        <h1 class="text-primary fw-bold">{{ counters.trainedHelpers }}+</h1>
                        <p>Giúp việc được đào tạo</p>
                    </div>
                    <div class="col-md-3 achievement">
                        <h1 class="text-primary fw-bold">{{ counters.retentionRate }}%</h1>
                        <p>Tỉ lệ giữ chân khách hàng</p>
                    </div>
                </div>
            </div>
        </section>


        <section class="py-5">
            <div class="container">
                <h2 class="text-center fw-bold mb-5">Đội Ngũ Chủ Chốt</h2>
                <div class="row g-4 text-center">
                    <div class="col-md-4">
                        <img src="/src/assets/images/Anh04.png" class="rounded-circle mb-3" width="150" height="150"
                            alt="" />
                        <h5 class="fw-bold">Nguyễn Văn Thiện</h5>
                        <p>Quản lý Dịch Vụ</p>
                    </div>
                    <div class="col-md-4">
                        <img src="/src/assets/images/Anh04.png" class="rounded-circle mb-3" width="150" height="150"
                            alt="" />
                        <h5 class="fw-bold">Trần Thanh Phúc</h5>
                        <p>Chuyên viên Hỗ trợ Khách hàng</p>
                    </div>
                    <div class="col-md-4">
                        <img src="/src/assets/images/Anh04.png" class="rounded-circle mb-3" width="150" height="150"
                            alt="" />
                        <h5 class="fw-bold">Nguyễn Thanh Tùng</h5>
                        <p>Điều phối viên</p>
                    </div>
                </div>
            </div>
        </section>


        <div class="container">
            <h2 class="text-center fw-bold mb-5">Giá Trị Cốt Lõi & Văn Hóa</h2>
            <div class="row g-4 text-center">
                <div class="col-md-3">
                    <i class="fas fa-heart fa-2x text-primary mb-2"></i>
                    <h6 class="fw-bold">Tận Tâm</h6>
                    <p>Luôn đặt lợi ích của khách hàng lên hàng đầu.</p>
                </div>
                <div class="col-md-3">
                    <i class="fas fa-users fa-2x text-primary mb-2"></i>
                    <h6 class="fw-bold">Tôn Trọng</h6>
                    <p>Tôn trọng khách hàng, đồng nghiệp và chính mình.</p>
                </div>
                <div class="col-md-3">
                    <i class="fas fa-lightbulb fa-2x text-primary mb-2"></i>
                    <h6 class="fw-bold">Đổi Mới</h6>
                    <p>Không ngừng cải tiến để phục vụ tốt hơn mỗi ngày.</p>
                </div>
                <div class="col-md-3">
                    <i class="fas fa-shield-alt fa-2x text-primary mb-2"></i>
                    <h6 class="fw-bold">Trách Nhiệm</h6>
                    <p>Cam kết với chất lượng dịch vụ và đạo đức nghề nghiệp.</p>
                </div>
            </div>
        </div>
        <section class="py-5 text-center bg-light">
            <div class="container" style="height: 50vh;">
                <h2 class="fw-bold mb-4">Vị Trí Hiện Tại</h2>
                <Map />
            </div>
        </section>
    </div>
    <footer class="text-center text-lg-start bg-body-tertiary text-muted">

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
    </footer>
</template>
<script>
import Map from "./Map.vue";

export default {
    components: {
        Map,
    },
    data() {
        return {
            counters: {
                satisfiedCustomers: 0,
                yearsExperience: 0,
                trainedHelpers: 0,
                retentionRate: 0,
            },
            targets: {
                satisfiedCustomers: 500,
                yearsExperience: 5,
                trainedHelpers: 1000,
                retentionRate: 98,
            },
        };
    },
    mounted() {
        this.startCounters();
    },
    methods: {
        startCounters() {
            Object.keys(this.counters).forEach((key) => {
                this.animateCounter(key, this.targets[key]);
            });
        },
        animateCounter(key, target) {
            let current = 0;
            const increment = target / 100; // Tốc độ tăng

            const update = () => {
                if (current < target) {
                    current += increment;
                    this.counters[key] = Math.ceil(current);
                    setTimeout(update, 20);
                } else {
                    this.counters[key] = target;
                }
            };

            update();
        },
    },
};
</script>

<style scoped>
.achievements-section {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.achievement {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInItem 1s forwards;
    animation-delay: 0.5s;
}

@keyframes fadeInItem {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    font-size: 2.5rem;
}
</style>