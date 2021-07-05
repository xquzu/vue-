import {getCart} from "network/cart";

const action = {
    updateCart({commit})
    {
        getCart().then(res => {
            commit('addCart', {count: res.data.length || 0})
        })
    }
}

export  default action;