<template>
    <div>
        <div>
            <div v-if="!isChatOpen" class="messenger-icon-button" @click="toggleChat">
                <span class="chatbot-text">I am chatbot</span>

                <img src="/src/assets/images/logo.png" class="logo-icon" alt="logo icon">
    </div>
        </div>
        
      <section v-if="isChatOpen" class="messenger-chat-box">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center p-3">
            <h5 class="mb-0">Chat Messages</h5>
            <button class="btn-close" @click="toggleChat"></button>
          </div>
          <div class="card-body" ref="chatBody" style="overflow-y: auto; height: 400px;">
            <!-- Nội dung chat -->
            <p>Welcome to the chat!</p>
          </div>
          <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
            <div class="input-group mb-0">
              <input type="text" class="form-control" placeholder="Type message" ref="inputField" />
              <button class="btn btn-warning" style=" background-color: #5aace6;" @click="sendMessage">Send</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isChatOpen: false,
      };
    },
    methods: {
      toggleChat() {
        this.isChatOpen = !this.isChatOpen;
      },
      async sendMessage() {
        const inputField = this.$refs.inputField;
        const message = inputField.value.trim();
  
        if (!message) {
          alert('Please type a message!');
          return;
        }
  
        this.addMessageToChat(message, 'user');
        inputField.value = '';
  
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/chat', { message });
          const reply = response.data.reply;
          this.addMessageToChat(reply, 'bot');
        } catch (error) {
          console.error('Error sending message:', error);
          this.addMessageToChat('Sorry, something went wrong. Please try again later.', 'bot');
        }
      },
      addMessageToChat(content, type) {
        const chatBody = this.$refs.chatBody;
        const messageElement = document.createElement('div');
  
        if (type === 'user') {
          messageElement.className = 'd-flex flex-row justify-content-start';
          messageElement.innerHTML = `
            <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              alt="User avatar" style="width: 45px; height: 45px;">
            <div>
                <p class="small p-2 ms-3 mb-3 rounded-3 text-white" style="background-color: #5aace6;">${content}</p>
            </div>
          `;
        } else if (type === 'bot') {
          messageElement.className = 'd-flex flex-row justify-content-end mb-4 pt-1';
          messageElement.innerHTML = `
            <div>
              <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">${content}</p>
            </div>
            <img src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
              alt="Bot avatar" style="width: 45px; height: 45px;">
          `;
        }
  
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
      },
    },
  };
  </script>
 <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"></link> 

<style >

.chatbot-text {
    font-family: 'Roboto', sans-serif;
    position: fixed;
  font-size: 14px;
  color: #333;
  margin: 0;
  bottom: 85px;
}
   .messenger-icon-button {
    position: fixed; /* Cố định icon ở một vị trí cụ thể */
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #f8f8f8;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  flex-shrink: 0; /* Ngăn icon bị thu nhỏ hoặc mở rộng */
  overflow: hidden; 
}

.messenger-chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 525px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background-color: #fff;
}

.messenger-chat-box .card-header {
  background-color: #5aace6;
  color: #fff;
}

.messenger-chat-box .card-footer {
  background-color: #f1f1f1;
}


</style>