<template>
</template>
<script>
import axios from 'axios'
export default {
    props: ['id_nguoi_dung'],
    mounted() {
        this.guiIdNguoiDungLenBE();
    },
    methods: {
        guiIdNguoiDungLenBE(){
            const khachHang = {
                'id_nguoi_dung' : this.$route.params.id_nguoi_dung
            };
            axios
                .post("http://127.0.0.1:8000/api/nguoi-dung/kich-hoat", khachHang)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/nguoi-dung/dangnhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/nguoi-dung/dangnhap');

                    }
                })
        }
    }
}
</script>
<style>
    
</style>