<template>

  <router-view v-slot="{ Component }">
    <transition>
      <!--      缓存-->
      <!--      <keep-alive>-->
      <component :is="Component"/>
      <!--      </keep-alive>-->
    </transition>
  </router-view>

  <div id="nav" style="z-index: 134">
    <router-link to="/" class="tab-bar-items">
      <div class="icon"><i class="iconfont icon-dianpu"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="tab-bar-items">
      <div class="icon"><i class="iconfont icon-fenlei1"></i></div>
      <div>分类</div>
    </router-link>
    <router-link to="/shopcart" class="tab-bar-items">
      <van-badge :content="$store.state.cartCount" max="9">
        <div class="icon"><i class="iconfont icon-shop"></i></div>
      </van-badge>
      <div>购物车</div>


    </router-link>
    <router-link to="/profile" class="tab-bar-items">
      <div class="icon"><i class="iconfont icon-gerenzhongxin"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>
<script>
import {onMounted} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    const store = useStore();
    onMounted(()=>{
      store.dispatch('updateCart')
    })
  }
}
</script>
<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #f6f6f6;;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: rgb(190, 175, 238);
    }
  }

  .tab-bar-items {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
    //color: ;
  }

  .tab-bar-items .icon {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
    display: inline-block;
  }
}

.iconfont {
  font-size: 23px;
}
</style>
