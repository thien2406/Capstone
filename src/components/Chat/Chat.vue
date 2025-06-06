<template>
  <section>
    <div class="container py-5">

      <div class="row d-flex justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">

          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center p-3"
              style="border-top: 4px solid #46DFB1;">
              <h5 class="mb-0">Chat messages</h5>
              <div class="d-flex flex-row align-items-center">
              </div>
            </div>
            <div class="card-body" data-mdb-perfect-scrollbar-init style="position: relative; height: 400px">
            </div>
            <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
              <div class="input-group mb-0">
                <input type="text" class="form-control" placeholder="Type message" aria-label="Recipient's username"
                  aria-describedby="button-addon2" />
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-warning" type="button"
                  id="button-addon2" style="padding-top: .55rem;" @click="sendMessage">
                  Send
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<style>
.card-body {
  position: relative;
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f8f9fa;
}

.card-footer {
  background-color: #f8f9fa;
}
</style>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      tai_khoan: {},
      showPassword: false
    };
  },
  methods: {
    async sendMessage() {
      const inputField = document.querySelector('input[placeholder="Type message"]');
      const message = inputField.value;

      if (message.trim() === '') {
        alert('Please type a message!');
        return;
      }

      this.addMessageToChat(message, 'user');

      const response = await axios.post('http://127.0.0.1:8000/api/chat', {
        message: message
      });

      // Xử lý câu trả lời từ API
      const reply = response.data.reply;

      // Thêm câu trả lời từ API vào giao diện
      this.addMessageToChat(reply, 'bot');

      // Xóa nội dung input sau khi gửi
      inputField.value = '';

    },
    addMessageToChat(content, type) {
      // Tạo phần tử HTML cho tin nhắn mới
      const chatBody = document.querySelector('.card-body');
      const messageElement = document.createElement('div');

      if (type === 'user') {
        messageElement.className = 'd-flex flex-row justify-content-start';
        messageElement.innerHTML = `
        <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="avatar 1" style="width: 45px; height: 100%;">
        <div>
          <p class="small p-2 ms-3 mb-3 rounded-3 bg-body-tertiary">${content}</p>
        </div>
      `;
      } else if (type === 'bot') {

        messageElement.className = 'd-flex flex-row justify-content-end mb-4 pt-1';
        messageElement.innerHTML = `
        <div>
          <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">${content}</p>
        </div>
        <img src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
          alt="avatar 1" style="width: 45px; height: 100%;">
      `;
      }
      chatBody.appendChild(messageElement);


    }
  },
}
</script>
<style scoped></style>