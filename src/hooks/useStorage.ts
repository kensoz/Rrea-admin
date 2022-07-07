// ####################
//
// Storage hooks
// Storageの集中管理
// mode: sessionStorage
//
// ####################

import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useVariables from './useVariables'
import type { IAuth } from '../types'
import { ADMIN_ID, ADMIN_PERMISSION, ADMIN_TIME, ADMIN_TOKEN } from '../store/type'

export default function useStorage() {
  // ----- use hooks -----
  const router = useRouter()
  const mainStore = useMainStore()
  const { isFirstLogin, admin } = storeToRefs(mainStore)
  const { adminPrototype } = useVariables()

  /**
   *  --- ログインStorage処理 ---
   *  @param {string} level 管理者権限level
   *  @param {IAuth} auth 管理者状態
   *  @return {void} なし
   */

  const saveLoginStorage = async (auth: IAuth): Promise<void> => {
    await sessionStorage.setItem(ADMIN_ID, auth.id)
    await sessionStorage.setItem(ADMIN_PERMISSION, String(auth.permission))
    await sessionStorage.setItem(ADMIN_TIME, auth.time)
    await sessionStorage.setItem(ADMIN_TOKEN, auth.token as string)

    isFirstLogin.value = true
    Object.assign(admin.value, auth)
    router.push({ name: 'Dashboard' })
  }

  /**
   *  --- ログアウトStorage処理 ---
   *  @param {} なし
   *  @return {void} なし
   */

  const clearLogoutStorage = (): void => {
    sessionStorage.clear()
    Object.assign(admin.value, adminPrototype)
  }

  /**
   *  --- リロードStorage確認 ---
   *  @param {string} key 確認したいキー
   *  @return {string} それぞれ確認したいキーのヴァリュー
   */

  const checkReloadStorage = (key: string): string => {
    if (key === 'id') {
      return sessionStorage.getItem(ADMIN_ID) || adminPrototype.id
    } else if (key === 'permission') {
      return sessionStorage.getItem(ADMIN_PERMISSION) || String(adminPrototype.permission)
    } else {
      return sessionStorage.getItem(ADMIN_TIME) || adminPrototype.time
    }
  }

  return { saveLoginStorage, clearLogoutStorage, checkReloadStorage }
}
