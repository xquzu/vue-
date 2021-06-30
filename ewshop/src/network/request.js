import axios from "axios";
import { Dialog ,Toast} from 'vant';
import router from '../router'

export function request(config){
const instance = axios.create({
    baseURL:'http://www.wcban.com',
    timeout:5000,//请求5秒
})

    //请求拦
instance.interceptors.request.use(config=>{
    //如果有一个接口需要认证才可以访问，就在这统一设置
    //首先把token拿出来
        const token = window.localStorage.getItem('token');
        //然后进行判断
        if(token) {
            config.headers.Authorization = 'Bearer '+token
        }
    //直接放行
    return config;
},err=>{
   return err;
})

    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data ? res.data : res;
    },err=>{
        //如果有需要授权才可以访问的接口，统一去login授权
        if(err.response.status == '401'){
            Toast.fail('请先登录')
            router.push({path:'./login'})
        }

        //如果有错误，这里会处理   显示错误信息
        Dialog.alert({
            message: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
            theme: 'round-button',
            confirmButtonColor:'rgb(190,175,238)',

        })
    })

    return instance(config)
}