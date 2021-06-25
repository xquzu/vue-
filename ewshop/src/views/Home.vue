<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
//异步处理生命周期  onMounted
import {onMounted} from 'vue';
//引用网络请求的方法
import {getHomeAllData} from "network/home";

export default {
  name: 'Home',
  setup() {
    onMounted(()=>{
      getHomeAllData().then(res=>{
        console.log(res);
      }).catch(err=>{
        return err
      })
    })
  },
  components: {

  }
}
</script>
