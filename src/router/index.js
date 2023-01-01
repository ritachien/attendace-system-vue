import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/UserLogin.vue'
import UserHome from '../views/UserHome.vue'
import { useCurrentUserStore } from '../stores/currentUser'
import { popErrMsg } from '../utils/swal'

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

router.beforeEach((to, from, next) => {
  const userStore = useCurrentUserStore()
  const token = localStorage.getItem('token')
  const pathWithoutToken = ['login']
  // const pathAdminCanEnter = []

  if (!token && !pathWithoutToken.includes(to.name)) {
    popErrMsg('您無權訪問該頁面，請先進行登入')
    return next('login')
  } else if (token) {
    userStore.fetchCurrentUser()
  }
  next()
})

export default router
