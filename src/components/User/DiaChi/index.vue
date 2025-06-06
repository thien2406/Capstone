<template>
    <div class="page-content" style="margin-top: -90px;">
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">Thông Tin Cá Nhân</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Địa Chỉ</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Địa Chỉ Đặt Hàng</h5>
                <div class="ms-auto">
                    <button type="button" class="btn btn-primary radius-30 mt-2 mt-lg-0" data-bs-toggle="modal"
                        data-bs-target="#addEmployeeModal">
                        Thêm Địa Chỉ Mới
                    </button>
                </div>
                <hr>
                <div class="accordion" id="accordionExample">
                    <div v-for="(value, index) in diachi" :key="index" class="accordion-item">
                        <h2 class="accordion-header" :id="'heading' + index">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                :data-bs-target="'#collapse' + index" aria-expanded="true"
                                :aria-controls="'collapse' + index">
                                Địa Chỉ {{ index + 1 }}
                            </button>
                        </h2>
                        <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }"
                            :aria-labelledby="'heading' + index" data-bs-parent="#accordionExample">
                            <div class="accordion-body d-flex justify-content-between align-items-center">
                                <div>
                                    <div>Họ và Tên: {{ value.ten_nguoi_nhan }}</div>
                                    <div>Số điện thoại: {{ value.so_dien_thoai }}</div>
                                    <div>Địa Chỉ: {{ value.dia_chi }}</div>
                                </div>
                                <td class="align-middle text-center">
                                    <button class="btn btn-primary me-2" data-bs-toggle="modal"
                                        data-bs-target="#capnhatnv" v-on:click="Object.assign(update_dc, value)">Cập
                                        nhật</button>
                                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletenv"
                                        v-on:click="delete_dc = value">Xóa</button>
                                </td>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="addEmployeeModalLabel">Thêm nhân viên mới</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Họ và Tên</label>
                                                <input type="text" class="form-control"
                                                    v-model="create_dc.ten_nguoi_nhan" id="Nhập Họ và Tên"
                                                    placeholder="Nhập Họ Và Tên">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Số Điện Thoại</label>
                                                <input type="text" class="form-control"
                                                    v-model="create_dc.so_dien_thoai" id="Nhập Số Điện Thoại"
                                                    placeholder="Nhập Số Điện Thoại">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Địa Chỉ</label>
                                                <input type="text" class="form-control" v-model="create_dc.dia_chi"
                                                    id="Nhập Nhập Địa Chỉ" placeholder="Nhập Nhập Địa Chỉ">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                    <button type="button" class="btn btn-primary" v-on:click=" createDiaChi()"
                                        data-bs-dismiss="modal">Thêm
                                        mới</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="capnhatnv" tabindex="-1" aria-labelledby="capnhatnvLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="capnhatnvLabel">Cập nhật địa chỉ</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Họ và Tên</label>
                                            <input type="text" class="form-control" v-model="update_dc.ten_nguoi_nhan"
                                                placeholder="Nhập họ và tên">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Địa Chỉ</label>
                                            <input type="text" class="form-control" v-model="update_dc.dia_chi"
                                                placeholder="Nhập Địa Chỉ">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Số điện thoại</label>
                                            <input type="text" class="form-control" v-model="update_dc.so_dien_thoai"
                                                placeholder="Nhập số điện thoại">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                    <button type="button" class="btn btn-primary" v-on:click="updateDiaChi()"
                                        data-bs-dismiss="modal">Cập
                                        nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="deletenv" tabindex="-1" aria-labelledby="deletenvLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deletenvLabel">Xóa Người Dùng</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc chắn muốn xóa địa chỉ này?</p>
                            <p><strong>{{ delete_dc.dia_chi }}</strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" class="btn btn-danger" v-on:click="deleteDiaChi()"
                                data-bs-dismiss="modal">Xóa</button>
                        </div>
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
            diachi: [],
            create_dc: {},
            update_dc: {},
            delete_dc: {},
        };
    },
    mounted() {
        this.loaddc();
    },
    methods: {
        loaddc() {
            axios
                .get("http://127.0.0.1:8000/api/nguoi-dung/dia-chi/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    this.diachi = res.data.data;
                    console.log('123', JSON.stringify(this.users));

                })
                .catch((error) => {
                    console.error("Lỗi khi tải danh sách nhân viên:", error);
                });
        },
        createDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/nguoi-dung/dia-chi/create", this.create_dc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loaddc();
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
        updateDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/nguoi-dung/dia-chi/update", this.update_dc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loaddc();
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
        deleteDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/nguoi-dung/dia-chi/delete", this.delete_dc,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nguoi_dung")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loaddc();
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
    },
}
</script>
<style></style>