<template>
    <div class="page-content" style="margin-top: -90px;">
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Thông Tin Cá Nhân</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Thông Tin Cá Nhân</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="container">
            <div class="main-body">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img v-if="thongtin.hinh_anh" :src="thongtin.hinh_anh" alt="User"
                                        class="fixed-avatar" />

                                    <!-- Hiển thị icon FontAwesome nếu không có hình ảnh -->
                                    <div v-else
                                        class="d-flex justify-content-center align-items-center rounded-circle bg-primary"
                                        style="width: 150px; height: 150px;">
                                        <i class="fa-regular fa-user text-white fs-1"></i>
                                    </div>
                                    <div class="mt-3">
                                        <h4>{{ thongtin.ho_va_ten }}</h4>
                                        <p class="text-secondary mb-1">Admin</p>
                                    </div>
                                </div>
                                <hr class="my-4">
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0"><i class="bx bx-time-five me-2"></i>Ngày Sinh</h6>
                                        <span class="text-secondary">{{ thongtin.ngay_sinh }}</span>
                                    </li>
                                    <li
                                        class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 class="mb-0 d-flex align-items-center">
                                            <i class="fa-solid fa-image me-2 text-primary"></i>
                                            <span>Up Ảnh Profile</span>
                                        </h6>
                                        <div class="upload-section mt-3 w-100">
                                            <label for="uploadInput" class="form-label text-secondary d-block">
                                                Chọn ảnh (định dạng: jpg, png)
                                            </label>
                                            <div class="upload-area d-flex align-items-center">
                                                <div class="image-preview text-center me-3" v-if="anh_tpm">
                                                    <img :src="anh_tpm" alt="Preview" class="img-thumbnail rounded"
                                                        style="max-width: 150px; max-height: 150px;">
                                                </div>
                                                <div class="flex-grow-1">
                                                    <input type="file" id="uploadInput"
                                                        class="form-control form-control-sm" accept="image/*"
                                                        v-on:change="loadAnhTuLocal">
                                                </div>
                                            </div>
                                            <div class="text-end mt-2">
                                                <button type="button" class="btn btn-primary" @click="uploadAvatar">
                                                    Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Họ Và Tên</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="text" class="form-control" v-model="thongtin.ho_va_ten"
                                                placeholder="Nhập họ và tên" value="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="email" class="form-control" v-model="thongtin.email"
                                                placeholder="Nhập email" value="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Số Điện Thoại</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="text" class="form-control" v-model="thongtin.so_dien_thoai"
                                                placeholder="Nhập số điện thoại" value="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Địa Chỉ</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="text" class="form-control" v-model="thongtin.dia_chi"
                                                placeholder="Nhập địa chỉ" value="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Ngày Sinh</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <input type="date" class="form-control" v-model="thongtin.ngay_sinh"
                                                value="">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Giới Tính</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            <select class="form-control" v-model="thongtin.gioi_tinh">
                                                <option value="1">Nam</option>
                                                <option value="0">Nữ</option>
                                                <option value="2">Khác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3"></div>
                                        <div class="col-sm-9 text-secondary">
                                            <button type="button" class="btn btn-primary" v-on:click="updateAdmin()"
                                                data-bs-dismiss="modal">Cập
                                                nhật</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
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
            thongtin: {},
            file_anh:"",
            anh_tpm:"",
        };
    },
    mounted() {
        this.loadAdmin();
    },
    methods: {
        loadAnhTuLocal(event){
            this.file_anh = event.target.files[0];
            this.createImage(this.file_anh);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.anh_tpm = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        uploadAvatar() {
            const payload = new FormData();
            payload.append("hinh_anh", this.file_anh);
            axios
                .post("http://127.0.0.1:8000/api/admin/update-Anh-dai-dien-Profile",payload,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin"),'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        window.location.reload(); 
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        loadAdmin() {
            axios
                .get("http://127.0.0.1:8000/api/admin/getDataProfile", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.thongtin = res.data.data;
                    console.log('123', JSON.stringify(this.thongtin));

                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên:", error);
                });
        },
        updateAdmin() {
            axios.post("http://127.0.0.1:8000/api/admin/updateProfile", this.thongtin, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadusers();
                    }
                    else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },
    }
}
</script>
<style scoped>
.fixed-avatar {
  width: 150px;
  height: 150px;
  object-fit: cover; /* Giữ tỉ lệ, cắt nếu cần */
  border-radius: 50%; /* Bo tròn */
  padding: 1px;
  background-color: var(--bs-primary); /* Màu nền nếu muốn */
}
.fixed-avatar:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>