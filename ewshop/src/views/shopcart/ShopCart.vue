<template>
  <div class="cart">
    <NavBar>
      <template v-slot:default>购物车</template>
    </NavBar>
    <div class="cardCart">
      <van-checkbox-group v-model="result" @change="groupChange">
        <van-swipe-cell class="cardShop" v-for="(item,index) in list" :key="index.id">
<!--          5.进行数据遍历-->
          <div class="goods-card" >
            <van-checkbox :name="item.id"></van-checkbox>
            <div class="goods-img">
              <img :src="item.goods.cover_url" alt="">
            </div>
            <div class="goods-desc">
              <div class="goods-title">
                <span class="goode-title-span">{{item.goods.title}}</span>
                <span>x{{item.goods.stock}}</span>
              </div>
              <div class="goods-btn">
                <span style="color:red"><small>￥</small>{{item.goods.price}}</span>
                <span>
                  <van-stepper v-model="value"
                               :min="1"
                               :model-value="item.num"
                               :max="item.goods.stock"
                               integer
                               :name="item.id"
                               async-change
                               @change="onChange"/>
                </span>
              </div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" class="delete-button" @click="deleteClick(item.id)">
              <van-icon name="delete-o" />
            </van-button>
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="total * 100"  button-text="结算" @submit="onSubmit" style="margin-bottom: 50px;padding: 10px 0px">
      <van-checkbox @click="allCheck" v-model:checked=checkedAll>全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <img class="empty-cart" src="~assets/images/carts.png" alt="" style="width:80%">
      <van-button round color="linear-gradient(to right, rgb(190,175,238), rgb(160,231,238))" type="primary" @click="goTo" style="font-weight: bold;font-size: 20px;color:#FDF5E6;">去选购吧！！！</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {reactive,toRefs,onMounted,computed} from "vue";
import {useRouter} from "vue-router";
import {Toast} from "vant";
import { getCart,modifyCart, chenkedCart,deleteCartItem} from "network/cart";
import { useStore} from  "vuex";
export default {
  name: "ShopCart",
  setup() {
    const router = useRouter();
    const store = useStore();
    //1.创建数据模型
    const state = reactive({
      list:[],
      result:[],
      checkedAll:true,
    })
    //3 初始化购物车数据
    const init = () =>{
      Toast.loading({message:'加载中...',forbidClick:true})
      //4获取数据
      getCart('include=goods').then(res=>{
        console.log(res);

        state.list = res.data
        state.result = res.data.filter(n=>n.is_checked == 1).map(item => item.id);
        Toast.clear();
      })
    }

    onMounted(()=>{
      init();
    })
    //通过计算属性 计算总价
    const total = computed(() =>{
      let sum = 0;
      state.list.filter(item=> state.result.includes(item.id))
          .forEach(item=>{
            //parseInt  转为整数     parseFloat  转为浮点数
            sum += parseInt(item.num) * parseFloat( item.goods.price);
          })
      return sum;
    })
    //6.异步改变购物车数量
    const onChange = (value,detail) =>{
      Toast.loading({message:'修改中...',forbidClick:true})
      //接收数量的值
      // console.log(value);
      //接收的商品的id
      // console.log(detail.name);
      //7.修改指定商品的数量的值
      modifyCart(detail.name,{num:value}).then(res=>{
        //8.将在onMounted中的list中的num也要改
        state.list.forEach(item => {
          if(item.id == detail.name) {
            item.num = value;
          }
        })
       Toast.clear();
       return res;
      })
    }
    //复选框改变处理
    const groupChange = (result) => {
      console.log(result);
      if(result.length == state.list.length){
        state.checkedAll = true;
      }else{
        state.checkedAll = false;
      }
      state.result = result;
      //改变数据表中选中状态
      chenkedCart({cart_ids:result})
    }
    //全选与反选
    const allCheck = ()=>{
     if(!state.checkedAll){
       state.result = state.list.map(item=>item.id)
       state.checkedAll = true;
     }else{
       state.result = [];
       state.checkedAll = false;
     }
    }
    //删除商品
    const  deleteClick = (id) => {
      deleteCartItem(id).then(res=>{
          init();//重新初始化
        store.dispatch('updateCart');//改变vuex中的状态数量
        return res;
      })
    }
    // 创建订单
    const onSubmit = () => {
      if(state.result.length == 0){
        Toast.fail('请选择商品结算！！！');
        return ;
      }else{
        router.push({path:'/createotder'});
      }
    }
    //2前往购物
    const goTo = () => {
      router.push({path:'/home'})
    }


    return {
      ...toRefs(state),
      goTo,
      groupChange,
      allCheck,
      onChange,
      deleteClick,
      total,
      onSubmit
    }
  },

  components: {
    NavBar
  }
}
</script>

<style scoped lang="scss">
.goods-card {
  margin: 0;
  background-color: #F8F8FF;
  border-radius: 10px 10px;
  padding: 15px;
  display: flex;
  margin-bottom: 10px;

  .goods-img {
    width: 88px;
    height:88px;
    margin: 10px;
    img{
      width:100%;
    }
  }
  .goods-desc{
    width: 60%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .goods-title{
      display: flex;
      justify-content: space-between;
      .goode-title-span{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
    }
    .goods-btn{
      display: flex;
      justify-content: space-between;
    }
  }
}

.delete-button {
  width: 80px;
  height: 100%;
  border-radius: 0px 10px 10px 0px;
  background:  rgb(221,160 ,221);
  border:0px;
  .van-icon:before{
    font-size: 30px;
  }
}

.cart {
  background: white;
  min-height: 680px;
  height: 100%;
}

.cardCart {
  margin-top: 45px;
  padding: 10px;
  margin-bottom: 115px;
  .cardShop {
    text-align: left;
    border-radius: 10px;
  }
}
</style>