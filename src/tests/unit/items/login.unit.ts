import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { plugins } from '../config'
import { login } from '../mock/index'
import axios from 'axios'
// primevue
import Tag from 'primevue/tag'
import Image from 'primevue/image'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
// コンポーネント
import Login from '../../../views/pages/Login.vue'

// ----- ログインテスト -----
export const loginTest = (): void => {
  // ログイン
  test('ログインテスト', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue(login)
    const wrapper = await mount(Login, {
      global: {
        components: { Image, Button, Tag, InputText },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('ゲストはこのままログインしてください')
    // フォーム
    expect(wrapper.find('.p-error').exists()).toBe(false)
    // テーブル
    expect(wrapper.find('.p-inputgroup-addon').exists()).toBe(true)
    // フォーム
    expect(wrapper.find('input').element.value).toBe('guest')
    // ログイン
    await wrapper.get('button').trigger('click')
    expect(axios.post).toHaveBeenCalled()
    // クリアモック
    spyPost.mockRestore()
  })
}
