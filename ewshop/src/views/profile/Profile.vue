<template>
  <div>
  <NavBar>
    <template v-slot:default>个人中心</template>
  </NavBar>
  <div style="margin: 15px;margin-top: 100px">
    <van-button @click="tologout" round block color="linear-gradient(to right, rgb(190,175,238), rgb(160,231,238))">退出登录</van-button>
  </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {logout} from "network/user";
import {Toast} from 'vant';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
name: "Profile",
  setup(){
  const  router = useRouter();
  const store = useStore();
    const tologout = () => {
      logout().then(res=>{
        if(res.status == '204'){
            Toast.success('退出成功')

          //清除token   window.localStroage
          window.localStorage.setItem('token','')
          store.commit('setIsLogin',false);
          setTimeout(()=>{
            router.push({path:'/login'});
          },500)
        }
      })
    }
    return {
      tologout
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>