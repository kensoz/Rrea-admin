import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IAuth } from '../types'
import useStorage from '../hooks/useStorage'

// Pinia Composition API mode
export const useMainStore = defineStore('main', () => {
  // ----- use hooks -----
  const { checkReloadStorage } = useStorage()

  // ########## state ##########
  const isDark = ref<boolean>(false) // ダークモード
  const isNavBar = ref<boolean>(false) // スマートフォン ナビバー
  const isFirstLogin = ref<boolean>(false) // 初めてのログイン

  // 管理者情報
  const admin = reactive<IAuth>({
    id: checkReloadStorage('id'),
    passWord: 'guest',
    permission: Number(checkReloadStorage('permission')),
    time: checkReloadStorage('time'),
  })

  return { isDark, isNavBar, isFirstLogin, admin }
})
