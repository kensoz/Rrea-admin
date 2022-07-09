import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
// primevue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import Dashboard from '../../components/dashboard/HomeClient.vue'

// ----- コンフィグ -----
const global = {
  plugins: [PrimeVue, ToastService, ConfirmationService],
}

// ----- ホームページテスト -----
export const homepageTest = (): void => {
  // ホームページ
  test('ホームページテスト', async (): Promise<void> => {
    const wrapper = await mount(Dashboard, { global: global })
    // レスポンシブ
    expect(wrapper.find('.mb-2').exists()).toBe(true)
  })
}
