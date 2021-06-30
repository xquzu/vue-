<template>
<div class="tal-control">
  <div class="tal-control-item "
       v-for="(item,index) in titles"
       :key="index"
       @click="itemClick(index)"
       :class="{active:index == currentIndex}"
  >
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
import {ref} from "vue";
export default {
name: "TalControl",
  props:{
    titles:{
      type:Array,
      default () {
        return [];
      }
    }
  },
  setup (props,{emit}) {
    let currentIndex = ref(0);
    const itemClick = (index) => {
      currentIndex.value=index
      emit('tabClick',index)
    }
    return {
      currentIndex,
      itemClick
    }
  }
}
</script>

<style scoped lang="scss">
.tal-control{
  display: flex;
  height:40px;
  line-height:40px;
  text-align: center;
  font-size:14px;
  background-color: #FFFFFF;
  width:100%;
  position:sticky;
  top:44px;
  z-index: 10;
  box-shadow: #f1f1 5px 5px 5px ;
  .tal-control-item{
      flex:1;
    span{
      padding: 7px;
    }
  }
  .active{
    color:rgb(160,231,238);
    span{
      border-bottom: 3px solid rgb(160,231,238);
    }
  }
}

</style>