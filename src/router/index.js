import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/UserLogin.vue'
import UserHome from '../views/UserHome.vue'
import UserClock from '../views/users/UserClock.vue'
import GpsClock from '../views/users/GpsClock.vue'
import QrGenerator from '../views/admin/QrGenerator.vue'

import { useCurrentUserStore } from '../stores/currentUser'
import { popErrMsg } from '../utils/swal'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/admin',
      name: 'admin-home',
      component: () => import('../views/AdminHome.vue'),
      redirect: '/admin/users',
      children: [
        {
          path: 'qr',
          name: 'qr-generator',
          component: QrGenerator,
        },
        {
          path: 'users',
          name: 'user-list',
          component: () => import('../views/admin/UserList.vue')
        },
        {
          path: 'newUser',
          name: 'add-user',
          component: () => import('../views/admin/AddUser.vue')
        },
        {
          path: 'records/today',
          name: 'record-today',
          component: () => import('../views/admin/RecordToday.vue')
        },
      ]
    },
    {
      path: '/user',
      name: 'user-home',
      component: UserHome,
      redirect: '/user/clock',
      children: [
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('../views/users/UserEdit.vue')
        },
        {
          path: 'clock',
          name: 'user-clock',
          component: UserClock,
          redirect: '/user/clock/gps',
          children: [
            {
              path: 'gps',
              name: 'gps-clock',
              component: GpsClock
            },
            {
              path: 'qr',
              name: 'qr-clock',
              component: () => import('../views/users/QrClock.vue')
            },
          ]
        }
      ]
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
  const isAdmin = userStore.currentUser.isAdmin
  const isAuthenticated = userStore.isAuthenticated
  const token = localStorage.getItem('token')
  const pathWithoutToken = '/login'

  if (token) {
    userStore.fetchCurrentUser()
  }

  if (!token && pathWithoutToken !== to.path) {
    // 沒有登入卻想進入設定權限的路由，直接導回登入頁面
    popErrMsg('您無權訪問該頁面，請先進行登入')
    return next('/login')
  } else if (isAuthenticated && !isAdmin && ((/^\/admin/).test(to.path))) {
    // 已登入的 user 想進入 admin 路由
    popErrMsg('您無權訪問該頁面')
    return next(from)
  } else if (isAuthenticated && isAdmin && ((/^\/user/).test(to.path))) {
    // 已登入的 admin 想進入 user 路由
    popErrMsg('您無權訪問該頁面')
    return next(from)
  } else {
    next()
  }
})

export default router
