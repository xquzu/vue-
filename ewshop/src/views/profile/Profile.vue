<template>
  <div class="user">
  <NavBar>
    <template v-slot:default>个人中心</template>
  </NavBar>
    <section style="margin-top: 44px;padding-top: 20px">
      <div class="user-pro">
        <div class="user-img"><img src="~assets/images/p.jpg" alt=""></div>
        <div class="user-content">
          <p>昵称 :&nbsp; {{user.name}}</p>
          <p>邮箱 :&nbsp; {{user.email}}</p>
          <p>个性签名 :&nbsp; 美丽与知识共存</p>
        </div>
      </div>
    </section>
    <div class="user-icon">
      <p @click="goTo('./collect')">
        <span>我的收藏</span>
        <span><van-icon name="arrow" /></span>
      </p>
      <p @click="goTo('./order')">
        <span>我的订单</span>
        <span><van-icon name="arrow" /></span>
      </p>
      <p @click="goTo('./setting')">
        <span>账号管理</span>
        <span><van-icon name="arrow" /></span>
      </p>
      <p @click="goTo('./address')">
        <span>地址管理</span>
        <span><van-icon name="arrow" /></span>
      </p>
      <p @click="goTo('./about')">
        <span>关于我们</span>
        <span><van-icon name="arrow" /></span>
      </p>
    </div>
  <div style="margin:35px 15px 0px 15px;padding-bottom: 80px">
    <van-button @click="tologout" round block color="linear-gradient(to right, rgb(190,175,238), rgb(160,231,238))">退出登录</van-button>
  </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {logout,getUser} from "network/user";
import {Toast} from 'vant';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {onMounted,reactive,toRefs} from 'vue';
export default {
name: "Profile",
  setup(){
  const  router = useRouter();
  const store = useStore();
  const state = reactive({
    user:{}
  })
    onMounted(()=>{
      getUser().then(res=>{
        console.log(res);
        state.user = res;
      })
    })
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

    //跳转公用的方法
    const goTo  = (path,query) => {
        router.push({path,query:query || {}})
    }
    return {
      tologout,
      ...toRefs(state),
      goTo
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped lang="scss">
.user{
  background: #FFFAFA;
}
.user-pro{
  margin: 0px 10px 60px 10px ;
  padding: 20px 10px;
  display: flex;
  background:linear-gradient(30deg, rgb(190,175,238), rgb(160,231,238)) ;
  border-radius: 10px;
  .user-img{
    width: 88px;
    margin: 10px;
    border-radius: 100%;
    img{
      width: 100%;
      height:100%;
      border-radius: 100%;
    }
  }
  .user-content{
    margin: 10px 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    color:white;
    font-size: 15px;
    justify-content: space-around;
  }
}
.user-icon>p{
  font-size: 15px;
  color: #778899;
  display: flex;
  justify-content: space-between;
  padding:15px 10px;
  background: #FFFFFF;
  margin: 10px 0px 15px 0px;
}
</style>