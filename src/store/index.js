import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    rol: null,
    
  },
  mutations: {
    setUser(state, set) {
      state.user = set
    },
    setRol(state, set) {
      state.rol = set
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
    admin(state) {
      return state.rol == "Administrador";
    }
  }

  
})
