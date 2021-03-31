import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'logup',
    component: () => import('@/components/Signup.vue'),
  },
  {
    path: '/',
    name: 'productos',
    component: () => import('@/views/Productos.vue'),
  },
  {
    path: '/DashBoard',
    component: () => import('@/views/DashBoard.vue'),
    meta: {
      admin: true,
    },
    children: [

      {
        path: '/Usuarios',
        name: 'usuarios',
        component: () => import('@/views/DashBoard/TableUsers.vue'),

        meta: {
          admin: true
        },
      },
      {
        path: '/Productos',
        name: 'tablaProductos',
        component: () => import('@/views/DashBoard/TableProductos.vue'),

        meta: {
          admin: true
        },
      },
     
    ],
    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.admin) {
    if (store.state.user && store.getters.admin) {
      next();
    } else if (store.state.user && !store.getters.admin) {
      if (to.name === "DashBoard") {
        next({
          name: 'productos'
        }); 
      } else {
        next();
      }

    } else {
      next({
        name: 'home'
      });
    }
  } else {
    next();
  }



});

export default router
