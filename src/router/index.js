import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        component: () => import('@/views/tabbar/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/tabbar/qa')
      },
      {
        path: 'video',
        component: () => import('@/views/tabbar/video')
      },
      {
        path: 'myuser',
        component: () => import('@/views/tabbar/myuser')
      }
    ]
  },
  {
    path: '/userPage/:userById',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
