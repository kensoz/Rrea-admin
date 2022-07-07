// ####################
//
// common function hooks
//
// ####################
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'
import useStorage from './useStorage'
import axios, { AxiosError } from 'axios'

export default function useHooks() {
  // ----- use hooks -----
  const router = useRouter()
  const toast = useToast()
  const confirml = useConfirm()
  const mainStore = useMainStore()
  const { admin } = storeToRefs(mainStore)
  const { clearLogoutStorage } = useStorage()

  // ----- Functions -----

  /**
   *  --- メンバー場所の背景色 ---
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
        router.push({ name: 'Login' })
        clearLogoutStorage()
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
   *  --- メッセージ提示処理 ---
   *  @param {string} text メッセージ（省略可）
   *  @return {void} なし
   */

  const messageToast = (text?: string): void => {
    toast.add({ severity: 'success', summary: 'SUCCESS', detail: text || '操作成功', life: 3000 })
  }

  /**
   *  --- エラー提示処理 ---
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

  /**
   *  --- 権限お知らせダイアログ ---
   *  @param {string} カスタマイズテキスト
   *  @return {void} なし
   */

  const permissionDialog = (str?: string): void => {
    confirml.require({
      message: str || '権限はありませんヽ(`Д´)ﾉ',
      header: 'お知らせ',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'hidden',
    })
  }

  /**
   *  --- エラー処理（現時点では、jwtが必要なリクエストのみ） ---
   *  @param {AxiosError} err axiosエラー
   *  @return {void} なし
   */

  const errorHandle = (err: AxiosError): void => {
    // JWT認証失敗
    if (err.response?.status === 401) {
      confirml.require({
        message: 'JWT認証失敗しました、再ログインしてください',
        header: 'お知らせ',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'hidden',
        accept: () => logout(),
      })
    } else {
      // その他のエラー
      errorToast()
    }
  }

  return {
    link,
    route,
    logout,
    errorHandle,
    bgColorCreator,
    messageToast,
    errorToast,
    missingValue,
    permissionDialog,
  }
}
