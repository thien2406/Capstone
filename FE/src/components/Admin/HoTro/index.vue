<template>
  <div class="page-wrapper ">
  <div class="page-content" style="margin-top: -50px">
      <div class="chat-wrapper my-1">
        <div class="chat-sidebar">
          <div class="chat-sidebar-content">
            <div class="chat-list">
              <div class="list-group" >
                <a v-for="item in lichSuTroChuyen" :key="item.nguoi_gui_id" class="list-group-item"
                  :class="{ 'highlight-conversation': item.highlight,'active-conversation': item.nguoi_gui_id === currentNguoiNhanId }" @click="loadChiTietTinNhan(item.nguoi_gui_id)">
                  <div class="d-flex" >
                    <div class="chat-user-online"> 
                      <img v-if="item.nguoi_gui_avatar" :src="item.nguoi_gui_avatar" width="42" height="42"
                        class="rounded-circle" >
                      <div v-else class="d-flex justify-content-center align-items-center rounded-circle bg-primary"
                        style="width: 42px; height: 42px;">
                        <i class="fa-regular fa-user text-white fs-3"></i>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-2">
                      <h6 class="mb-0 chat-title">{{ item.nguoi_gui_ten }}</h6>
                      <p class="mb-0 chat-msg">{{ item.latest_message }}</p>
                    
                    </div>
                    <div class="chat-time">{{ item.latest_time }}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-header d-flex align-items-center" >
          <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i></div>
          <div>
            <h4 class="mb-1 font-weight-bold">{{ currentNguoiGuiTen }}</h4  >
            <div class="list-inline d-sm-flex mb-0 d-none">
              <a href="javascript:;" class="list-inline-item text-secondary"><small
                  class="bx bxs-circle me-1 chart-online"></small>Active Now</a>
            </div>
          </div>
        </div>
        <div class="chat-content-wrapper">
          <div class="chat-content">
            <div v-for="message in chiTietTroChuyen" :key="message.id">
              <!-- Nếu tin nhắn do admin gửi -->
              <div v-if="message.sender_type == 2" class="chat-content-rightside">
                <div class="d-flex ms-auto">
                  <div class="flex-grow-1 me-2">
                    <p class="mb-0 chat-time text-end">{{ formattedTime(message.created_at) }}</p>
                    <p class="chat-right-msg">{{ message.noi_dung }}</p>
                  </div>
                </div>
              </div>

              <!-- Nếu tin nhắn do người dùng gửi -->
              <div v-else class="chat-content-leftside" style="margin-left: -15px;">
                <div class="d-flex ms-n" >
                  <img v-if="message.nguoi_gui_avatar" :src="message.nguoi_gui_avatar" width="42" height="42"
                        class="rounded-circle" alt="User Avatar">
                      <div v-else class="d-flex justify-content-center align-items-center rounded-circle bg-primary"
                        style="width: 42px; height: 42px;">
                        <i class="fa-regular fa-user text-white fs-3"></i>
                      </div>
                  <div class="flex-grow-1 ms-2">
                    <p class="mb-0 chat-time">{{ formattedTime(message.created_at) }}</p>
                    <p class="chat-left-msg">{{ message.noi_dung }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="chat-footer d-flex align-items-center">
          <div class="flex-grow-1 pe-2">
            <div class="input-group">
              <span class="input-group-text"><i class="bx bx-smile"></i></span>
              <input ref="tinNhanInput" type="text" class="form-control" placeholder="Type a message">
            </div>
          </div>
          <div class="chat-footer-menu">
            <button @click="sendTinNhan(currentNguoiNhanId)" class="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
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
      currentUserId: null,
      currentNguoiNhanId: null,
      currentNguoiGuiTen: '',
      tinh_trang_nguoi_gui: 0,
    };
  },
  mounted() {
    this.loadCurrentUser();
    this.loadFromLocalStorage(); // Tải trạng thái từ localStorage trước
    this.loadLichSuTroChuyen(); // Sau đó tải từ API và kết hợp
    this.setNguoiNhan();
  },

  watch: {
    // Nếu chi tiết tin nhắn thay đổi, cập nhật người nhận
    chiTietTroChuyen() {
      this.setNguoiNhan();
    },
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContentWrapper = document.querySelector('.chat-content-wrapper');
        if (chatContentWrapper) {
          chatContentWrapper.scrollTop = chatContentWrapper.scrollHeight;
        }
      });
    },

    formattedTime(rawTime) {
      const date = new Date(rawTime);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${hours}:${minutes} - ${day}/${month}/${year}`;
    },
    loadCurrentUser() {
      axios
        .get("http://127.0.0.1:8000/api/admin/id", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          this.currentUserId = res.data.admin_id;
          console.log("Current User ID:", this.currentUserId);
          this.listenToChannel(); // Chỉ gọi listenToChannel() ở đây
        })
        .catch((errors) => {
          console.error("Lỗi khi lấy ID người dùng hiện tại:", errors);
        });
    },
    loadLichSuTroChuyen() {
      axios
        .post("http://127.0.0.1:8000/api/admin/lich-su-nhan-tin-nhan", {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          this.lichSuTroChuyen = res.data;
          console.log("lichSuTroChuyen", JSON.stringify(this.lichSuTroChuyen));
        })
        .catch((errors) => {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '</span>';
            this.$toast.error(thong_bao);
          });
        });
    },
    saveToLocalStorage() {
      localStorage.setItem('lichSuTroChuyen', JSON.stringify(this.lichSuTroChuyen));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('lichSuTroChuyen');
      if (data) {
        this.lichSuTroChuyen = JSON.parse(data);
      }
    },
    // Lắng nghe tin nhắn mới
    listenToChannel() {
      const currentUserId = this.currentUserId;
      if (!currentUserId) {
        console.error("currentUserId chưa được gán, không thể đăng ký channel.");
        return;
      }

      console.log(`Đăng ký channel: chat_admin.${currentUserId}`);
      window.Echo.channel(`chat_admin.${currentUserId}`)
        .listen('.message-sent-event', (data) => {
          console.log('Sự kiện nhận được:', data);
          
          // Chỉ xử lý tin nhắn khi admin là người nhận
          if (data.nguoi_nhan_id === currentUserId) {
            const formatted = this.formattedTime(data.created_at);

            // Cập nhật lichSuTroChuyen
            if (data.sender_type !== 2) { // Không phải admin gửi
              const index = this.lichSuTroChuyen.findIndex(item => item.nguoi_gui_id === data.nguoi_gui_id);

              if (index !== -1) {
                this.lichSuTroChuyen[index].latest_message = data.noi_dung;
                this.lichSuTroChuyen[index].latest_time = formatted;
                this.lichSuTroChuyen[index].highlight = true;

                const updatedConv = this.lichSuTroChuyen.splice(index, 1)[0];
                this.lichSuTroChuyen.unshift(updatedConv);
              } else {
                this.lichSuTroChuyen.unshift({
                  nguoi_gui_id: data.nguoi_gui_id,
                  nguoi_gui_ten: data.nguoi_gui_ten || 'Người dùng',
                  nguoi_gui_avatar: data.nguoi_gui_avatar || 'default-avatar.png',
                  latest_message: data.noi_dung,
                  latest_time: formatted,
                  highlight: true
                });
              }

              // Cập nhật chiTietTroChuyen nếu đang trong cuộc trò chuyện với người gửi
              if (this.currentNguoiNhanId === data.nguoi_gui_id) {
                this.chiTietTroChuyen = [...this.chiTietTroChuyen, { ...data }];
                this.scrollToBottom();
              }

              this.saveToLocalStorage();
            }
          }
        });
    },

    loadChiTietTinNhan(nguoiGuiId) {
      const selectedUser = this.lichSuTroChuyen.find(item => item.nguoi_gui_id === nguoiGuiId);
      if (selectedUser) {
        this.currentNguoiGuiTen = selectedUser.nguoi_gui_ten;
      }

      axios.post("http://127.0.0.1:8000/api/admin/chi-tiet-tin-nhan", {
        nguoi_gui_id: nguoiGuiId,
        noi_dung: this.messageContent
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token_admin")
        }
      }).then((res) => {
        this.chiTietTroChuyen = res.data;
        console.log("Chi tiết tin nhắn:", this.chiTietTroChuyen);
        this.scrollToBottom();

        selectedUser.highlight = false; // <-- Lỗi: Dẫn đến thay đổi highlight ngay cả khi không cần
        this.saveToLocalStorage();
      }).catch((errors) => {
        console.error(errors);
      });
    },


    setNguoiNhan() {
      if (this.chiTietTroChuyen.length > 0) {
        // Ví dụ: lấy người nhận từ phần tử đầu tiên trong mảng
        this.currentNguoiNhanId = this.chiTietTroChuyen[0].nguoi_gui_id;
      }
    },
    sendTinNhan(nguoiNhanId) {
      console.log("nguoiNhanId:", nguoiNhanId);
      const messageContent = this.$refs.tinNhanInput.value || '';

      axios
        .post("http://127.0.0.1:8000/api/admin/gui-tin-nhan", {
          nguoi_nhan_id: nguoiNhanId,
          noi_dung: messageContent,
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          console.log('Response from sendTinNhan:', res.data);
          this.chiTietTroChuyen.push({
            id: res.data.data.id,
            nguoi_gui_id: this.currentUserId, // Admin ID
            nguoi_nhan_id: nguoiNhanId,
            noi_dung: messageContent,
            sender_type: 2, // Loại người gửi: admin
            created_at: new Date().toISOString(),
          });
                // Format thời gian hiện tại
      const nowFormatted = this.formattedTime(new Date());

      // Cập nhật lại lịch sử trò chuyện
      const index = this.lichSuTroChuyen.findIndex(item => item.nguoi_gui_id === nguoiNhanId);
      if (index !== -1) {
        this.lichSuTroChuyen[index].latest_message = 'Bạn: ' + messageContent;
        this.lichSuTroChuyen[index].latest_time = nowFormatted;

        const updatedConv = this.lichSuTroChuyen.splice(index, 1)[0];
        this.lichSuTroChuyen.unshift(updatedConv);
      } else {
        this.lichSuTroChuyen.unshift({
          nguoi_gui_id: nguoiNhanId,
          nguoi_gui_ten: 'Người dùng',
          nguoi_gui_avatar: null,
          latest_message: 'Bạn: ' + messageContent,
          latest_time: nowFormatted,
          highlight: false
        });
      }
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
  beforeUnmount() {
    if (this.currentUserId) {
      this.$echo.leave(`chat.${this.currentUserId}`);
    }
  },
};
</script>

<style scoped>
.page-wrapper {
  width: 70%;
  height: 80vh;
  margin: 10 auto;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: -155px;
  left: 50%;
  /* Đẩy sang phải 50% chiều rộng */
  transform: translateX(-50%);
  /* Căn chỉnh chính giữa màn hình */
}

.chat-content-wrapper {
  flex-grow: 1;
  height: auto;
  max-height: 70vh;
  overflow-y: auto;
  padding: 15px;
  border-right: 1px solid #999999;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-content-rightside,
.chat-content-leftside {
  display: flex;
  flex-direction: column;
}

.chat-right-msg,
.chat-left-msg {
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 100%;
  word-wrap: break-word;
}

.chat-right-msg {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-left-msg {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: black;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
  text-align: left; 
}

.chat-content-rightside .chat-time {
  text-align: right;
}

.chat-footer {
  padding: 10px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #999999;
  border-bottom: 1px solid #999999;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.chat-footer .input-group {
  flex-grow: 1;
}

.chat-footer .input-group input {
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  outline: none;
  transition: border-color 0.3s;
}

.chat-footer .input-group input:focus {
  border-color: #007bff;
}

.chat-footer-menu button {
  border-radius: 20px;
  padding: 10px 15px;
}

.chat-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-top: 1px solid #999999;
  border-right: 1px solid #999999;
  border-bottom: 1px solid #999999;
  height: 64px;
}

.chat-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.chat-header .list-inline {
  margin-left: 10px;
}

.chat-header .list-inline-item {
  font-size: 14px;
  color: #777;
}

.highlight-conversation {
  background-color: #d2e7fa;
  font-weight: bold;
}

.list-group-item {
  border-top: 1px solid #999999;
  border-left: 1px solid #999999;
  border-bottom: 1px solid #999999;
  border-right: none; /* Không có viền bên phải */
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease;
}


.chat-sidebar{
border-right:1px solid #333333;
}
.active-conversation {
  background-color: #CCCCCC !important;
  color: white;
  transition: background-color 0.3s ease;
}
.chat-msg {
  max-width: 170px;         /* hoặc giới hạn theo thiết kế */
  white-space: nowrap;      /* không cho xuống dòng */
  overflow: hidden;         /* ẩn phần vượt quá */
  text-overflow: ellipsis;  /* hiển thị dấu ... nếu tràn */
  display: block;
  color: #555;
}


</style>
