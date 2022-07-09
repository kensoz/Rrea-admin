import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createPinia } from 'pinia'
import { routes } from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
// primevue
import PrimeVue from 'primevue/config'
import Tag from 'primevue/tag'
import Image from 'primevue/image'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import Login from '../../views/pages/Login.vue'

// ----- コンフィグ -----
// router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// store
const pinia = createPinia()
// mount global
const global = {
  components: { Image, Button, Tag, InputText },
  plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
}

// ----- ログインテスト -----
export const loginTest = (): void => {
  // ログイン
  test('ログインテスト', async (): Promise<void> => {
    const wrapper = await mount(Login, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストはこのままログインしてください')
    // フォーム
    expect(wrapper.find('.p-error').exists()).toBe(false)
    // テーブル
    expect(wrapper.find('.p-inputgroup-addon').exists()).toBe(true)
  })
}
