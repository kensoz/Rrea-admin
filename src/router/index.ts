// ------------------------------
// *
// * Vue Router 4x
// * Router Mode : HTML5
// *
// ------------------------------

import { Router, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useMainStore } from '../store'

// routes
const routes: Array<RouteRecordRaw> = [
  {
    // ホームページ
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),

    // コンテンツページ
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/pages/Dashboard.vue'),
      },

      // フォーム
      {
        path: '/name',
        name: 'NameForm',
        component: () => import('../views/pages/form/NameForm.vue'),
      },
      {
        path: '/area',
        name: 'AreaForm',
        component: () => import('../views/pages/form/AreaForm.vue'),
      },
      {
        path: '/job',
        name: 'JobForm',
        component: () => import('../views/pages/form/JobForm.vue'),
      },
      {
        path: '/race',
        name: 'RaceForm',
        component: () => import('../views/pages/form/RaceForm.vue'),
      },

      // データ
      {
        path: '/data',
        name: 'Data',
        component: () => import('../views/pages/nember/Data.vue'),
      },
      {
        path: '/analyse',
        name: 'Analyse',
        component: () => import('../views/pages/nember/Analyse.vue'),
      },

      // システム
      {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/pages/system/Auth.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/pages/system/About.vue'),
      },

      // リダイレクト
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/pages/Dashboard.vue'),
      },
    ],
  },

  // ログインページ
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/pages/Login.vue'),
  },
]

// router
const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guards
router.beforeEach((to, from, next): void => {
  if (!sessionStorage.getItem('isLoggedIn') && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
