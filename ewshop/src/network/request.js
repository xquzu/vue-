import axios from "axios";

export function request(config){
const instance = axios.create({
    baseURL:'http://www.wcban.com',
    timeout:5000,//请求5秒
})

    //请求拦
instance.interceptors.request.use(config=>{
    //如果有一个接口需要认证才可以访问，就在这统一设置

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

        //如果有错误，这里会处理   显示错误信息
        return err;
    })

    return instance(config)
}