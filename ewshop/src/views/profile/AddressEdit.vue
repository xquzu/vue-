<template>
  <div class="address-edit">
    <NavBar>
      <template v-slot:default>{{ title }}</template>
    </NavBar>
    <van-address-edit style="margin-top:45px;text-align: left"
                      :area-list="areaList"
                      :address-info="addressInfo"
                      :show-delete="type == 'edit'"
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      :area-columns-placeholder="['请选择', '请选择', '请选择']"
                      @save="onSave"
                      @delete="onDelete"
                      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {reactive, onMounted, toRefs, computed} from "vue";
import {address} from "network/address";
import {tdist} from "utils/address";
import {Toast} from "vant";
import {useRouter, useRoute} from "vue-router"
import {EditAddress, getAddressDetail,DelAddress} from "@/network/address";

export default {
  name: "AddressEdit",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      //区域列表
      areaList: {
        //省的列表
        province_list: {},
        city_list: {},//市的列表
        county_list: {}//县得列表
      },
      searchResult: [],
      addressInfo: {},
      type: 'add',
      addressId: '',
      title: ''
    })

    onMounted(() => {
      //省市区 列表 构造出来
      let _province_list = {};
      let _city_list = {};
      let _county_list = {};

      //遍历
      tdist.getLev1().forEach(q => {
        _province_list[q.id] = q.text;
        tdist.getLev2(q.id).forEach(c => {
          _city_list[c.id] = c.text;
          tdist.getLev3(c.id).forEach(p => {
            _county_list[p.id] = p.text;
          })
        })
      })
      state.areaList.province_list = _province_list;
      state.areaList.city_list = _city_list;
      state.areaList.county_list = _county_list;
      //接收参数
      const {type, addressId} = route.query;
      state.type = type;
      state.addressId = addressId;

      //如果是编辑的时候
      if (type == 'edit') {
        getAddressDetail(addressId).then(res => {
          const addressDetail = res;
          let _areaCode = '';
          const province = tdist.getLev1()
          //遍历城市     Object.entries  这是能拿到对象的键 和 值
          Object.entries(state.areaList.county_list).forEach(([id, text]) => {
            //首先找出 当前对应的区
            if (text == addressDetail.county) {
              //找到区对应的几个省份
              const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
              //找到对应的几个市区
              const cityItem = Object.entries(state.areaList.city_list).filter(([cityId]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
              //对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
              if (province[provinceIndex].text == addressDetail.province && cityItem[1] == addressDetail.city) {
                _areaCode = id;
              }
            }
          })
          state.addressInfo = {
            name: addressDetail.name,
            tel: addressDetail.phone,
            province: addressDetail.province,
            city: addressDetail.county,
            areaCode: _areaCode,
            isDefault: !!addressDetail.is_default,
            addressDetail: addressDetail.address,
          }
        })
      }
    })
    //判断标题是什么类型的
    const title = computed(() => {
      return state.type == 'add' ? '新增地址' : '编辑地址';
    })

    //保存
    const onSave = (content) => {
      // console.log(content);
      console.log(content.isDefault);
      const params = {
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0
      }

      if (state.type == 'edit') {
        //调用修改的接口
        EditAddress(state.addressId,params).then(res=>{
          if (res.status == '200' || res.status == '201') {
            Toast('修改成功');
            setTimeout(() => {
              router.back();
            }, 1000);
          }
        })
      } else if (state.type == 'add') {
        //调用接口添加数据
        address(params).then(res => {
          if (res.status == '200' || res.status == '201') {
            Toast('保存成功');
            setTimeout(() => {
              router.back();
            }, 1000);
          }
        })
      }
    }
const onDelete = () =>{
  DelAddress(state.addressId).then(res=>{
        Toast('删除成功');
        setTimeout(() => {
          router.back();
        }, 1000);
        return res;
      })
    }
    return {
      ...toRefs(state),
      onSave,
      title,
      onDelete
    }
  },
  components: {
    NavBar,

  }
}
</script>

<style scoped>

</style>