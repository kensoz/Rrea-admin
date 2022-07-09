import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createPinia } from 'pinia'
import { routes } from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
// primevue
import PrimeVue from 'primevue/config'
import Image from 'primevue/image'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb'
import Message from 'primevue/message'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import Auth from '../../views/pages/system/Auth.vue'
import About from '../../views/pages/system/About.vue'

// ----- コンフィグ -----
// router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// store
const pinia = createPinia()

// ----- システムテスト -----
export const systemTest = (): void => {
  // 管理者関連
  test('管理者関連', async (): Promise<void> => {
    const wrapper = await mount(Auth, {
      global: {
        components: { Breadcrumb, Button, Tag, InputText, Message, Column, DataTable },
        plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('管理者権限を変更したい場合')
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })

  // アバウト
  test('アバウト', async (): Promise<void> => {
    const wrapper = await mount(About, {
      global: {
        components: { Breadcrumb, Button, Image },
        plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('メンバー位置と情報の管理システムRreaの管理者用サイト')
    // テキスト
    expect(wrapper.text()).toContain('Waiting for Your Star !')
    // レスポンシブ
    expect(wrapper.find('.pt-1').exists()).toBe(true)
  })
}
