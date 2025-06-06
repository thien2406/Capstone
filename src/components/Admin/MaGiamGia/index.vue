<template>
    <div class="container" style="margin-top: -90px">
        <div class="row">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <h5>THÊM MỚI MÃ GIẢM GIÁ</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="category-name">Mã Code</label>
                            <input v-model="create_Gg.code" type="text" id="category-name" class="form-control"
                                placeholder="Nhập tên danh mục" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-slug">Ngày Bắt Đầu</label>
                            <input v-model="create_Gg.ngay_bat_dau" type="date" id="category-slug" class="form-control"
                                placeholder="Chọn ngày bắt đầu" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-slug">Ngày Kết Thúc</label>
                            <input v-model="create_Gg.ngay_ket_thuc" type="date" id="category-slug" class="form-control"
                                placeholder="Chọn ngày bắt đầu" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-amount">Loại Giảm Giá</label>
                            <input v-model="create_Gg.loai_giam_gia" type="text" id="category-name" class="form-control"
                                placeholder="Nhập số tiền" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-amount">Số Giảm Giá</label>
                            <input v-model="create_Gg.so_giam_gia" type="number" id="category-amount"
                                class="form-control" placeholder="Nhập số tiền" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-amount">Số Tiền Tối Đa</label>
                            <input v-model="create_Gg.so_tien_toi_da" type="number" id="category-amount"
                                class="form-control" placeholder="Nhập số tiền" />
                        </div>
                        <div class="form-group mb-3">
                            <label for="category-amount">Đơn dịch vụ Tối Thiểu</label>
                            <input v-model="create_Gg.dk_toi_thieu_don_hang" type="number" id="category-amount"
                                class="form-control" placeholder="Nhập số tiền" />
                        </div>
                        <div class="form-group mb-3">
                            <label class="form-label">Tình Trạng</label>
                            <select v-model="create_Gg.tinh_trang" class="form-control" placeholder="Chọn Tình Trạng">
                                <option value="1">Hoạt Động</option>
                                <option value="0">Dừng Hoạt Động</option>
                            </select>
                        </div>
                        <button v-on:click="createGg()" type="button" class="btn btn-primary w-100">Thêm Mới</button>
                    </div>
                </div>
            </div>
            <!-- Danh Sách Mã Giảm Giá -->
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h5>DANH SÁCH MÃ GIẢM GIÁ</h5>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Mã Code</th>
                                    <th class="text-center">Ngày Bắt Đầu </th>
                                    <th class="text-center">Ngày Kết Thúc</th>
                                    <th class="text-center">Loại Giảm</th>
                                    <th class="text-center">Số Giảm Giá</th>
                                    <th class="text-center">Số Tiền Tối Đa</th>
                                    <th class="text-center">Đơn dịch vụ Tối Thiểu</th>
                                    <th class="text-center">Tình Trạng</th>
                                    <th class="text-center" style="width: 22%;">Chỉnh Sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, index) in GiamGia" :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ value.code }}</td>
                                    <td class="text-center">{{ value.ngay_bat_dau }}</td>
                                    <td class="text-center">{{ value.ngay_ket_thuc }}</td>
                                    <td class="text-center">{{ value.loai_giam_gia }}</td>
                                    <td class="text-center">{{ value.so_giam_gia }}</td>
                                    <td class="text-center">{{ value.so_tien_toi_da }}</td>
                                    <td class="text-center">{{ value.dk_toi_thieu_don_hang }}</td>
                                    <td class="text-center">
                    <button v-if="value.is_active == 1" class="btn btn-primary me-2"
                      style="background-color: #28A745; color: white;" @click="toggleActive(value)">
                      Kích Hoạt
                    </button>
                    <button v-else class="btn btn-primary me-2" style="background-color: #DC3545; color: white;"
                      @click="toggleActive(value)">
                      Ngừng Kích Hoạt
                    </button>
                  </td>
                                    <td class="align-middle text-center">
                                        <button class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            v-on:click="Object.assign(update_Gg, value)">Cập nhật</button>
                                        <button class="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target="#deleteModal" v-on:click="delete_Gg = value">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Cập Nhật Danh Mục</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group mb-3">
                <label for="edit-category-name">Code</label>
                <input v-model="update_Gg.code" type="text" id="edit-category-name" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-slug">Ngày Bắt Đầu</label>
                <input v-model="update_Gg.ngay_bat_dau" type="text" id="edit-category-slug" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-slug">Ngày Bắt Đầu</label>
                <input v-model="update_Gg.ngay_ket_thuc" type="text" id="edit-category-slug" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-name">Loại Giảm</label>
                <input v-model="update_Gg.loai_giam_gia" type="text" id="edit-category-name" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-name">Số Giảm Giá</label>
                <input v-model="update_Gg.so_giam_gia" type="text" id="edit-category-name" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-name">Số Tiền Tối Đa</label>
                <input v-model="update_Gg.so_tien_toi_da" type="text" id="edit-category-name" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label for="edit-category-name">Đơn dịch vụ Tối Thiểu</label>
                <input v-model="update_Gg.dk_toi_thieu_don_hang" type="text" id="edit-category-name" class="form-control" />
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Tình Trạng</label>
                <select v-model="update_Gg.tinh_trang" class="form-control">
                  <option value="1">Hoạt Động</option>
                  <option value="0">Dừng Hoạt Động</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#editModal"
                v-on:click="updateGg(update_Gg.id)">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
        <!-- Xóa Danh Mục -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Xóa Danh Mục</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Bạn có chắc chắn muốn xóa Mã Giảm Giá Này này?</p>
              <p><strong>{{ delete_Gg.code }}</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteMã"
              v-on:click="deleteGg(delete_Gg.id)">Xóa</button>
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
            GiamGia: [],
            create_Gg: {},
            update_Gg: {},
            delete_Gg: {},
        };
    },
    mounted() {
        this.loadusers();
    },
    methods: {
        toggleActive(item) {
      item.is_active = item.is_active == 1 ? 0 : 1;
    },
        loadusers() {
            axios
                .get("http://127.0.0.1:8000/api/admin/ma-giam-gia/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    console.log("Response data:", res.data.data);
                    if (res.data && res.data.data) {
                        this.GiamGia = res.data.data;
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu danh mục:", error);
                });
        },
        createGg() {
            axios
                .post("http://127.0.0.1:8000/api/admin/ma-giam-gia/create", this.create_Gg, {
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
        updateGg(id) {
            axios
            .put(`http://127.0.0.1:8000/api/admin/ma-giam-gia/update/${id}`, this.update_Gg, {
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
        deleteGg(id) {
            axios
                .delete(`http://127.0.0.1:8000/api/admin/ma-giam-gia/delete/${id}`, {
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
    },
}

</script>
<style scoped>
.container {
    padding: 20px;
}

.card {
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #f8f9fa;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.card-body {
    padding: 20px;
}

.btn-primary {
    background-color: #4CAF50;
    border-color: #4CAF50;
}

.btn-info {
    background-color: #17a2b8;
    border-color: #17a2b8;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.table-bordered {
    border: 1px solid #e5e5e5;
}

.table thead {
    background-color: #f1f1f1;
}

.badge {
    padding: 5px 10px;
    border-radius: 5px;
}
</style>