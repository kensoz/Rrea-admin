import { mount } from '@vue/test-utils'
import { test, expect, vi } from 'vitest'
import { plugins } from '../config'
import { users } from '../mock/index'
import axios from 'axios'
// primevue
import Image from 'primevue/image'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Skeleton from 'primevue/skeleton'
// コンポーネント
import HomeClient from '../../../components/dashboard/HomeClient.vue'
import HomeLink from '../../../components/dashboard/HomeLink.vue'
import HomeData from '../../../components/dashboard/HomeData.vue'
import HomeWelcome from '../../../components/dashboard/HomeWelcome.vue'

// ----- ホームページテスト -----
export const homepageTest = (): void => {
  // Clientプレビュー
  test('Clientプレビュー', async (): Promise<void> => {
    // axiosを監視して、モックデータを設定
    const spyPost = await vi.spyOn(axios, 'post').mockResolvedValue(users)
    const wrapper = await mount(HomeClient, {
      global: {
        components: { Skeleton, Button, Image, Tag },
        plugins: plugins,
      },
    })
    // レスポンシブ
    expect(wrapper.find('.mb-2').exists()).toBe(true)
    // axios
    const params = { areaCode: '', jobCode: [], nameCode: [], raceCode: [] }
    expect(axios.post).toHaveBeenCalledWith('/api/v1/data', params)
    // @ts-ignore
    expect(await axios.post().then(res => res)).toBe(users)
    // クリアモック
    spyPost.mockRestore()
  })

  // HomeLink
  test('HomeLink', async (): Promise<void> => {
    const wrapper = await mount(HomeLink, {
      global: {
        components: { Button },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('GitHub')
  })

  // HomeData
  test('HomeData', async (): Promise<void> => {
    const wrapper = await mount(HomeData, {
      global: {
        components: { Button },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('システムデータ')
  })

  // HomeWelcome
  test('HomeWelcome', async (): Promise<void> => {
    const wrapper = await mount(HomeWelcome, {
      global: {
        components: { Button },
        plugins: plugins,
      },
    })
    // テキスト
    expect(wrapper.text()).toContain('管理者設定')
  })
}
