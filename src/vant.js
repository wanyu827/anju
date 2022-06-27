import Vue from 'vue'
import {
  Cell,
  CellGroup,
  Lazyload,
  Icon,
  Image as VanImage,
  Col,
  Row,
  Search,
  Swipe,
  SwipeItem,
  NavBar,
  Tabbar,
  TabbarItem,
  IndexBar,
  IndexAnchor, Form, Field, Button, Toast
} from 'vant'
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(Search)
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})
