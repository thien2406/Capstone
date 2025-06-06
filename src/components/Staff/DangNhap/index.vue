<template>
  <section class="text-center text-lg-start">
    <div class="container py-4">
      <div class="row align-items-center justify-content-center position-relative">
        <!-- Form đăng nhập -->
        <div
          class="col-lg-5 col-md-7 mb-5 mb-lg-0 form-overlap"
        >
          <div
            class="card bg-body-tertiary"
            style="backdrop-filter: blur(30px);"
          >
            <div class="card-body p-4 text-center">
              <h2 class="fw-bold mb-4">Đăng nhập</h2>
              <form @submit.prevent="DangNhap">
                <div class="form-outline mb-3 text-start">
                  <label class="form-label" for="email">Email:</label>
                  <input
                    v-model="tai_khoan.email"
                    type="email"
                    id="email"
                    class="form-control"
                    required
                  />
                </div>

                <div class="form-outline mb-3 text-start">
                  <label class="form-label" for="password">Mật khẩu:</label>
                  <input
                    v-model="tai_khoan.password"
                    type="password"
                    id="password"
                    class="form-control"
                    required
                  />
                </div>


                <button type="submit" v-on:click="dangNhap()" class="btn btn-primary btn-block mb-4 w-100">
                  Đăng nhập
                </button>
            <div class="link-container">
                  <router-link to="/nhan-vien/quenmatkhau">
                    <p>Quên Mật Khẩu?</p>
                  </router-link>
                </div>
                <div class="text-center">
                  <p>Hoặc đăng nhập bằng:</p>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                  </button>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                  </button>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                  </button>
                  <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

            <div class="col-lg-5 col-md-7">
            <img
                src="/src/assets/images/Laundry.png"
                class="w-100 rounded-4 shadow-4 custom-img-height"
                alt="Sign in illustration"
            />
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
            tai_khoan: {}
        }
    },
    methods: {
        dangNhap() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/dang-nhap", this.tai_khoan)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        localStorage.setItem('token_nhan_vien', res.data.token);
                        this.$router.push('/nhan-vien/trangchu');
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        }
    },
}
</script>
<style scoped>

    .cascading-right {
      margin-right: -50px;
    }

    @media (max-width: 991.98px) {
      .cascading-right {
        margin-right: 0;
      }
    }

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
.link-container {
  display: flex;
  justify-content: center;
  gap: 5px;
}

/* Style for the links */
.link-container a p {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  margin: 0;
}
</style>