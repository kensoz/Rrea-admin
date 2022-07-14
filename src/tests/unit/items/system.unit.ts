import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { plugins } from '../config'
import { auth } from '../mock/index'
import axios from 'axios'
// primevue
import Image from 'primevue/image'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Breadcrumb from 'primevue/breadcrumb'
import Message from 'primevue/message'
// コンポーネント
import Auth from '../../../views/pages/system/Auth.vue'
import About from '../../../views/pages/system/About.vue'

// ----- システムテスト -----
export const systemTest = (): void => {
  // 管理者関連
  test('管理者関連', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyGet = await vi.spyOn(axios, 'get').mockResolvedValue(auth)
    const spyDelete = await vi.spyOn(axios, 'delete').mockResolvedValue({
      code: 10008,
      message: 'ログアウト成功しました',
      result: '',
    })

    const wrapper = await mount(Auth, {
      global: {
        components: { Dialog, Breadcrumb, Button, Tag, InputText, Message, Column, DataTable },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('管理者権限を変更したい場合')
    // テーブル
    expect(wrapper.find('.p-datatable-wrapper').exists()).toBe(true)
    // axios get
    expect(axios.get).toHaveBeenCalledWith('/api/v1/auth')
    expect(axios.get).toHaveBeenCalled()
    // @ts-ignore
    expect(await axios.get().then(res => res)).toBe(auth)
    // ログアウト
    await wrapper.find('[data-test="delete"]').trigger('click')
    expect(axios.delete).toHaveBeenCalledTimes(1)
    // クリアモック
    spyGet.mockRestore()
    spyDelete.mockRestore()
  })

  // アバウト
  test('アバウト', async (): Promise<void> => {
    const wrapper = await mount(About, {
      global: {
        components: { Breadcrumb, Button, Image },
        plugins: plugins,
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
