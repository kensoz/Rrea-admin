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
  const permission = ref<number>(Number(sessionStorage.getItem('adminPermission')) || guestPermission) // 認証権限
  const isFirstLogin = ref<boolean>(false) // 初めてのログイン

  // 管理者情報
  const admin = reactive<IAuth>({
    id: sessionStorage.getItem('isLoggedIn') || 'guest',
    passWord: '*****',
    permission: Number(sessionStorage.getItem('adminPermission')) || guestPermission,
    time: sessionStorage.getItem('loggedInTime') || '2022-06-24 22:23:29',
  })

  return { isDark, isNavBar, isFirstLogin, permission, admin }
})
