<template>
  <div class="NavBar">
    <div class="left " @click="goback"><slot name="left">
      <img src="~assets/images/left.png" alt="">
    </slot></div>
    <div class="center"><slot>ewshop</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { useRouter } from  "vue-router"
export default {
name: "NavBar",
  setup () {
    const router =useRouter();
    const goback = () => {
      router.go(-1);
    }
    return {
      goback
    }
  }
}
</script>

<style scoped>
.NavBar{
  display:flex;
  background:linear-gradient(to right, rgb(190,175,238), rgb(160,231,238));
  color:#FFFFFF;
  position:fixed;
  left:0;
  right:0;
  top:0;
  z-index:9;
  height:45px;
  line-height:45px;
  text-align: center;
  box-shadow: 0 2px 0px rgba(100,100,100,0.1);
}
.right,.left{
  width: 60px;
}
.center{
  /*background: bisque;*/
  flex: 1;
}
.left img{
  width: 45px;
  padding: 13px;
}

</style>