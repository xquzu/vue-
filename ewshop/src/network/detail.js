import {request} from "./request"


//请求商品详情接口所有数据
export function getDetail(id) {
    return request({
        url: `./api/goods/${id}`,
    })
}