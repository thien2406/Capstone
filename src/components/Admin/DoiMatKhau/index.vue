<template>
    <div class="container mt-5">
        <div class="card shadow-lg p-4 mx-auto" style="max-width: 420px; border-radius: 12px;">
            <h3 class="text-center mb-4 text-primary">Đổi Mật Khẩu</h3>
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="new-password">Mật khẩu mới</label>
                <div class="position-relative">
                    <input :type="showNewPassword ? 'text' : 'password'" v-model="update_mk.password" id="new-password"
                        class="form-control form-control-lg" placeholder="Nhập mật khẩu mới" required />
                    <button type="button" @click="showNewPassword = !showNewPassword" class="btn position-absolute"
                        style="top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                        <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                </div>
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="confirm-password">Xác nhận mật khẩu mới</label>
                <div class="position-relative">
                    <input :type="showConfirmPassword ? 'text' : 'password'" v-model="update_mk.re_password"
                        id="confirm-password" class="form-control form-control-lg"
                        placeholder="Xác nhận mật khẩu mới" required />
                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="btn position-absolute"
                        style="top: 50%; right: 10px; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
                        <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                </div>
            </div>
            <button type="button" v-on:click="doi_mk()" class="btn btn-primary w-100 mt-4 fw-semibold">
                Đổi mật khẩu
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {  
            update_mk: {},
            showNewPassword: false,
            showConfirmPassword: false
            
        };
    },
    methods: {
        doi_mk() {
            axios
                .post("http://127.0.0.1:8000/api/admin/quen-mat-khau/ko-mail", this.update_mk, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        const thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                    } else {
                        const thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
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
        }
    }
};
</script>

<style scoped>
.card {
    background-color: #ffffff;
    border: none;
    margin-top: 50px;
}

.form-control {
    border-radius: 8px;
}

.btn-primary {
    border-radius: 8px;
}
</style>
