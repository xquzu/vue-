<template>
  <div class="address" >
    <NavBar>
      <template v-slot:default>地址管理</template>
    </NavBar>
    <div v-show="list.length == 0" style="height:500px;line-height: 550px">
<i style="margin: auto;font-size: 25px;color: #00CED1">还没有地址信息，去添加吧！</i>
    </div>
    <van-address-list class="address-input"
                      v-model="chosenAddressId"
                      :list="list"
                      :disabled-list="disabledList"
                      default-tag-text="默认"
                      @add="onAdd"
                      @edit="onEdit"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getAddressList} from "network/address";
import {onMounted, reactive,toRefs} from "vue";
import {useRouter} from "vue-router";
import  {Toast} from  "vant";

export default {
  name: "Address",

  setup() {
    const router = useRouter();
    const state = reactive({
      list: []
    })
    onMounted(() => {
      Toast.loading('加载中')
      getAddressList().then(res=>{
        // console.log(res);
        if(res.data.length == 0){
          state.list = [];
          return;
        }

        state.list = res.data.map(item=>{
          return{
            id:item.id,
            name:item.name,
            tel:item.phone,
            address:`${item.province} ${item.city} ${item.county} ${item.address}`,
            //两个！！ 是转为布尔型
            isDefault:!!item.is_default
          }
        })
      })

    })
    const onAdd = () => {
      router.push({path: '/addressedit', query: {type: 'add'}})
    }
    const onEdit = (item) => {
      router.push({path: '/addressedit', query: {type: 'edit', addressId: item.id}})
    }
    return {
      onAdd,
      onEdit,
      ...toRefs(state)
    }
  },
  components: {
    NavBar,
  }
}
</script>

<style scoped>
/deep/
.van-address-list__bottom {
  z-index: -1;
  margin-bottom: 45px;
  border: 1px solid #f1f1f1;
  padding: 5px 5px 16px;

}
/deep/
.van-address-list{
  padding-bottom: 0;
  z-index: 1;
  position: relative;
}

/deep/
.van-button {
  background: linear-gradient(to right, rgb(190, 175, 238), rgb(160, 231, 238));
  border: 1px solid;
  border-image: linear-gradient(to right, rgb(190, 175, 238), rgb(160, 231, 238));
}
/deep/
.van-radio-group{
  margin-bottom: 45px;
  /*z-index: -1;*/
  /*position: relative;*/
}
.address-input {
  margin-top: 45px;
  text-align: left;
}
</style>