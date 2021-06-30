<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="product.cover_url" alt="">
    <div class="goods-info">
      <p class="title">{{ product.title }}</p>
      <span class="price"><small>￥</small>{{ product.price }}.80</span>
      <span class="stock">{{product.sales}}人付款</span>

    </div>
  </div>
</template>

<script>
import {useRouter} from  "vue-router";
export default {
  name: "GoodsListItem",
  props: {
    product: Object,
    default() {
      return {}
    }
  },
  setup(props) {
    const router = useRouter();

    return {
      itemClick () {
        router.push({path:'./detail',query:{id:props.product.id}})
      }
    }
  }

}
</script>

<style scoped lang="scss">
.goods-item {
  width: 45%;
  height:250px;
  padding-bottom: 40px;
  position: relative;

  img {
    width: 100%;
    border-radius: 5px;

  }

  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: left;
    padding: 0px 10px;
    margin-top: 10px;
    height: 55px;
    .title{
      font-size: 16px;
      font-weight: bold;
    }
    .stock{
      font-size: 12px;
      color: #cccccc;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .price {
      color: red;
      margin-right: 5px;
      font-size: 15px;
    }

    .collect {
      position: relative;
    }

    .collect:before {
      content: '';
      position: absolute;
      left: -15px;
      width: 14px;
      height: 14px;
      top: -1px;
      background: url("~assets/images/collect.png") 0 0/14px 14px;
    }
  }
}


</style>