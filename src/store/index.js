import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    admin: null,
    
  },
  mutations: {
    setUser(state, set) {
      state.user = set
    },
    setAdmin(state, set) {
      state.admin = set
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    user(state) {
      return state.user
    },
    admin(state) {
      return state.admin
    },
  }

  
})
