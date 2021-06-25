<template>
<div class="recommend">
   <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
     <a href="" @click.prevent="goD(item.id)">
       <img v-lazy="item.cover_url"  alt="">
       <div>{{item.title}}</div>
     </a>
   </div>
</div>
</template>

<script>
import {useRouter} from "vue-router"
export default {
name: "RecommendView",
  props:{
  recommends:{
    type:Array,
    default() {
      return []
    }
  }
  },

  setup() {
    const router = useRouter()
    const goD = (id) =>{
        router.push({path:'/detail',query:{id}})
    }
    return {
      goD,
    }
  }
}
</script>

<style scoped lang="scss">
.recommend{
  position: relative;
  width: 100%;
  display: flex;
  text-align: center;
  padding:15px 0 15px;
  border-bottom:8px solid ;
  background-image:linear-gradient(12deg, #ffffff, rgb(255,220,219));
  border-image:  linear-gradient(to right, rgb(190,175,238), rgb(160,231,238)) 8;
  font-size:12px;
  z-index: 1;
  .recommend-item{
    flex:1;
    img{
      width:70px;
      height:70px;
      margin-bottom: 10px;
      border-radius: 5px;
    }
    div{
      width: 70px;
      margin: 0px auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>