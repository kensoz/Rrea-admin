import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IAuth } from '../types'

// Pinia Composition API mode
export const useMainStore = defineStore('main', () => {
  // ########## state ##########
  const isDark = ref<boolean>(false) // ダークモード
  const isNavBar = ref<boolean>(false) // スマートフォン ナビバー
  const isLoggedIn = ref<boolean>(false) // ログイン状態
  const admin = reactive<IAuth>({
    id: 'guest',
    passWord: 'guest',
    permission: 2,
    time: '2022-06-24 22:23:29',
  }) // 管理者情報

  return { isDark, isNavBar, isLoggedIn, admin }
})
