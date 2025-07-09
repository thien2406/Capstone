<template>
  <div class="container" style="margin-top: -90px">
    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5>THÊM MỚI DỊCH VỤ</h5>
          </div>
          <div class="card-body">
        <div class="form-group mb-3">
            <label for="category-name">Tên Dịch Vụ</label>
            <input v-model="create_Dv.ten_lua_chon" type="text" id="category-name" class="form-control"
                   placeholder="Nhập tên danh mục"/>
        </div>
        <div class="form-group mb-3">
            <label for="category-icon">Icon</label>
            <input v-model="create_Dv.icon_dich_vu" type="text" id="category-icon" class="form-control"
                   placeholder="Nhập icon"/>
        </div>
        <div class="form-group mb-3">
            <label for="category-icon">Lựa Chọn Danh Mục</label>
              <select v-model="create_Dv.id_muc" class="form-control">
                <option v-for="(value, index) in DanhMuc" :key="index" :value="value.id">
                  {{ value.ten_muc }}
                  </option>
            </select>
        </div>
        <div class="form-group mb-3">
            <label class="form-label">Tình Trạng</label>
            <select v-model="create_Dv.is_active" class="form-control">
                <option value="1">Hoạt Động</option>
                <option value="0">Dừng Hoạt Động</option>
            </select>
          </div>
            <button v-on:click="createDich_Vu()" type="button" class="btn btn-primary w-100">Thêm Mới</button>
        </div>
        </div>
      </div>
      <!-- Danh Sách Danh Mục -->
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h5>DANH SÁCH DỊCH VỤ</h5>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                    <th class="text-center">#</th>
                    <th class="text-center">Tên Danh Mục</th>
                    <th class="text-center">Slug Danh Mục</th>
                    <th class="text-center">Icon</th>
                    <th class="text-center">Id Mục</th>
                    <th class="text-center">Tình Trạng</th>
                    <th class="text-center" style="width: 22%;" >Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in DichVu" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ value.ten_lua_chon }}</td>
                    <td class="text-center">{{ value.slug_dich_vu }}</td>
                    <td class="text-center">{{ value.icon_dich_vu }}</td>
                    <td class="text-center">{{ value.id_muc }}</td>
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
                      <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#editModal"
                      v-on:click="Object.assign(update_Dv, value)">Cập nhật</button>
                      <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                      v-on:click="delete_Dv = value">Xóa</button>
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
              <label for="edit-category-name">Tên Danh Mục</label>
              <input v-model="update_Dv.ten_lua_chon" type="text" id="edit-category-name" class="form-control" />
            </div>
            <div class="form-group mb-3">
              <label for="edit-category-slug">Slug Danh Mục</label>
              <input v-model="update_Dv.slug_dich_vu" type="text" id="edit-category-slug" class="form-control" />
            </div>
            <div class="form-group mb-3">
              <label for="edit-category-icon">Icon</label>
              <input v-model="update_Dv.icon_dich_vu" type="text" id="edit-category-icon" class="form-control" />
            </div>
            <div class="form-group mb-3">
            <label for="category-icon">Id</label>
              <select v-model="update_Dv.id_muc" class="form-control">
                <option v-for="(value, index) in DanhMuc" :key="index" :value="value.id">
                  {{ value.ten_muc }}
                  </option>
            </select>
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Tình Trạng</label>
              <select v-model="update_Dv.is_active" class="form-control">
                <option value="1">Hoạt Động</option>
                <option value="0">Dừng Hoạt Động</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#editModal"
            v-on:click="updateDichVu(update_Dv.id)">Cập nhật</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Xóa -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Xóa Danh Mục</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa Danh Mục này?</p>
            <p><strong>{{ delete_Dv.ten_lua_chon }}</strong></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletedanhmuc"
            v-on:click="deleteDichVu(delete_Dv.id)">Xóa</button>
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
      DichVu: [],
      create_Dv: {},
      update_Dv: {},
      delete_Dv: {},
      DanhMuc:[],
    };
  },
  mounted() {
    this.loaddichvu();
    this.loadDanhMuc();
  },
  methods: {
    toggleActive(item) {
      item.is_active = item.is_active == 1 ? 0 : 1;
    },
    loadDanhMuc() {
      axios
        .get("http://127.0.0.1:8000/api/admin/getDataDanhMuc", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          console.log("Response data:", res.data.data);
          if (res.data && res.data.data) {
            this.DanhMuc = res.data.data;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu danh mục:", error);
        });
    },
    loaddichvu() {
      axios
        .get("http://127.0.0.1:8000/api/admin/getDataDichVu", {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          console.log("Response data:", res.data.data);
          if (res.data && res.data.data) {
            this.DichVu = res.data.data;
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
        });
    },
    createDich_Vu() {
      axios
        .post("http://127.0.0.1:8000/api/admin/createDichVu", this.create_Dv, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          if (res.data.status) {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
            this.$toast.success(thong_bao);
            this.loaddichvu();
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
    updateDichVu(id) {
      axios
      .put(`http://127.0.0.1:8000/api/admin/updateDichVu/${id}`, this.update_Dv, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token_admin")
        }
      })
        .then((res) => {
          if (res.data.status) {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
            this.$toast.success(thong_bao);
            this.loaddichvu();
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
    deleteDichVu(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/admin/deleteDichVu/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token_admin")
          }
        })
        .then((res) => {
          if (res.data.status) {
            var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
            this.$toast.success(thong_bao);
            this.loaddichvu();
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
  border: 0px solid #e5e5e5;
}

.table thead {
  background-color: #f1f1f1;
}

.badge {
  padding: 5px 10px;
  border-radius: 5px;
}
</style>