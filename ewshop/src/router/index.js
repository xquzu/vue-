import {createRouter, createWebHistory} from 'vue-router'

//设置懒加载路由
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')
const Profile = () => import('../views/profile/Profile')
const ShopCart = () => import('../views/shopcart/ShopCart')

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
            title:"小迷糊-个人中心"
        }
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart,
        //原元素
        meta:{
            title:"小迷糊-购物车"
        }
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//导航守卫
router.beforeEach( (to,from,next) => {
//如果没有登录，在这里直接到login
    next();

    document.title = to.meta.title;
})

export default router
