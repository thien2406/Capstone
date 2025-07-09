<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
        <div class="card mb-4 shadow-sm custom-card" style="width: 100%; max-width: 600px;">
            <div class="card-body">
                <h5 class="card-title text-center mb-4">Chi Tiết Đơn dịch vụ Theo Giờ</h5>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered custom-table">
                        <tbody>
                            <tr>
                                <th class="table-header">Mã Đơn dịch vụ</th>
                                <td class="table-data">123</td>
                            </tr>
                            <tr>
                                <th class="table-header">Trạng Thái Đơn dịch vụ</th>
                                <td>
                                    <span class="badge bg-success custom-badge">Đang Thực Hiện</span>
                                </td>
                            </tr>
                            <tr>
                                <th class="table-header">Tên Khách Hàng</th>
                                <td class="table-data">Nguyên Văn Thiẹnewqewqeqw</td>
                            </tr>
                            <tr>
                                <th class="table-header">Số Điện Thoại</th>
                                <td class="table-data">0382155620</td>
                            </tr>
                            <tr>
                                <th class="table-header">Địa Chỉ Cung Cấp Dịch Vụ</th>
                                <td class="table-data">Hòa Vang</td>
                            </tr>
                            <tr>
                                <th class="table-header">Ngày Bắt Đầu</th>
                                <td class="table-data">24/06/2003</td>
                            </tr>
                            <tr>
                                <th class="table-header">Giờ Bắt Đầu</th>
                                <td class="table-data">8:00</td>
                            </tr>
                            <tr>
                                <th class="table-header">Giờ Kết Thúc</th>
                                <td class="table-data">10:00</td>
                            </tr>
                            <tr>
                                <th class="table-header">Tên Nhân Viên Giúp Việc</th>
                                <td class="table-data"></td>
                            </tr>
                            <tr>
                                <th class="table-header">Kinh Nghiệm Nhân Viên</th>
                                <td class="table-data"></td>
                            </tr>
                            <tr>
                                <th class="table-header">Số Điện Thoại Nhân Viên</th>
                                <td class="table-data"></td>
                            </tr>
                            <tr>
                                <th class="table-header">Ghi Chú</th>
                                <td class="table-data"></td>
                            </tr>
                            <tr>
                                <th class="table-header">Tổng Chi Phí</th>
                                <td class="table-data"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-center mt-4">
                    <button type="button" class="btn btn-primary me-2 px-4 custom-btn">Quay về Trang Chủ</button>
                    <button type="button" class="btn btn-danger px-4">Đã Hoàn Thành</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>

<style scoped>

.table {
    font-size: 1rem;
    color: #495057;
}

.table th {
    font-weight: bold;
    background-color: #f8f9fa;
    color: #495057;
    padding: 10px;
    text-align: left;
}

.table td {
    padding: 10px;
    color: #212529;
}
.table-striped tbody tr:nth-child(odd) {
    background-color: #f9fafb;
}
.card-title {
    font-weight: bold;
    font-size: 1.25rem;
    color: #000000;
}
.btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 25px;
    transition: all 0.3s ease;
}
</style>
