import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { plugins } from '../config'
// primevue
import Menu from 'primevue/menu'
import Image from 'primevue/image'
import Button from 'primevue/button'
// コンポーネント
import Footer from '../../../layouts/Footer.vue'
import Side from '../../../layouts/Side.vue'
import Header from '../../../layouts/Header.vue'

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
        plugins: plugins,
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
        plugins: plugins,
      },
    })

    // レスポンシブ
    expect(wrapper.find('.hidden').exists()).toBe(true)
  })
}
