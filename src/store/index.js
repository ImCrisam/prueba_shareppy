import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    data: null,
    rol: null,
    compra:null,
    
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
    setCompra(state, set) {
      state.compra = set
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
    compra(state) {
      return state.compra
    },
    admin(state) {
      return state.rol == "Administrador";
    }
  }

  
})
