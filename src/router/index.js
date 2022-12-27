import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/UserLogin.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/users/login',
      name: 'user-login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
