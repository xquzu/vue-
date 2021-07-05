<template>
  <div>
    <NavBar>
      <template v-slot:default>商品详情</template>
    </NavBar>

    <van-image style="margin-top: 45px"
               width="100%"
               :src="detail.cover_url"
    />
    <van-card style="text-align: left;font-size: 16px"
              :price="detail.price ?? ''"
              :num="detail.stock"
              :desc="detail.description"
              :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right:3px;font-size: 13px">{{ stock }}</van-tag>
        <van-tag plain type="danger" style="font-size: 13px;margin: 5px 0px">包邮</van-tag>
      </template>
    </van-card>


    <div>
      <van-tabs v-model="active">
        <van-tab title="概述">
          <div class="content" v-html="detail.details"></div>
        </van-tab>
        <van-tab title="热评">
<!--          <div v-for="item in detail.comments" :key="item.id"></div>-->
          <div style="border:1px solid red;height:200px">
            <div class="comment-card">
              <div></div>
            </div>
          </div>
        </van-tab>
        <van-tab title="相关产品">
          <goods-list :goods="link_goods"></goods-list>
        </van-tab>
      </van-tabs>
    </div>
    <van-action-bar style="margin-bottom: 30px">
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24"/>
      <van-action-bar-icon icon="cart-o" @click="cart" text="购物车"/>
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000"/>
      <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车"/>
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买"/>
    </van-action-bar>

  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref, onMounted, reactive, toRefs} from 'vue';
import {getDetail} from "network/detail";
import {addCart} from "network/cart";
import {Toast} from "vant";

export default {
  name: "Detail",
  setup() {

    let active = ref(1);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref(0);
    //2.创建模型
    let book = reactive({
      detail: {},
      link_goods: {},
      comments: [],
      user:[],
      stock: {},
    })
    onMounted(() => {
      id.value = route.query.id
      //1.请求数据
      getDetail(id.value).then(res => {
        //3.把每一个都赋值给book模型
        book.detail = res.goods
        book.link_goods = res.link_goods
        book.user = res.comments.user;
        book.stock = res.goods.stock <= 100 ? '流行' : '新品';
      })

    })
    //添加购物车
    const handleAddCart = () => {
      addCart({goods_id: book.detail.id, num: 1}).then(res => {
        // console.log(res.status)
        if (res.status == '204' || res.status == '201') {
          Toast.success('加入购物车成功')
          //dispatch 分发  设置状态中  countCart数量
          store.dispatch('updateCart');
        }
      })
    }

    //立即购买
    const goToCart = () => {
      // addCart({goods_id: book.detail.id, num: 1}).then(res => {
      //   // console.log(res.status)
      //   if (res.status == '204' || res.status == '201') {
      //     Toast.success('加入购物车成功')
      //
      //   }
      // })
    }
    console.log(book);
    //购物车
    const cart = () =>{
      router.push('/shopcart')
    }
    return {
      id,
      //4.解构一下把里面的每一个单独返回
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart,
      cart

    }
  },
  components: {
    NavBar,
    GoodsList

  }
}
</script>

<style scoped>
/deep/
.van-card__title {
  width: 100%;
  line-height: 20px;
  font-size: 20px;
  margin: 7px 0px;
  font-weight: bold;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/
.van-card__price-integer {
  color: red;
  font-size: 20px;
}

/deep/
.van-card__price-currency {
  color: red;
  font-size: 20px;
}

/deep/
.van-card__price-decimal {
  color: red;
  font-size: 16px;
}

/deep/
.van-action-bar {
  bottom: 20px;
}

/deep/
.van-tabs__content {
  margin-bottom: 99px;
  background: #f1f1f1;
}

/deep/
.content {
  margin-bottom: 99px;
  background: #f1f1f1;
}

/deep/
.goods-item:last-child {

}

/deep/
.goods[data-v-800e70f6] {
  justify-content: space-between;
  margin: 0px 10px;
}

/deep/
.goods-item[data-v-6fbca6b8] {
  width: 47%;
  height: 245px;
  background: #FFFFFF;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 5px;
}

/deep/
.goods-info[data-v-6fbca6b8] {
  height: 50px;
}

/deep/
.content img {
  width: 100%;
}

/*评论*/
.comment-card{
  border:1px solid red;
  height:100px;
  width: 95%;
  margin: 10px auto;
  border-radius: 5px;
}
</style>