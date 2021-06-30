import {request} from "./request"


//请求商品列表接口所有数据
export function getgoodsAllData() {
    return request({
        url: './api/goods',
    })
}
//3加上参数获取数据
export function getcategoryGoods(order='sales',cid=0,page=1) {
    return request({
        url: './api/goods?category_id='+cid+'&page='+page+'&'+order+'=1',
    })
}