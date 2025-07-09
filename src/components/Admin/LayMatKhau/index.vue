<template >
<section class="text-center text-lg-start">
  <!-- Jumbotron -->
  <div class="container py-4">
    <div class="row align-items-center justify-content-center position-relative">
      <div class="col-lg-5 col-md-7 mb-5 mb-lg-0 form-overlap">
        <div class="card bg-body-tertiary" style="
            backdrop-filter: blur(30px);
            width: 540px;
            margin-left: 70px;

            ">
          <div class="card-body p-5 shadow-5" >
                                                 <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Lấy Lại Mật Khẩu</h5>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example17">Mật Khẩu Mới</label>

                                        <!-- Wrapper cho input và icon hiện/ẩn mật khẩu -->
                                        <div style="position: relative;">
                                            <input :type="showNewPassword ? 'text' : 'password'"
                                                v-model="admin.password" id="form2Example17"
                                                class="form-control form-control-lg" />
                                            <button type="button" @click="showNewPassword = !showNewPassword"
                                                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                                                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example17_confirm">Xác Nhận Mật Khẩu</label>

                                        <!-- Wrapper cho input và icon hiện/ẩn mật khẩu xác nhận -->
                                        <div style="position: relative;">
                                            <input :type="showConfirmPassword ? 'text' : 'password'"
                                                v-model="admin.re_password" id="form2Example17_confirm"
                                                class="form-control form-control-lg" />
                                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                                                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="pt-1 mb-4">
                                        <button v-on:click="doiMatKhau()" data-mdb-button-init data-mdb-ripple-init
                                            class="btn btn-dark btn-lg btn-block" type="button">Thay Đổi Mật
                                            Khẩu</button>
                                    </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 mb-5 mb-lg-0">
        <img src="/src/assets/images/Laundry.png" class="w-100 rounded-4 shadow-4 custom-img-height"
          alt="" />
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
</template>
<script>
import axios from 'axios';

export default {
    props: ['hash_reset'],
    data() {
        return {
            admin: {
                'hash_reset': this.$route.params.hash_reset
            },
            showNewPassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        doiMatKhau() {
            axios
                .post("http://127.0.0.1:8000/api/admin/doi-mat-khau", this.admin)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/admin/dangnhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/admin/dangnhap');
                    }
                })
                .catch((res) => {
                    var list = Object.values(res.response.data.errors);
                    list.forEach((v, k) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + v[0] + '<span>';
                        this.$toast.error(thong_bao);
                    });
                });
        },
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
  margin-right: -50px;
  z-index: 10; 
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

.link-container a p:hover {
  color: #0056b3;
  text-decoration: underline;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.button-container .btn {
  flex: 1;
  font-size: 0.9rem;
  padding: 0.5rem;
}   
</style>