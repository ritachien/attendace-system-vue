import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/UserLogin.vue'
import UserHome from '../views/UserHome.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/admin',
      name: 'admin-home',
      component: () => import('../views/AdminHome.vue')
    },
    {
      path: '/users',
      name: 'user-home',
      component: UserHome
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'root',
      redirect: '/login'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
