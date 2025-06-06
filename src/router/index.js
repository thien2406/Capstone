import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import check_Admin from "./check_Admin";
import check_User from "./check_User";
import check_Staff from "./check_Staff";

const routes = [
    // Public Routes (No authentication required)
    {
      path: '/',
      component: () => import('../components/User/TrangChu/index.vue'),
      meta: { layout: 'Users' },
    },
    {
      path: '/nguoi-dung/gioithieu',
      component: () => import('../components/User/GioiThieu/index.vue'),
      meta: { layout: 'Users' },
    },
    {
      path: '/nguoi-dung/dangky',
      component: () => import('../components/User/DangKy/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nguoi-dung/dangnhap',
      component: () => import('../components/User/DangNhap/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nguoi-dung/quenmatkhau',
      component: () => import('../components/User/QuenMatKhau/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nguoi-dung/laymatkhau/:id_nguoi_dung',
      component: () => import('../components/User/LayMatKhau/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nguoi-dung/kich-hoat/:id_nguoi_dung',
      component: () => import('../components/User/KichHoatMail/index.vue'),
      meta: { layout: 'Users' },
      props: true,
    },
  
    // User Routes (Authenticated)
    {
      path: '/nguoi-dung/thongtin',
      component: () => import('../components/User/Profile/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/doimatkhau',
      component: () => import('../components/User/DoiMatKhau/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/diachi',
      component: () => import('../components/User/DiaChi/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/vi',
      component: () => import('../components/User/Vi/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/giaodich',
      component: () => import('../components/User/GiaoDich/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/thongbao',
      component: () => import('../components/User/ThongBao/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/hotro',
      component: () => import('../components/User/HoTro/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/danhgia/:id_don_hang',
      component: () => import('../components/User/DanhGia/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietnhanvien/:id_nhan_vien',
      component: () => import('../components/User/ChiTietNhanVien/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/xemdanhgia/:id_nhan_vien',
      component: () => import('../components/User/XemDanhGia/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    // User Order Routes
    {
      path: '/nguoi-dung/donhangdinhky/:id-:slug_dich_vu',
      component: () => import('../components/User/DonHang/DonHangDinhKy/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/donhangtheogio/:id-:slug_dich_vu',
      component: () => import('../components/User/DonHang/DonHangTheoGio/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/donhangtongvesinh/:id-:slug_dich_vu',
      component: () => import('../components/User/DonHang/DonHangTongVeSinh/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/dat-lich-ngay-voi-nhan-vien/:id_nhan_vien',
      component: () => import('../components/User/DonHang/DatLichNgayVoiNhanVien/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietdonhangdinhki/:id_don_hang',
      component: () => import('../components/User/ChiTietDonHang/ChiTietDonHangDinhKi/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietdonhangtheogio/:id_don_hang',
      component: () => import('../components/User/ChiTietDonHang/ChiTietDonHangVeSinhTheoGio/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietdonhangtongvesinh/:id_don_hang',
      component: () => import('../components/User/ChiTietDonHang/ChiTietDonHangTongVeSinh/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietdondinhki/:id_don_hang',
      component: () => import('../components/User/XemChiTietThongBao/DinhKi/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitietdontheogio/:id_don_hang',
      component: () => import('../components/User/XemChiTietThongBao/TheoGio/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/chitiettongvesinh/:id_don_hang',
      component: () => import('../components/User/XemChiTietThongBao/TongVeSinh/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/thanhtoan/:maDonHang',
      name: 'ThanhToan',
      component: () => import('../components/User/ThanhToan/index.vue'),
      meta: { layout: 'Users' },
      props: true,
      beforeEnter: check_User,
    },
    // User Order History Routes
    {
      path: '/nguoi-dung/lisudonhangdahoanthanh',
      component: () => import('../components/User/LichSuDonHang/DaHoanThanh/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/lisudonhangdahuy',
      component: () => import('../components/User/LichSuDonHang/DaHuy/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/lisudonhangdanglam',
      component: () => import('../components/User/LichSuDonHang/DangLam/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
    {
      path: '/nguoi-dung/lisudonhangmoidat',
      component: () => import('../components/User/LichSuDonHang/MoiDat/index.vue'),
      meta: { layout: 'Users' },
      beforeEnter: check_User,
    },
  
    // Admin Routes (Authenticated)
    {
      path: '/admin/dangnhap',
      component: () => import('../components/Admin/DangNhap/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/admin/quenmatkhau',
      component: () => import('../components/Admin/QuenMK/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/admin/laymatkhau/:hash_reset',
      component: () => import('../components/Admin/LayMatKhau/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/admin/trangchu',
      component: () => import('../components/Admin/TrangChu/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/thongtin',
      component: () => import('../components/Admin/Profile/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/doimatkhau',
      component: () => import('../components/Admin/DoiMatKhau/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/thongbao',
      component: () => import('../components/Admin/ThongBao/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/hotro',
      component: () => import('../components/Admin/HoTro/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/danhmuc',
      component: () => import('../components/Admin/DanhMuc/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/dichvu',
      component: () => import('../components/Admin/DichVu/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/magiamgia',
      component: () => import('../components/Admin/MaGiamGia/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/quanlinguoidung',
      component: () => import('../components/Admin/QuanLiNguoiDung/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/quanlinhanvien',
      component: () => import('../components/Admin/QuanLiNhanVien/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/quanligiaodichnguoidung',
      component: () => import('../components/Admin/QuanLiGiaoDich/NguoiDung/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/quanligiaodichnhanvien',
      component: () => import('../components/Admin/QuanLiGiaoDich/NhanVien/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/quanlidonhang',
      component: () => import('../components/Admin/QuanLiDonHang/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/vinguoidung',
      component: () => import('../components/Admin/QuanLiVi/ViNguoiDung/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/vinhanvien',
      component: () => import('../components/Admin/QuanLiVi/ViNhanVien/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/ruttien/:id_thong_bao',
      component: () => import('../components/Admin/RutTien/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
    {
      path: '/admin/ruttien-nguoiDung/:id_thong_bao',
      component: () => import('../components/Admin/NguoiDungRutTien/index.vue'),
      meta: { layout: 'Admin' },
      beforeEnter: check_Admin,
    },
  
    // Staff Routes (Authenticated)
    {
      path: '/nhan-vien/dangnhap',
      component: () => import('../components/Staff/DangNhap/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nhan-vien/quenmatkhau',
      component: () => import('../components/Staff/QuenMK/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nhan-vien/laymatkhau/:id_nhan_vien',
      component: () => import('../components/Staff/LayMK/index.vue'),
      meta: { layout: 'dangky' },
    },
    {
      path: '/nhan-vien/trangchu',
      component: () => import('../components/Staff/TrangChu/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/thongtin',
      component: () => import('../components/Staff/Profile/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/doimatkhau',
      component: () => import('../components/Staff/DoiMatKhau/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/vi',
      component: () => import('../components/Staff/Vi/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/thongbao',
      component: () => import('../components/Staff/ThongBao/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/lich',
      component: () => import('../components/Staff/LichLamViec/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/quanligiaodich',
      component: () => import('../components/Staff/QuanLiGiaoDich/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/lichsudonhang',
      component: () => import('../components/Staff/LichSuDonHang/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    // Staff Order Details Routes
    {
      path: '/nhan-vien/chitietdonhangdinhki',
      component: () => import('../components/Staff/ChiTietDonHang/ChiTietDonHangDinhKi/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/chitietdonhangtheogio',
      component: () => import('../components/Staff/ChiTietDonHang/ChiTietDonHangVeSinhTheoGio/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/chitietdonhangtongvesinh',
      component: () => import('../components/Staff/ChiTietDonHang/ChiTietDonHangTongVeSinh/index.vue'),
      meta: { layout: 'Staff' },
      beforeEnter: check_Staff,
    },
    // Staff Accept Order Routes
    {
      path: '/nhan-vien/nhandondinhki/:id_don_hang',
      component: () => import('../components/Staff/NhanDon/NhanDonDinhKy/index.vue'),
      meta: { layout: 'Staff' },
      props: true,
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/nhandontheogio/:id_don_hang',
      component: () => import('../components/Staff/NhanDon/NhanDonTheoGio/index.vue'),
      meta: { layout: 'Staff' },
      props: true,
      beforeEnter: check_Staff,
    },
    {
      path: '/nhan-vien/nhandontongvesinh/:id_don_hang',
      component: () => import('../components/Staff/NhanDon/NhanDonTongVeSinh/index.vue'),
      meta: { layout: 'Staff' },
      props: true,
      beforeEnter: check_Staff,
    },
  ];    
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router