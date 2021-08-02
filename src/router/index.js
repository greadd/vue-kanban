import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/board',
    name: 'Board',
    component: () => import('../views/Board.vue'),
  },
  {
    path: '/auth',
    name: 'Authorization',
    component: () => import('../views/UserAuth.vue'),
  },
  { path: '*', redirect: '/auth' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.fullPath === '/board') {
    if (!store.getters.token) {
      next('/auth')
    }
  }
  if (to.fullPath === '/auth') {
    if (store.getters.token) {
      next('/board')
    }
  }
  next()
})

export default router
