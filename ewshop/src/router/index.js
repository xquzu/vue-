import {createRouter, createWebHistory} from 'vue-router'
// import {useStore} from "vuex";
import {Dialog} from 'vant'
//设置懒加载路由
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')
const Profile = () => import('../views/profile/Profile')
const ShopCart = () => import('../views/shopcart/ShopCart')
const Register = () => import('../views/profile/Register')
const Login = () => import('../views/profile/Login')
import store from '../store'
import Address from "@/views/profile/Address";
import AddressEdit from "@/views/profile/AddressEdit";
const routes = [
    {
        path: '',
        name: 'DefaultHome',
        component: Home,
        //原元素
        meta:{
            title:"小迷糊"
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        //原元素
        meta:{
            title:"小迷糊"
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        //原元素
        meta:{
            title:"小迷糊-商品分类"
        }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
        //原元素
        meta:{
            title:"小迷糊-商品详情"
        }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
        //原元素
        meta:{
            title:"小迷糊-个人中心",
            isAuthRequired:true
        }
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart,
        //原元素
        meta:{
            title:"小迷糊-购物车",
            isAuthRequired:true
        }
    },
    //地址管理
    {
        path: '/address',
        name: 'Address',
        component: Address,
        //原元素
        meta:{
            title:"地址管理",
            isAuthRequired:true
        }
    },
    //地址编辑
    {
        path: '/addressedit',
        name: 'Addressedit',
        component: AddressEdit,
        //原元素
        meta:{
            title:"地址编辑",
            isAuthRequired:true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        //原元素
        meta:{
            title:"用户注册"
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        //原元素
        meta:{
            title:"用户登录"
        }
    },


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//前置导航守卫
router.beforeEach( (to,from,next) => {
//如果没有登录，在这里直接到login
    if(to.meta.isAuthRequired && store.state.user.islogin === false){

        Dialog.alert({
            message: '你还没有登录，亲先登录！！',
            theme: 'round-button',
            confirmButtonColor: 'rgb(190,175,238)',

        })
        return next('/login')
    }else{
        next();
    }


    document.title = to.meta.title;
})

export default router
