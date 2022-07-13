// ------------------------------
// *
// * Vue Router 4x
// * Router Mode : Hash
// *
// ------------------------------

import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { ADMIN_TOKEN } from '../store/type'
import { routes } from './routes'

// router
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Navigation Guards
router.beforeEach((to, from, next): void => {
  if (!sessionStorage.getItem(ADMIN_TOKEN) && to.name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
