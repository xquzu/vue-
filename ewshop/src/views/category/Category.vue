<template>
  <div>
  <NavBar>
    <template v-slot:default>商品分类</template>
  </NavBar>

  <div id="mainbox">
    <div class="ordertab">
      <van-tabs v-model="active" @click="tabClick">
        <van-tab title="销量排序"></van-tab>
        <van-tab title="价格排序"></van-tab>
        <van-tab title="评论排序"></van-tab>
      </van-tabs>
    </div>

    <van-sidebar class="leftmenu" v-model="activeKey">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="item in categories" :key="item.id" :title="item.name" :name="item.name">
          <van-sidebar-item v-for="sub in item.children" :key="sub.id" @click="getGoods(sub.id)" :title="sub.name"/>
        </van-collapse-item>

      </van-collapse>
    </van-sidebar>
    <div class="goodslist">
      <div class="content">
        <van-card v-for="item in showgoods" :key="item.id"
                  @click="itemClick(item.id)"
                  :num="item.stock"
                  :tag="item.stock <= 100 ? '流行' :'新品'"
                  :price="item.price+'.80'"
                  :desc="item.description"
                  :title="item.title"
                  :thumb="item.cover_url"
                  :lazy-load="true"
                  :origin-price="item.price * 2"

        />
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
  </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import BackTop from "components/common/backtop/BackTop";//置顶
import {getgoodsAllData, getcategoryGoods} from "network/category";
import {useRouter} from "vue-router";

import {ref, onMounted, reactive, computed, watchEffect, nextTick} from 'vue';
//1.滚动组件
import BetterScroll from 'better-scroll';


export default {
  name: "Category",
  setup() {
    const router = useRouter();
    let active = ref(1);
    let activeKey = ref(0);
    let activeName = ref(1);
    let categories = ref([]);

    //排序的条件
    let currentOrder = ref('sales');
    let isShowBackTop = ref(false);
    //当前分类的id
    let currentcid = ref(0);

    //1.数据模型
    const goods = reactive({
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []},
    })

    //2.计算属性 通过计算属性显示数据    商品数据
    const showgoods = computed(() => {
      //返回后当前商品的当前的类型
      return goods[currentOrder.value].list;
    })
    //4.初始化的时候获取数据
    const init = () => {
      getcategoryGoods('sales', currentcid.value).then(res => {
        goods.sales.list = res.goods.data
      })
      getcategoryGoods('price', currentcid.value).then(res => {
        goods.price.list = res.goods.data
      })
      getcategoryGoods('comments_count', currentcid.value).then(res => {
        goods.comments_count.list = res.goods.data
      })
    }

    //2.声明滚动对象
    let bscroll = reactive({})
    //当页面加载完成挂载数据
    onMounted(() => {
      getgoodsAllData().then(res => {
        categories.value = res.categories;
        //5调用获取数据
        init();
      })

      //3.创建BetterScroll对象
      bscroll = new BetterScroll(document.querySelector('.goodslist'), {
        probeType: 3,//0,1,2,3,3  只要在运动就触发scroll事件
        click: true,//是否允许点击
        pullUpLoad: true//上拉加载更多。默认是false
      });

      //触发滚动事件
      bscroll.on('scroll', (position) => {
        //8.如果滚动的高度大于中间一块的高度就为ture
        isShowBackTop.value = (-position.y) > 300
      })

      //4.滚动加载事件
      //上拉加载数据，触发pullingUp
      bscroll.on("pullingUp", () => {

        //1.1定义分页
        //1.2 当用户点击选项卡时也要重新获取一下数据
        getcategoryGoods(currentOrder.value, currentcid.value).then(res => {
          //1.3把数据展开追加到商品后面
          goods[currentOrder.value].list.push(...res.goods.data)
          goods[currentOrder.value].page += 1

        })
        //2.完成上拉，等数据请求完成，要将新数据展示出来
        bscroll.finishPullUp();
        //3.重新计算高度
        //6.点击选项卡时也要刷新一下
        nextTick(() => {
          //重新计算高度
          bscroll && bscroll.refresh();
        })

      })

    })

    //排序选项卡  默认会把id传过来
    const tabClick = (index) => {
      let orders = ['sales', 'price', 'comments_count'];
      currentOrder.value = orders[index];
      //7.当用户点击选项卡时也要重新获取一下数据
      getcategoryGoods(currentOrder.value, currentcid.value).then(res => {
        console.log(res.goods.data);
        goods[currentOrder.value].list = res.goods.data
        //6.点击选项卡时也要刷新一下
        nextTick(() => {
          //重新计算高度
          bscroll && bscroll.refresh();
        })
      })


      console.log(currentcid.value);
      console.log(currentOrder.value);
    }

    //通过分类获取商品
    const getGoods = (cid) => {
      currentcid.value = cid;
      //6.通过分类获取商品调用一下获取数据
      init()
      console.log(currentcid.value);
      console.log(currentOrder.value);
    }

    //5.监听  任何一个变量的变化
    watchEffect(() => {
      //dom 渲染完成才执行的一个方法
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      })
    })

    //置顶  事件
    const bTop = () => {
      //回到顶部方法
      bscroll.scrollTo(0, 0, 500);
    }

    return {
      activeKey,
      categories,
      activeName,
      active,
      tabClick,
      getGoods,
      goods,
      showgoods,
      bscroll,
      isShowBackTop,
      bTop,
      itemClick: (id) => {
        router.push({path:'/detail',query:{id}})
      }

    }
  },
  components: {
    NavBar,
    BackTop,
  }
}
</script>

<style scoped lang="scss">
.van-tabs__nav--line{
  padding-bottom: 8px;
}

#mainbox {
  margin-top: 45px;
  display: flex;

  .ordertab {
    flex: 1;
    float: right;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;

  }

  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
  }

  .goodslist {
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    height: 100vh;
    padding: 10px;
    text-align: left !important;

    .content {
      //padding-top:100px;
    }
  }

  .van-card {
    border-radius: 10px;
  }

  .van-card__thumb {
    width: 68px;
  }

}
</style>