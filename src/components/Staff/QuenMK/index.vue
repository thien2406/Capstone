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
            <h2 class="fw-bold mb-3">Quên Mật Khẩu</h2>
            <form>

                <div class="form-outline mb-3 text-start">
                  <label class="form-label" for="email">Email:</label>
                  <input
                    v-model="nhan_vien.email"
                    type="email"
                    id="email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="button-container mb-4">
                   <button v-on:click="guiMail()" data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-dark btn-lg btn-block" type="button">Xác Nhận
                        </button>
                  <router-link to="/nhan-vien/dangnhap" class="btn btn-light btn-block">
                    <i class="bx bx-arrow-back mr-1"></i>Quay lại trang đăng nhập
                  </router-link>
                </div>
                            
            </form>
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
 import axios from 'axios'
 
 export default {
     data() {
         return {
             nhan_vien : {},
         }
     },
     methods: {
         guiMail(){
             axios
                 .post("http://127.0.0.1:8000/api/nhan-vien/quen-mat-khau", this.nhan_vien)
                 .then((res) => {
                     if (res.data.status) {
                         var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                         this.$toast.success(thong_bao);
                         this.$router.push('/nhan-vien/dangnhap')
                     } else {
                         var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                         this.$toast.error(thong_bao);
                         this.$router.push('/nhan-vien/dangky');
 
                     }
                 })
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