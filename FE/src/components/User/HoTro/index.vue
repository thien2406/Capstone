<template>
  <div class="card shadow-sm chat-interface p-0" style="margin-top: -50px">
    <div class="card-header bg-light border-bottom d-flex align-items-center">
      <div>
        <h4 class="mb-0">{{ infoAdmin.ho_va_ten }}</h4>
        <div class="d-flex align-items-center mt-1">
          <small :class="{
            'bg-success rounded-circle d-inline-block me-2': infoAdmin.tinh_trang === 1,
            'bg-danger rounded-circle d-inline-block me-2': infoAdmin.tinh_trang !== 1
          }" style="width: 10px; height: 10px;"></small>
          <span class="text-muted">
            {{ infoAdmin.tinh_trang === 1 ? 'Online' : 'Offline' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Nội dung tin nhắn -->
    <div class="card-body chat-content-wrapper overflow-auto" style="height: 350px;">
      <!-- Trường hợp không có tin nhắn -->
      <template v-if="chiTietTroChuyen.length === 0">
        <p class="text-center text-muted">Không có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
      </template>

      <!-- Vòng lặp hiển thị tin nhắn -->
      <template v-for="message in chiTietTroChuyen" :key="message.id">
        <!-- Tin nhắn người gửi (bên phải) -->
        <div v-if="message.sender_type == 1" class="d-flex flex-column align-items-end mb-2">
          <div class="p-2 bg-primary text-white rounded-3 shadow-sm">
            {{ message.noi_dung || 'Không có nội dung' }}
          </div>
          <div class="small text-muted mt-1">
            {{ formattedTime(message.created_at) }}
          </div>
        </div>

        <!-- Tin nhắn người nhận (bên trái) -->
        <div v-else class="d-flex align-items-start mb-2">
          <img :src="message.nguoi_gui_avatar || '/default-avatar.jpg'" class="rounded-circle me-2"
            style="width: 30px; height: 30px;" />
          <div>
            <div class="p-2 bg-light rounded-3 shadow-sm">
              {{ message.noi_dung || 'Không có nội dung' }}
            </div>
            <div class="small text-muted mt-1">
              {{ formattedTime(message.created_at) }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="card-footer bg-light d-flex align-items-center p-2">
      <input ref="tinNhanInput" type="text" class="form-control me-2" placeholder="Nhập tin nhắn" />
      <button :disabled="sending" @click="sendTinNhan(currentNguoiNhanId)" class="btn btn-primary">
        <span v-if="sending">Đang gửi...</span>
        <span v-else>Gửi</span>
      </button>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      lichSuTroChuyen: [],
      chiTietTroChuyen: [],
      currentUserId: null, // ID người dùng hiện tại (người đăng nhập)
      currentNguoiNhanId: null, // ID của admin (người nhận tin nhắn)
      sending: false, // Trạng thái gửi tin nhắn
      infoAdmin: {},
    };
  },
  mounted() {
    this.loadCurrentUserId(); // Lấy ID người dùng hiện tại
    this.loadAdminInfo(); // Lấy thông tin admin
  },
  methods: {
    formattedTime(rawTime) {
      const date = new Date(rawTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${hours}:${minutes} - ${day}/${month}/${year}`;
    },
    loadCurrentUserId() {
      axios
        .get("http://127.0.0.1:8000/api/nguoi-dung/id", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung"),
          },
        })
        .then((res) => {
          this.currentUserId = res.data.nguoi_dung_id;
          console.log("Current User ID:", this.currentUserId);
          this.listenToChannel();
        })
        .catch((errors) => {
          console.error("Lỗi khi lấy ID người dùng hiện tại:", errors);
        });
    },
    loadAdminInfo() {
      axios
        .get("http://127.0.0.1:8000/api/admin/info", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung"),
          },
        })
        .then((res) => {
          this.currentNguoiNhanId = res.data.admin_id; // Đặt admin làm người nhận
          this.infoAdmin = res.data; // Gán thông tin admin vào biến infoAdmin
          this.startChatWithAdmin();
        })
        .catch((errors) => {
          console.error("Lỗi khi lấy thông tin admin:", errors);
        });
    },
    startChatWithAdmin() {
      // Gọi API để tải chi tiết tin nhắn với admin
      this.loadChiTietTinNhan(this.currentNguoiNhanId);
    },
    loadChiTietTinNhan(nguoiDungId) {
      axios
        .post("http://127.0.0.1:8000/api/nguoi-dung/chi-tiet-tin-nhan", {
          nguoi_gui_id: nguoiDungId,
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung"),
          },
        })
        .then((res) => {
          this.chiTietTroChuyen = res.data; // Gán dữ liệu tin nhắn vào danh sách
          console.log("Chi tiết tin nhắn với admin:", this.chiTietTroChuyen);
          // Cuộn xuống cuối tin nhắn
          this.scrollToBottom();
        })
        .catch((errors) => {
          console.error("Lỗi khi tải tin nhắn với admin:", errors);
        });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContentWrapper = document.querySelector('.chat-content-wrapper');
        if (chatContentWrapper) {
          chatContentWrapper.scrollTop = chatContentWrapper.scrollHeight;
        }
      });
    },

    listenToChannel() {
      if (!this.currentUserId) {
        console.error("currentUserId chưa được gán, không thể đăng ký channel.");
        return;
      }

      console.log(`Đăng ký channel: chat_user.${this.currentUserId}`);
      window.Echo.channel(`chat_user.${this.currentUserId}`)
        .listen('.message-sent-event', (data) => {
          console.log('Sự kiện nhận được:', data);
          // Ở đây `data` chính là đối số đầu tiên (arguments[0]) từ log trước đó.
          // Bạn có thể truy cập data.sender_type, data.noi_dung, data.nguoi_gui_avatar...

          if (data.sender_type !== 1) {
            this.chiTietTroChuyen = [...this.chiTietTroChuyen, { ...data }];
            this.scrollToBottom();
          }
        });


    },


    sendTinNhan(nguoiNhanId) {
      const messageContent = this.$refs.tinNhanInput.value || '';
      axios.post("http://127.0.0.1:8000/api/nguoi-dung/gui-tin-nhan", {
        nguoi_nhan_id: nguoiNhanId,
        noi_dung: messageContent,
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung"),
        },
      })
        .then((res) => {
          console.log('Response from sendTinNhan:', res.data);

          // Thêm tin nhắn vào danh sách ngay lập tức, tạo cảm giác gửi liền.
          this.chiTietTroChuyen.push({
            id: res.data.data.id,
            nguoi_gui_id: this.currentUserId,
            nguoi_nhan_id: nguoiNhanId,
            noi_dung: messageContent,
            sender_type: 1,
            created_at: new Date().toISOString(),
          });

          this.scrollToBottom();
          this.$refs.tinNhanInput.value = '';
          this.$toast.success("Tin nhắn đã gửi thành công!");
        })
        .catch((error) => {
          console.error('Error in sendTinNhan:', error.response);
          this.$toast.error("Không thể gửi tin nhắn.");
        });
    },


  },
};
</script>

<style scoped>

.chat-interface {
  max-width: 1400px; 
  font-size: 14px;
}

.chat-content-wrapper {
  height: 405px !important; 
  padding: 10px; 
}
.chat-interface img {
  width: 30px; 
  height: 30px;
}
.card-footer input {
  font-size: 13px; 
  height: 35px;
  
}
.card-header {
  border-top: 1px solid #CCCCCC;   /* Viền trên */
  border-left: 1px solid #CCCCCC;  /* Viền trái */
  border-right: 1px solid #CCCCCC; /* Viền phải */
}
.card-body {
  border-bottom: 1px solid #CCCCCC; /* Viền dưới */
  border-left: 1px solid #CCCCCC;  /* Viền trái */
  border-right: 1px solid #CCCCCC; /* Viền phải */
}
.card-footer {
  border-left: 1px solid #CCCCCC;  /* Viền trái */
  border-right: 1px solid #CCCCCC; /* Viền phải */
  border-bottom: 1px solid #CCCCCC; /* Viền dưới */
}
</style>
