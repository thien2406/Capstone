import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default function(to, from, next) {
    axios
        .get('http://127.0.0.1:8000/api/check-nhanvien', {
            headers : {
                Authorization : 'Bearer ' +  localStorage.getItem("token_nhan_vien")
            }
        })
        .then((res) => {
            if(res.data.status) {
                next();
            } else {
                next('/nhan-vien/dangnhap');
                toaster.error(res.data.message);
            }
        });
}