import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Default from './layout/wrapper/index.vue';
import DangKy from './layout/wrapper/indexdangky.vue';
import Admin from './layout/wrapper/indexAdmin.vue';
import Staff from './layout/wrapper/indexStaff.vue';
import Users from './layout/wrapper/indexUser.vue';
import Toaster from "@meforma/vue-toaster";
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

const app = createApp(App);

// Sử dụng các plugin và layout
app.use(router);
app.use(Toaster, { position: "top-right" });
app.use(VCalendar, { componentPrefix: 'vc' });
app.component("default-layout", Default);
app.component("dangky-layout", DangKy);
app.component("Admin-layout", Admin);
app.component("Staff-layout", Staff);
app.component("Users-layout", Users);

// Cấu hình Laravel Echo và Pusher

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '8659a4df47a4e267156f',
  cluster: 'ap1',
  forceTLS: true,
  encrypted: true,
  wsHost: `ws-ap1.pusher.com`,
  wsPort: 443,
  enabledTransports: ['ws', 'wss'],
});

app.config.globalProperties.$echo =  window.Echo;

async function loadUserOrAdminChannel() {
  const token = localStorage.getItem("token_nguoi_dung");
  const tokenAdmin = localStorage.getItem("token_admin");
  const tokenNhanVien = localStorage.getItem("token_nhan_vien");

  if (tokenAdmin) {
    // Trường hợp admin
    const res = await axios.get("http://127.0.0.1:8000/api/admin/id", {
      headers: { Authorization: 'Bearer ' + tokenAdmin },
    });
    const adminId = res.data.admin_id;
    console.log("Admin ID:", adminId);

    window.Echo.channel(`chat_admin.${adminId}`).listen('.message-sent-event', (event) => {
      if (adminId === event.nguoi_nhan_id && event.sender_type === 1) {
        app.config.globalProperties.$toast.info(`🔔 Tin nhắn mới từ người dùng: ${event.noi_dung}`);
      }
      window.dispatchEvent(new CustomEvent('new-message', { detail: event }));
    });

    window.Echo.channel(`notifications_ad.${adminId}`).listen('.thongbao.created', (event) => {
      console.log("123"+JSON.stringify(event));  
      if (event.thongBao.types === 3) {
        app.config.globalProperties.$toast.info(`🔔 Thông báo mới: ${event.thongBao.loi_nhan}`);
        window.dispatchEvent(new CustomEvent('new-notification', { detail: event }));
      }
    });

    console.log(`Admin đang lắng nghe kênh chat_admin.${adminId} và notifications_ad.${adminId}`);
  } else if (token) {
    // Trường hợp người dùng
    const res = await axios.get("http://127.0.0.1:8000/api/nguoi-dung/id", {
      headers: { Authorization: 'Bearer ' + token },
    });
    const nguoiDungId = res.data.nguoi_dung_id;
    console.log("Người Dùng ID:", nguoiDungId);

    window.Echo.channel(`chat_user.${nguoiDungId}`).listen('.message-sent-event', (event) => {
      if (nguoiDungId === event.nguoi_nhan_id && event.sender_type === 2) {
        app.config.globalProperties.$toast.info(`🔔 Tin nhắn mới từ admin: ${event.noi_dung}`);
      }
      window.dispatchEvent(new CustomEvent('new-message', { detail: event }));
    });

    window.Echo.channel(`notifications.${nguoiDungId}`).listen('.thongbao.created', (event) => {
      if (event.thongBao.types === 1) {
        app.config.globalProperties.$toast.info(`🔔 Thông báo mới: ${event.thongBao.loi_nhan}`);
        window.dispatchEvent(new CustomEvent('new-notification', { detail: event }));
      }
    });

    console.log(`Người dùng đang lắng nghe kênh chat_user.${nguoiDungId} và notifications.${nguoiDungId}`);
  } else if (tokenNhanVien) {
    // Trường hợp nhân viên
    const res = await axios.get("http://127.0.0.1:8000/api/nhan-vien/id", {
      headers: { Authorization: 'Bearer ' + tokenNhanVien },
    });
    const staffId = res.data.nhan_vien_id;
    console.log("Nhân Viên ID:", staffId);

    window.Echo.channel(`notifications_nv.${staffId}`).listen('.thongbao.created', (event) => {
      if (event.thongBao.types === 2) {
        app.config.globalProperties.$toast.info(`🔔 Thông báo mới: ${event.thongBao.loi_nhan}`);
        window.dispatchEvent(new CustomEvent('new-notification', { detail: event }));
      }
    });

    console.log(`Nhân viên đang lắng nghe kênh chat.${staffId} và notifications_nv.${staffId}`);
  }
}


// Khởi động lắng nghe kênh
loadUserOrAdminChannel().finally(() => {
  app.mount("#app");
});
