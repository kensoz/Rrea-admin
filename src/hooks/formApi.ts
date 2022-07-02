// ####################
//
// common form api hooks
//
// ####################
import axios from 'axios'
import useHooks from './index'
import type { ICommonRespon, IFormSchema } from '../types'

export default function useFormApi() {
  // ----- use hooks -----
  const { messageToast, errorToast } = useHooks()

  // ----- フォームCRUD API -----
  /**
   *  --- 読み取り ---
   *  @param {string} url apiのurl
   *  @return {IFormSchema[]} フォームデータ
   */

  const getFormItems = async (url: string): Promise<IFormSchema[]> => {
    let data: IFormSchema[] = []

    await axios
      .get<ICommonRespon<IFormSchema[]>>(`/api/v1/${url}`)
      .then(res => {
        data = res.data.result
      })
      .catch((): void => {
        errorToast()
      })

    return data
  }

  /**
   *  --- 削除 ---
   *  @param {string} url apiのurl
   *  @param {string} param 削除value
   *  @return {IFormSchema[]} コールバック関数
   */

  const deleteFormItems = async (url: string, param: string): Promise<IFormSchema[]> => {
    await axios
      .delete<ICommonRespon>(`/api/v1/${url}/${param}`)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((): void => {
        errorToast()
      })

    return getFormItems(url)
  }

  /**
   *  --- 作成 ---
   *  @param {string} url apiのurl
   *  @param {IFormSchema} param 作成したデータ
   *  @return {IFormSchema[]} コールバック関数
   */

  const createFormItems = async (url: string, param: IFormSchema): Promise<IFormSchema[]> => {
    await axios
      .post<ICommonRespon>(`/api/v1/${url}`, param)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((): void => {
        errorToast()
      })

    return getFormItems(url)
  }

  /**
   *  --- 編集 ---
   *  @param {string} url apiのurl
   *  @param {IFormSchema} param 編集したデータ
   *  @return {IFormSchema[]} コールバック関数
   */

  const editFormItems = async (url: string, param: IFormSchema): Promise<IFormSchema[]> => {
    await axios
      .put<ICommonRespon>(`/api/v1/${url}/${param.value}`, param)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((): void => {
        errorToast()
      })

    return getFormItems(url)
  }

  return { getFormItems, deleteFormItems, createFormItems, editFormItems }
}
