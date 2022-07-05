import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IAuth } from '../types'

// デフォルトゲスト認証権限
const guestPermission = 2

// Pinia Composition API mode
export const useMainStore = defineStore('main', () => {
  // ########## state ##########
  const isDark = ref<boolean>(false) // ダークモード
  const isNavBar = ref<boolean>(false) // スマートフォン ナビバー
  const isLoggedIn = ref<boolean>(false) // ログイン状態
  const permission = ref<number>(guestPermission) // 認証権限

  // 管理者情報
  const admin = reactive<IAuth>({
    id: 'guest',
    passWord: 'guest',
    permission: guestPermission,
    time: '2022-06-24 22:23:29',
  })

  return { isDark, isNavBar, isLoggedIn, permission, admin }
})
