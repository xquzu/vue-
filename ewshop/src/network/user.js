import { request } from "./request";

//封装注册请求
export function register(data){
    return request({
        url:'/api/auth/register',
        method:'post',
        data
    })
}

//封装登录请求
export function login(data){
    return request({
        url:'/api/auth/login',
        method:'post',
        data
    })
}

//封装退出登录
export function logout(data){
    return request({
        url:'/api/auth/logout',
        method:'post',
        data
    })
}
//获取用户信息
export function getUser(){
    return request({
        url:'/api/user',
    })
}