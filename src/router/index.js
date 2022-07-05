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
const HouseDetails = () => import('@/components/HouseDetails.vue')
const Map = () => import('@/views/Map')
const AddHouse = () => import('@/components/AddHouse.vue')
const RentSearch = () => import('@/components/RentSearch.vue')

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
    { path: '/rent', component: Rent },
    { path: '/add', component: AddHouse },

    { name: 'details', path: '/details/:id', component: HouseDetails, props: true },
    // { path: '/map', component: Map },
    { name: 'map', path: '/map', component: Map, props: true },
    { path: '/rentsearch', component: RentSearch }

  ]
})

export default router
