<template>
  <div>
    <NavBar>
      <template v-slot:default>用户注册</template>
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
              v-model="name"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="password_confirmation"
              type="password"
              name="确认密码"
              label="确认密码"
              placeholder="确认密码"
              :rules="[{ required: true, message: '请填写一致密码' }]"
          />
          <van-field
              v-model="email"
              type="email"
              name="邮箱"
              label="邮箱"
              placeholder="填写邮箱"
              :rules="[{ required: true, message: '请填写正确格式邮箱' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block color="linear-gradient(to right, rgb(190,175,238), rgb(160,231,238))" type="primary"
                      native-type="submit">
            提交
          </van-button>
          <div class="link-login" @click="$router.push({path:'/login'})">
              已有账号?立即登录
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
import {Dialog, Toast} from 'vant';
import {register} from "network/user";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const userinfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: '',

    })
    const onSubmit = () => {
      //1.首先先验证
      if (userinfo.password != userinfo.password_confirmation) {
        Dialog.alert({
          message: '两次密码不一致，请重新填写！！！',
          theme: 'round-button',
          confirmButtonColor: 'rgb(190,175,238)',

        })
      } else {
        //2.提交给服务器
        register(userinfo).then(res => {
          if (res.status == '201') {
            Toast.success('注册成功');

            setTimeout(() => {
              router.push({path: '/login'})
            }, 1000)

            userinfo.password = '';
            userinfo.password_confirmation = '';
          }
        })
      }

    }

    return {
      ...toRefs(userinfo),
      userinfo,
      onSubmit
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