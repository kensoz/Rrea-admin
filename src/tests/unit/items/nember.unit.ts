import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { plugins } from '../config'
import { nember } from '../mock/index'
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
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Image from 'primevue/image'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
// コンポーネント
import Data from '../../../views/pages/nember/Data.vue'
import Analyse from '../../../views/pages/nember/Analyse.vue'

// ----- メンバーテスト -----
export const nemberTest = (): void => {
  // メンバー
  test('メンバーフォーム', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(nember)
    const wrapper = await mount(Data, {
      global: {
        components: {
          Dialog,
          Breadcrumb,
          Button,
          Tag,
          InputText,
          Message,
          Column,
          DataTable,
          Dropdown,
          Image,
          FileUpload,
        },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('ゲストさんはメンバーのCRUDができますが、ローカルのCURDでデータへの反映はしません')
    // レスポンシブ
    expect(wrapper.find('.max-w-8rem').exists()).toBe(true)
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/user')
    expect(axios.get).toHaveBeenCalled()
    // @ts-ignore
    expect(await axios.get().then(res => res)).toBe(nember)
    // クリアモック
    spyGet.mockRestore()
  })

  // 分析と予想
  test('分析と予想フォーム', async (): Promise<void> => {
    const wrapper = await mount(Analyse, {
      global: {
        components: { Breadcrumb, Button, TabView, TabPanel },
        plugins: plugins,
      },
    })
    // タブー
    expect(wrapper.find('.p-tabview-nav').exists()).toBe(true)
  })
}
