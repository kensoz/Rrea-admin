// ####################
//
// common function hooks
//
// ####################
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export default function useHooks() {
  // ----- use hooks -----
  const router = useRouter()
  const toast = useToast()
  const mainStore = useMainStore()
  const { admin, isLoggedIn } = storeToRefs(mainStore)

  // ----- Functions -----

  /**
   *  --- ログアウト ---
   *  @param {number} areaCode 場所のコード
   *  @return {string} 色の文字列
   */

  const bgColorCreator = (e: number): string => {
    const list: string[] = ['#cfd8dc', '#bbdefb', '#c8e6c9', '#fff9c4', '#f8bbd0', '#f5f5f5']
    return list[e]
  }

  /**
   *  --- ログアウト ---
   *  @param {} なし
   *  @return {void} なし
   */

  const logout = async (): Promise<void> => {
    await axios
      .delete(`/api/v1/auth/${admin.value.id}`)
      .then((): void => {
        isLoggedIn.value = false
        Object.assign(admin.value, {
          id: 'guest',
          password: 'guest',
          permission: 2,
        })

        router.push({ name: 'Login' })
      })
      .catch((): void => {
        toast.add({ severity: 'error', summary: 'ERROR', detail: 'ログアウト失敗しました', life: 3000 })
      })
  }

  /**
   *  --- 外部リンクアクセス ---
   *  @param {string} url リンク
   *  @return {void} なし
   */

  const link = (url: string): void => {
    location.href = url
  }

  /**
   *  --- 内部リンクアクセス ---
   *  @param {string} url リンク
   *  @return {void} なし
   */

  const route = (url: string): void => {
    router.push(url)
  }

  /**
   *  --- メッセージ処理 ---
   *  @param {string} text メッセージ（省略可）
   *  @return {void} なし
   */

  const messageToast = (text?: string): void => {
    toast.add({ severity: 'success', summary: 'SUCCESS', detail: text || '操作成功', life: 3000 })
  }

  /**
   *  --- エラー処理 ---
   *  @param {string} text エラー（省略可）
   *  @return {void} なし
   */

  const errorToast = (text?: string): void => {
    toast.add({ severity: 'error', summary: 'ERROR', detail: text || '操作失敗', life: 3000 })
  }

  /**
   *  --- value欠損値探す ---
   *  @param {number[]} numArr valueかid配列
   *  @return {number} 欠損値
   */

  const missingValue = (numArr: number[]): number => {
    numArr.unshift(0)
    numArr.sort((a: number, b: number): number => a - b)

    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] !== i) return i
    }

    return numArr.length
  }

  return {
    link,
    route,
    logout,
    bgColorCreator,
    messageToast,
    errorToast,
    missingValue,
  }
}
