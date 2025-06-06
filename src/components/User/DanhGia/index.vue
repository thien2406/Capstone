<template>
  <div class="mx-0 mx-sm-auto">
    <div class="card shadow">
      <div class="card-body">
        <h5 class="text-center mb-4"><strong>Đánh giá dịch vụ thuê người giúp việc</strong></h5>
        <form class="px-2" action="">
          <p class="text-center mb-3"><strong>Bạn đánh giá dịch vụ hỗ trợ khách hàng như thế nào:</strong></p>
          <ul class="h2 so_sao justify-content-center pb-3">
            <li v-for="star in 5" :key="star" class="star" @click="setso_sao(star)" style="cursor: pointer;">
              <i :class="['fa-sm','text-primary',danhGia.so_sao >= star ? 'fas fa-star' : 'far fa-star']"></i>
            </li>
          </ul>
          <p class="text-center mb-3"><strong>Có điểm gì chúng tôi có thể cải thiện không?</strong></p>
          <div class="form-outline mb-4">
            <textarea v-model="danhGia.nhan_xet" class="form-control" id="feedbackTextarea" rows="4" placeholder="Nhập phản hồi của bạn..."></textarea>
          </div>
        </form>
      </div>
      <div class="card-footer text-end">
        <button @click="danhGiaDonHang()" type="button" class="btn btn-primary">
          Gửi đánh giá
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      danhGia: {
        so_sao: 0,
      },
    };
  },
  methods: {
    setso_sao(star) {
      this.danhGia.so_sao = star;
    },
    danhGiaDonHang() {
      const idDonHang = this.$route.params.id_don_hang;
      axios
        .post(`http://127.0.0.1:8000/api/nguoi-dung/danh-gia/create/${idDonHang}`, this.danhGia, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
          }
        })
        .then((res) => {
          if (res.data.status) {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '</span>';
            this.$toast.success(thong_bao);
            this.$router.push({
                            path: "/"
                        });
          } else {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '</span>';
            this.$toast.error(thong_bao);
          }
        })
        .catch((error) => {
          console.log('Error in changeStatus:', error.response);
          var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + error.response.data.message + '</span>';
          this.$toast.error(thong_bao);
        });
    },
  },
};
</script>
<style>
.card {
  border-radius: 15px;
}

.star i {
  font-size: 24px;
  /* Điều chỉnh kích thước của biểu tượng sao nếu cần */
}

.so_sao {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  /* Đảm bảo căn giữa ngôi sao */
  gap: 10px;
  /* Tạo khoảng cách giữa các ngôi sao */
}

.star {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  transition: color 0.3s;
}

.star:hover,
.star:hover~.star {
  color: #ffcc00;
  /* Màu vàng khi hover */
}

/* Tooltip */
.star::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 120%;
  /* Hiển thị tooltip phía trên ngôi sao */
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.star:hover::after {
  opacity: 1;
  /* Hiển thị tooltip khi hover */
}
</style>