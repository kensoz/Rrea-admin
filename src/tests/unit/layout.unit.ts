import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createPinia } from 'pinia'
import { routes } from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
// primevue
import PrimeVue from 'primevue/config'
import Menu from 'primevue/menu'
import Image from 'primevue/image'
import Button from 'primevue/button'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import Footer from '../../layouts/Footer.vue'
import Side from '../../layouts/Side.vue'
import Header from '../../layouts/Header.vue'

// ----- コンフィグ -----
// router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// store
const pinia = createPinia()

// ----- レイアウトテスト -----
export const layoutTest = (): void => {
  // Footer
  test('Footerレイアウト', async (): Promise<void> => {
    const wrapper = await mount(Footer)
    // テキスト
    expect(wrapper.text()).toContain('Rrea-Admin')
  })

  // Side
  test('Sideレイアウト', async (): Promise<void> => {
    const wrapper = await mount(Side, {
      global: {
        components: { Menu },
        plugins: [router, PrimeVue, ConfirmationService, pinia],
      },
    })

    // テキスト
    expect(wrapper.text()).toContain('ダッシュボード')
    // メニュー
    expect(wrapper.find('.flex-grow-1').exists()).toBe(true)
  })

  // Header
  test('Headerレイアウト', async (): Promise<void> => {
    const wrapper = await mount(Header, {
      global: {
        components: { Menu, Image, Button },
        plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
      },
    })

    // レスポンシブ
    expect(wrapper.find('.hidden').exists()).toBe(true)
  })
}
