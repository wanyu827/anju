import Vue from 'vue'
import App from './App.vue'
import './vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import router from '@/router'
import '@/assets/font/iconfont.css'
import store from '@/store'
import pinyin from 'js-pinyin'
import '@/styles/reset.less'
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
Vue.config.productionTip = false

new Vue({
  pinyin,
  store,
  router,
  render: (h) => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
