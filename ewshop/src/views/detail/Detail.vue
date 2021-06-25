<template>
  <NavBar>
    <template v-slot:default>商品详:{{ id}}</template>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {useRouter} from "vue-router";
import {ref} from 'vue';
export default {
name: "Detail",
  setup () {
    const router = useRouter();
    let id = ref(0);
    id.value = router.query.id

    return {
      id,
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>