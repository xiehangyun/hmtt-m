import Vue from 'vue'
import VueRouter from 'vue-router'
import logIn from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: logIn
  }
]

const router = new VueRouter({
  routes
})

export default router
