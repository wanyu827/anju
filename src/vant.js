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
  Popup,
  Picker,
  Sticky,
  List,
  IndexAnchor, Form, Field, Button, Toast, Grid, GridItem, Dialog, Empty, Uploader
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
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Dialog)
Vue.use(Empty)
Vue.use(Uploader)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Sticky)
Vue.use(List)
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})
