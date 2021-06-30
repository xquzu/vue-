<template>
  <div>
    <NavBar>
      <template v-slot:default>用户登录</template>
    </NavBar>
    <div style="margin-top: 50px">
      <div style="text-align: center;padding-top: 50px">
        <van-image
            width="15rem"
            height="5rem"
            src="https://shopapi-xqz.oss-cn-beijing.aliyuncs.com/logo.png"
        />
      </div>
    </div>
    <div style="margin-top: 30px">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="email"
              type="email"
              name="邮箱"
              label="邮箱"
              placeholder="填写邮箱"
              :rules="[{ required: true, message: '请填写正确格式邮箱' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />


        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block color="linear-gradient(to right, rgb(190,175,238), rgb(160,231,238))" type="primary"
                      native-type="submit">
            提交
          </van-button>
          <div class="link-login" @click="$router.push({path:'/register'})">
              没有账号?立即注册
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {reactive, toRefs} from "vue";
import {useRouter} from "vue-router";
import { Toast} from 'vant';
import {login} from "network/user";
import {useStore} from 'vuex';

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const  store = useStore();
    const userinfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: '',

    })
    const onSubmit = () => {
      login(userinfo).then(res=>{
        //1将token保存到本地  window.localStorage  setItem(key,value)  getItem(key)
          window.localStorage.setItem('token',res.access_token)
        //在vuex   islogin
        console.log(store)
            store.commit('setIsLogin',true);
        //在vuex  临时isLogin
        Toast.success('登录成功');
          userinfo.email = '' ;
          userinfo.password = '' ;

          setTimeout(() => {
            router.go(-1);
          },500)
      })
    }

    return {
      ...toRefs(userinfo),
      userinfo,
      onSubmit,
    }
  },
  components: {
    NavBar,

  }
}
</script>

<style scoped>
.link-login{
  text-align: left;
  margin-top: 10px;
  font-size: 13px;
  padding-left: 10px;
  color:  rgb(155,201,238);
}
</style>