    <template>
    <section class="text-center text-lg-start">
        <div class="container py-4">
        <div class="row align-items-center justify-content-center position-relative">
            <!-- Form đăng ký -->
            <div class="col-lg-5 col-md-7 mb-5 mb-lg-0 form-overlap">
            <div class="card bg-body-tertiary" style="backdrop-filter: blur(30px); margin-top: 20px;">
                <div class="card-body p-4 text-center" >
                <h2 class="fw-bold mb-4">Đăng ký</h2>
                <form @submit.prevent="DangKyUser">
                    <!-- Họ và Tên, Email -->
                    <div class="d-flex justify-content-between">
                    <div data-mdb-input-init class="form-outline mb-3 text-start" style="flex: 1; margin-right: 10px;">
                        <label class="form-label" for="form2Example17">Họ và Tên</label>
                        <input v-model="dangKy.ho_va_ten" type="text" id="form2Example17" class="form-control" required />
                    </div>
                    <div data-mdb-input-init class="form-outline mb-3 text-start" style="flex: 1; margin-left: 10px;">
                        <label class="form-label" for="form2Example18">Email</label>
                        <input v-model="dangKy.email" type="email" id="form2Example18" class="form-control" required />
                    </div>
                    </div>

                    <!-- Mật Khẩu -->
                    <div data-mdb-input-init class="form-outline mb-3 text-start">
                    <label class="form-label" for="form2Example27">Mật Khẩu</label>
                    <div style="position: relative;">
                        <input :type="showPassword ? 'text' : 'password'" v-model="dangKy.password" id="form2Example27" class="form-control" required />
                        <button type="button" @click="showPassword = !showPassword" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    </div>

                    <!-- Xác Nhận Mật Khẩu -->
                    <div data-mdb-input-init class="form-outline mb-3 text-start">
                    <label class="form-label" for="form2Example27_confirm">Xác Nhận Mật Khẩu</label>
                    <div style="position: relative;">
                        <input :type="showRePassword ? 'text' : 'password'" v-model="dangKy.re_password" id="form2Example27_confirm" class="form-control" required />
                        <button type="button" @click="showRePassword = !showRePassword" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                        <i :class="showRePassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                    </div>

                    <!-- Số Điện Thoại, Ngày Sinh -->
                    <div class="d-flex justify-content-between">
                    <div data-mdb-input-init class="form-outline mb-3 text-start" style="flex: 1; margin-right: 10px;">
                        <label class="form-label" for="form2Example19">Số Điện Thoại</label>
                        <input v-model="dangKy.so_dien_thoai" type="tel" id="form2Example19" class="form-control" required />
                    </div>
                    <div data-mdb-input-init class="form-outline mb-3 text-start" style="flex: 1; margin-left: 10px;">
                        <label class="form-label" for="form2Example20">Ngày Sinh</label>
                        <input v-model="dangKy.ngay_sinh" type="date" id="form2Example20" class="form-control" required />
                    </div>
                    </div>

                    <!-- Giới Tính -->
                    <div data-mdb-input-init class="form-outline mb-3 text-start">
                    <label class="form-label" for="form2Example19">Giới Tính</label>
                    <select v-model="dangKy.gioi_tinh" id="form2Example19" class="form-control" required>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                        <option value="2">Khác</option>
                    </select>
                    </div>

                    <!-- Submit button -->
                    <button type="submit" v-on:click="DangKyUser()" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4 w-100">
                    Đăng ký
                    </button>

                    <!-- Social login buttons -->
                    <div class="text-center">
                    <p>Hoặc đăng ký bằng:</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-google"></i>
                    </button>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-github"></i>
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>

            <!-- Image -->
            <div class="col-lg-5 col-md-7">
            <img src="/src/assets/images/Laundry.png" class="w-100 rounded-4 shadow-4 custom-img-height" alt="Sign up illustration" />
            </div>
        </div>
        </div>
    </section>
    </template>

    <script>
    import axios from 'axios';

    export default {
    data() {
        return {
        dangKy: {},
        showPassword: false,
        showRePassword: false
        };
    },
    methods: {
        DangKyUser() {
        axios
            .post("http://127.0.0.1:8000/api/nguoi-dung/dang-ky", this.dangKy)
            .then((res) => {
            if (res.data.status) {
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                this.$toast.success(thong_bao);
                localStorage.setItem('token_nguoi_dung', res.data.token);
                this.dangKy = {};
                this.$router.push('/nguoi-dung/dangnhap');
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
            });
        }
    }
    }
    </script>

    <style scoped>
    .form-overlap {
    position: relative;
    margin-right: -80px;
    z-index: 10;
    }

    @media (max-width: 991.98px) {
    .form-overlap {
        margin-right: 0;
        position: static;
        z-index: auto;
    }
    }

    .custom-img-height {
    max-height: 700px;
    object-fit: contain;
    width: 100%;
    }

    /* Adjust form elements for compactness */
    .form-control {
    font-size: 0.9rem;
    padding: 0.5rem;
    }

    .form-label {
    font-size: 0.85rem;
    }

    h2.fw-bold {
    font-size: 1.5rem;
    }

    .btn-floating {
    font-size: 0.8rem;
    }
    </style>