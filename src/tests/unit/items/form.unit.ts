import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { plugins } from '../config'
import { form } from '../mock/index'
import axios from 'axios'
// primevue
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb'
import Message from 'primevue/message'
// コンポーネント
import AreaForm from '../../../views/pages/form/AreaForm.vue'
import JobForm from '../../../views/pages/form/JobForm.vue'
import NameForm from '../../../views/pages/form/NameForm.vue'
import RaceForm from '../../../views/pages/form/RaceForm.vue'

// ----- コンフィグ -----
const global = {
  components: { Dialog, Breadcrumb, Button, Tag, InputText, Message, Column, DataTable },
  plugins: plugins,
}

// ----- フォームテスト -----
export const formTest = (): void => {
  // エリア
  test('エリアフォーム', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(form)
    const wrapper = await mount(AreaForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('センサーでエリアを自動更新しますので、閲覧のみです')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/area')
    expect(axios.get).toHaveBeenCalled()
    // クリアモック
    spyGet.mockRestore()
  })

  // 職務
  test('職務フォーム', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(form)
    const wrapper = await mount(JobForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんは職務フォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/job')
    expect(axios.get).toHaveBeenCalled()
    // クリアモック
    spyGet.mockRestore()
  })

  // 種族
  test('種族フォーム', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(form)
    const wrapper = await mount(RaceForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんは種族フォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/race')
    expect(axios.get).toHaveBeenCalled()
    // クリアモック
    spyGet.mockRestore()
  })

  // ネーム
  test('ネームフォーム', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(form)
    const wrapper = await mount(NameForm, { global: global })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんはネームフォームのCRUDができません')
    // レスポンシブ
    expect(wrapper.find('.max-w-10rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/name')
    expect(axios.get).toHaveBeenCalled()
    // クリアモック
    spyGet.mockRestore()
  })
}
