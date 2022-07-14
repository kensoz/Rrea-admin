import { createPinia } from 'pinia'
import { routes } from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
// primevue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// ----- コンフィグ -----
// router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// store
const pinia = createPinia()
// mount global plugins
export const plugins = [router, PrimeVue, ToastService, ConfirmationService, pinia]
