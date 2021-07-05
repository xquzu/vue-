const  mutations = {
    setIsLogin(state,payload){
        state.user.islogin = payload;
    },
    //购物车的数量
    addCart(state,payload){
        state.cartCount = payload.count;
    }
}

export default  mutations;