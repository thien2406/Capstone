<template>
  <div class="card card-large radius-10 overflow-hidden" style="margin-top: -70px;">
    <div class="card-body" >
      <!-- Tiêu đề card lớn -->
      <div class="card-header" >
        <h2>Thông tin tổng quan</h2>
      </div>
      <div class="row">
        <!-- Widget: Số lượng công việc hôm nay -->
        <div class="col">
          <div class="widget">
            <div class="d-flex align-items-center">
              <div>
                <p class="mb-0">Số lượng công việc thực hiện</p>
                <h5 class="mb-0">{{ soLuongCV }} công việc </h5>
              </div>
              <div class="ms-auto">
                <i class="bx bx-calendar font-30"></i>
              </div>
            </div>
            <div class="progress radius-10 mt-4" style="height:4.5px;">
              <div class="progress-bar bg-primary" role="progressbar" style="width: 80%"></div>
            </div>
          </div>
        </div>

        <!-- Widget: Số giờ đã làm việc -->
        <div class="col">
          <div class="widget">
            <div class="d-flex align-items-center">
              <div>
                <p class="mb-0">Số giờ làm việc đến hiện tại</p>
                <h5 class="mb-0">{{ formatDecimal(soGioLamViec) }} giờ</h5>
              </div>
              <div class="ms-auto">
                <i class="bx bx-time-five font-30"></i>
              </div>
            </div>
            <div class="progress radius-10 mt-4" style="height:4.5px;">
              <div class="progress-bar bg-success" role="progressbar" style="width: 70%"></div>
            </div>
          </div>
        </div>

        <!-- Widget: Thu nhập -->
        <div class="col">
          <div class="widget">
            <div class="d-flex align-items-center">
              <div>
                <p class="mb-0">Thu nhập hiện tại</p>
                <h5 class="mb-0">{{ formatVNDd(tongThuNhap) }}</h5>
              </div>
              <div class="ms-auto">
                <i class="bx bx-dollar font-30"></i>
              </div>
            </div>
            <div class="progress radius-10 mt-4" style="height:4.5px;">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 90%"></div>
            </div>
          </div>
        </div>

        <!-- Widget: Đánh giá từ khách hàng -->
        <div class="col">
          <div class="widget">
            <div class="d-flex align-items-center">
              <div>
                <p class="mb-0">Đánh giá từ khách hàng</p>
                <h5 class="mb-0">{{ roundedTongSoSao }} / 5</h5>
              </div>
              <div class="ms-auto">
                <i class="bx bx-star font-30"></i>
              </div>
            </div>
            <div class="progress radius-10 mt-4" style="height:4.5px;">
              <div class="progress-bar bg-info" role="progressbar" style="width: 95%"></div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-5">
                  <div class="input-group">
                    <span class="input-group-text">Từ ngày</span>
                    <input v-model="dl.tu_ngay" type="date" class="form-control">
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="input-group">
                    <span class="input-group-text">Đến ngày</span>
                    <input v-model="dl.den_ngay" type="date" class="form-control">
                  </div>
                </div>
                <div class="col-lg-2">
                  <button v-on:click="sendBE()" class="btn btn-primary w-100">Thống Kê</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Thống Kê Thu Nhập Theo Tháng.
          </div>
          <div class="card-body">
            <Bar v-if="is_load" :data="chartData" />
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
        Bar
    },
  data() {
    return {
      soLuongCV: 0,
      soGioLamViec: 0,
      tongThuNhap:0,
      tongSoSao:0,
      dl    : {},
            is_load: false,
            chartData   : null,
            chartData   : {
                labels: [],
                datasets: [ 
                    {
                        label: 'Thống Kê',
                        backgroundColor: [
                            "#C0392B", "#1ABC9C", "#F1C40F", "#E67E22", "#8E44AD", "#2980B9", "#27AE60"
                        ],
                        data: []
                    }
                 ]
            },
            chartOptions: {
                responsive: true
            }
    }
  },
  computed: {
  roundedTongSoSao() {
    return Number.isInteger(this.tongSoSao)
      ? this.tongSoSao
      : this.tongSoSao.toFixed(2);
},
  },
  mounted() {
    this.getSoLuongCV();
    this.getSoGioLamViec();
    this.getTongThuNhap();
    this.getTongSoSao();
  },
  methods: {
    getSoLuongCV() {
      axios
        .get("http://127.0.0.1:8000/api/nhan-vien/thong-ke/so-luong-cv", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
          }
        })
        .then((res) => {
          if (res.data.data) {
            this.soLuongCV = res.data.data;
            console.log("vi data: " + JSON.stringify(this.soLuongCV));

          }
        })
        .catch((errors) => {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
            this.$toast.error(thong_bao);
          });
        })
    },
    formatDecimal(value) {
      if (!value) return value; // Trả về giá trị gốc nếu không hợp lệ
      return parseFloat(value).toString(); // Loại bỏ số 0 không cần thiết ở cuối
    },
    getSoGioLamViec() {
      axios
        .get("http://127.0.0.1:8000/api/nhan-vien/thong-ke/so-gio-lam-viec", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
          }
        })
        .then((res) => {
          if (res.data.data) {
            this.soGioLamViec = res.data.data;
            console.log("vi data: " + JSON.stringify(this.soGioLamViec));

          }
        })
        .catch((errors) => {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
            this.$toast.error(thong_bao);
          });
        })
    },
    sendBE() {
            this.is_load = false;
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/thong-ke/thong-ke-thu-nhap", this.dl, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                    var array_ngay_thang = res.data.array_ngay_thang;
                    var array_tong_thu_nhap = res.data.array_tong_thu_nhap;
                    this.chartData.labels = array_ngay_thang;
                    this.chartData.datasets[0].data = array_tong_thu_nhap;
                    this.is_load = true;
                })
        },
    formatVNDd(value) {
            if (!value || isNaN(Number(value))) {
                value = 0;
            }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
    getTongThuNhap() {
      axios
        .get("http://127.0.0.1:8000/api/nhan-vien/thong-ke/thu-nhap-hien-tai", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
          }
        })
        .then((res) => {
          if (res.data.data) {
            this.tongThuNhap = res.data.data;
            console.log("vi data: " + JSON.stringify(this.tongThuNhap));

          }
        })
        .catch((errors) => {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
            this.$toast.error(thong_bao);
          });
        })
    },
    getTongSoSao() {
      axios
        .get("http://127.0.0.1:8000/api/nhan-vien/thong-ke/danh-gia-tu-khach-hang", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
          }
        })
        .then((res) => {
          if (res.data.data) {
            this.tongSoSao = res.data.data;
            console.log("vi data: " + JSON.stringify(this.tongSoSao));

          }
        })
        .catch((errors) => {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
            this.$toast.error(thong_bao);
          });
        })
    },
  },
}
</script>
<style scoped>
/* Card lớn bao quanh tất cả các widget */
.card-large {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Tiêu đề của card lớn */
.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.card-header h2 {
  font-size: 24px;
  color: #333;
}

.card-header p {
  font-size: 16px;
  color: #666;
}

/* Bố cục cho các widget */
.row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.col {
  flex: 1 1 20%;
  min-width: 200px;
}

/* Thiết kế từng widget */
.widget {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
}

.widget:hover {
  transform: translateY(-5px);
}

.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-0 {
  margin-bottom: 0;
}

.ms-auto {
  margin-left: auto;
}

.progress {
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  height: 4.5px;
}

.progress-bar {
  height: 4.5px;
}

.font-30 {
  font-size: 30px;
}

.bg-primary {
  background-color: #0d6efd;
}

.bg-success {
  background-color: #28a745;
}

.bg-warning {
  background-color: #ffc107;
}

.bg-info {
  background-color: #17a2b8;
}
</style>