import {request} from "./request"


//请求首页接口所有数据
export function getHomeAllData() {
    return request({
        url: './api/index',
    })
}

//获取首页的数据      传参类型默认是销量的  页数默认一页
export function getHomeGoods(type = 'sales', page = 1) {
    return request({
        url: '/api/index?' + type + '=1&page=' + page,
    })
}