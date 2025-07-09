import Vue from 'vue';
import Router from 'vue-router';
import DangNhap from '@/components/User/DangNhap/index.vue';
import DangKy from '@/components/User/DangKy/index.vue';

Vue.use(Router);

export default new Router({
    mode: 'history', // Sử dụng chế độ history
    routes: [
        {
            path: '/dang-nhap',
            name: 'DangNhap',
            component: DangNhap
        },
        {
            path: '/dang-ky',
            name: 'DangKy',
            component: DangKy
        }
    ]
});