import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const SearchHouse = () => import('@/views/SearchHouse')
const MyInfo = () => import('@/views/MyInfo')
const Information = () => import('@/views/Information')
const CityList = () => import('@/components/CityList.vue')
const Login = () => import('@/views/Login')
const Favorites = () => import('@/views/Favorites')
const Rent = () => import('@/views/Rent')

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: 'home', component: Home },
        { path: 'searchhouse', component: SearchHouse },
        { path: 'myinfo', component: MyInfo },
        { path: 'information', component: Information }

      ]
    },
    { path: '/city', component: CityList },
    { path: '/login', component: Login },
    { path: '/favorites', component: Favorites },
    { path: '/rent', component: Rent }
  ]
})

export default router
