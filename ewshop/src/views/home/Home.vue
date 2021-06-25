<template>
  <div id="home">
    <NavBar>
      <template v-slot:default>小迷糊</template>
    </NavBar>
    <!--5. 什么时候显示   v-show-->
    <tal-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销','新品','精选']"></tal-control>

    <div class="wrapper">
      <div class="content">
<!--        7.-->
        <div ref="banref">
          <!--1.把数据取出来传递过去-->
         <home-swiper :banners="banners"></home-swiper>

          <recommend-view :recommends="recommends"></recommend-view>

        </div>
        <tal-control @tabClick="tabClick" :titles="['畅销','新品','精选']"></tal-control>
        <goods-list :goods="showGoods"></goods-list>

      </div>
    </div>

    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
//自定义组件
import HomeSwiper from "@/views/home/ChlidComps/HomeSwiper";//轮播图
import NavBar from "components/common/navbar/NavBar";//标题栏
import RecommendView from "./ChlidComps/RecommendView";//推荐商品
import TalControl from "components/content/talControl/TalControl";//首页选项卡
import GoodsList from "components/content/goods/GoodsList";//商品列表
import BackTop from "components/common/backtop/BackTop";//置顶
//网络请求方法
import {getHomeAllData, getHomeGoods} from "network/home";
//vue方法
import {ref, onMounted, reactive, computed,watchEffect,nextTick} from 'vue';
//滚动组件
import BetterScroll from 'better-scroll';

export default {
  name: "Home",
  setup() {
    //6.
    let isTabFixed =ref(false);
    let isShowBackTop =ref(false);
    let banref = ref(null)
    const recommends = ref([]);
//商品列表数据模型
    const goods = reactive({
      sales: {page: 1, list: []},
      new: {page: 1, list: []},
      recommend: {page: 1, list: []},
    })
    //定义商品类型
    let currentType = ref('sales');
    //查看商品类型的数据
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    })

    let bscroll = reactive({})
    //2.先声明 banners
    let banners = ref([]);
    onMounted(() => {
      getHomeAllData().then(res => {
        recommends.value = res.goods
        console.log(res.goods);
        //3.获取轮播图的数据
        banners.value = res.slides;
        console.log(res.slides);

      })
      //畅销的
      getHomeGoods('sales').then(res => {
        goods.sales.list = res.goods
      })
      //推荐的
      getHomeGoods('recommend').then(res => {
        goods.recommend.list = res.goods
      })
      //新品
      getHomeGoods('new').then(res => {
        goods.new.list = res.goods
      })

      //创建BetterScroll对象
       bscroll = new  BetterScroll(document.querySelector('.wrapper'),{
        probeType:3,//0,1,2,3,3  只要在运动就触发scroll事件
        click:true,//是否允许点击
        pullUpLoad:true//上拉加载更多。默认是false
      });

      //触发滚动事件
      bscroll.on('scroll',(position) =>  {
        //8.如果滚动的高度大于中间一块的高度就为ture
        isShowBackTop.value = isTabFixed.value = (-position.y) > banref.value.offsetHeight
      })

      //上拉加载数据，触发pullingUp
      bscroll.on("pullingUp",() =>{
        console.log('上拉加载更多');

        //1.加载下一页
        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value,page).then(res=>{
          goods[currentType.value].list.push(...res.goods)
          goods[currentType.value].page += 1
        })

        //2.完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp();
        //3.重新计算高度
        bscroll.refresh();
        // console.log("contentheight"+document.querySelector('.content').clientHeight);
        // console.log("当前类型" + currentType.value + "当前页" + page);
      })


    })
    const tabClick = (index) => {
      let types = ['sales', 'new', 'recommend'];
      currentType.value = types[index];
      //4.
      //dom 渲染完成才执行的一个方法
      nextTick(()=>{
        //重新计算高度
        bscroll && bscroll.refresh();
      })
    }

    //监听  任何一个变量的变化
    watchEffect(() => {
      //dom 渲染完成才执行的一个方法
      nextTick(()=>{
        //重新计算高度
       bscroll && bscroll.refresh();
      })
    })

    //置顶  事件
    const bTop =  () => {
      //回到顶部方法
      bscroll.scrollTo(0,0,500);
    }
    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      isShowBackTop,
      banref,
      bTop,
      banners
    }
  },
  components: {
    NavBar,
    RecommendView,
    TalControl,
    GoodsList,
    BackTop,
    HomeSwiper

  }
}
</script>

<style>
.banners img {
  width: 100%;
  height: auto;
}

#home {
  height: 100vh;
  position: relative;
}

.wrapper {
  position: absolute;
  top:45px;
  bottom:50px;
  left:0px;
  right:0px;
  overflow: hidden;
}
.content{

}

</style>