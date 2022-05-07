import Vue from 'vue'
import Router from 'vue-router'

// 导入路由组件 路由懒加载
const Home = () => import('@/views/Home/Home.vue')
const Category = () => import('@/views/Category/Category.vue')
const ShopCart = () => import('@/views/ShopCart/ShopCart.vue')
const Profile = () => import('@/views/Profile/Profile.vue')
const Detail = () => import('@/views/Detail/Detail.vue')

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/shopcart',
    component: ShopCart,
  },
  {
    path: '/profile',
    component: Profile,
  },
]

export default new Router({
  routes,
})
