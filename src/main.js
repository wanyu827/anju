import Vue from 'vue'
import App from './App.vue'
import './vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import router from '@/router'
import '@/assets/font/iconfont.css'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
