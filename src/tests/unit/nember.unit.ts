import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createPinia } from 'pinia'
import { routes } from '../../router/routes'
import { createRouter, createWebHistory } from 'vue-router'
// primevue
import PrimeVue from 'primevue/config'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb'
import Message from 'primevue/message'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import Data from '../../views/pages/nember/Data.vue'
import Analyse from '../../views/pages/nember/Analyse.vue'

// ----- コンフィグ -----
// router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// store
const pinia = createPinia()

// ----- メンバーテスト -----
export const nemberTest = (): void => {
  // メンバー
  test('メンバーフォーム', async (): Promise<void> => {
    const wrapper = await mount(Data, {
      global: {
        components: { Dialog, Breadcrumb, Button, Tag, InputText, Message, Column, DataTable },
        plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんはメンバーのCRUDができますが、ローカルのCURDでデータへの反映はしません')
    // レスポンシブ
    expect(wrapper.find('.max-w-8rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })

  // 分析と予想
  test('分析と予想フォーム', async (): Promise<void> => {
    const wrapper = await mount(Analyse, {
      global: {
        components: { Breadcrumb, Button, TabView, TabPanel },
        plugins: [router, PrimeVue, ConfirmationService],
      },
    })
    // タブー
    expect(wrapper.find('.p-tabview-nav').exists()).toBe(true)
  })
}
