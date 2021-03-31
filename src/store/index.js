import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    data: null,
    rol: null,
    
  },
  mutations: {
    setUser(state, set) {
      state.user = set
    },
    setRol(state, set) {
      state.rol = set
    },
    setData(state, set) {
      state.data = set
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
    rol(state) {
      return state.rol
    },
    data(state) {
      return state.data
    },
    admin(state) {
      return state.rol == "Administrador";
    }
  }

  
})
