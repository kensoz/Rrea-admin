import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
// primevue
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import FileUpload from 'primevue/fileupload'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// コンポーネント
import AppAdminDialog from '../../components/base/AppAdminDialog.vue'
import AppFormDialog from '../../components/base/AppFormDialog.vue'
import AppNemberDialog from '../../components/base/AppNemberDialog.vue'

// ----- コンフィグ -----
const global = {
  components: { Dialog, Dropdown, Button, InputText, Message, FileUpload },
  plugins: [PrimeVue, ToastService, ConfirmationService],
}

// ----- ダイアログテスト -----
export const dialogPorpsTest = (): void => {
  // 管理者ダイアログ
  test('管理者ダイアログ', async (): Promise<void> => {
    const wrapper = await mount(AppAdminDialog, {
      global: global,
      props: {
        visible: true,
        adminId: 'guest',
      },
    })
    // props
    expect(wrapper.props().adminId).toBe('guest')
  })

  // フォームダイアログ
  test('フォームダイアログ', async (): Promise<void> => {
    const wrapper = await mount(AppFormDialog, {
      global: global,
      props: {
        visible: true,
        mode: 'create',
        form: {
          text: '',
          value: '01',
        },
      },
    })
    // props
    expect(wrapper.props().form.value).toBe('01')
  })

  // メンバーダイアログ
  test('メンバーダイアログ', async (): Promise<void> => {
    const wrapper = await mount(AppNemberDialog, {
      global: global,
      props: {
        visible: true,
        mode: 'create',
        form: {
          id: '00001',
          name: '',
          nameSpell: '',
          nameCode: '',
          job: '',
          jobCode: '',
          race: '',
          raceCode: '',
          skill: '',
          photo: '',
        },
      },
    })
    // props
    expect(wrapper.props().form.id).toBe('00001')
    expect(wrapper.props().mode).toBe('create')
  })
}
