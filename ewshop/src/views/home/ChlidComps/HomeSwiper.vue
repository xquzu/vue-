<template>
  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item,index) in banners" :key="index" class="height">
      <img v-lazy="item.img_url" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: Array,
    default() {
      return []
    }
  }
}
</script>

<style scoped>
.height{
  height:153.61px;
}
img{
  width: 100%;
  height: 100%;
}

</style>