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
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import AreaForm from '../../views/pages/form/AreaForm.vue'
import JobForm from '../../views/pages/form/JobForm.vue'
import NameForm from '../../views/pages/form/NameForm.vue'
import RaceForm from '../../views/pages/form/RaceForm.vue'

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
  components: { Dialog, Breadcrumb, Button, Tag, InputText, Message, Column, DataTable },
  plugins: [router, PrimeVue, ToastService, ConfirmationService, pinia],
}

// ----- フォームテスト -----
export const formTest = (): void => {
  // エリア
  test('エリアフォーム', async (): Promise<void> => {
    const wrapper = await mount(AreaForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('センサーでエリアを自動更新しますので、閲覧のみです')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })

  // 職務
  test('職務フォーム', async (): Promise<void> => {
    const wrapper = await mount(JobForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんは職務フォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })

  // 種族
  test('種族フォーム', async (): Promise<void> => {
    const wrapper = await mount(RaceForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんは種族フォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })

  // ネーム
  test('ネームフォーム', async (): Promise<void> => {
    const wrapper = await mount(NameForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんはネームフォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
  })
}
