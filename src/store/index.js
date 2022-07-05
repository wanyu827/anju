import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentCity: '',
    community: ''
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.token = payload
    },
    delUser (state, payload) {
      state.token = ''
    },
    setCurrentCity (state, payload) {
      state.currentCity = payload
    },
    setCommunity (state, payload) {
      state.community = payload
    },
    delCommunity (state) {
      state.community = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
