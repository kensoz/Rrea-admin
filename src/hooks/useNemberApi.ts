// ####################
//
// common nember api hooks
//
// ####################
import useHooks from './useHooks'
import axios, { AxiosError } from 'axios'
import type { ICommonRespon, IUserSchema } from '../types'

export default function useNemberApi() {
  // ----- use hooks -----
  const { messageToast, errorHandle } = useHooks()

  // ----- フォームCRUD API -----
  /**
   *  --- 読み取り ---
   *  @param {string} url apiのurl
   *  @return {IUserSchema[]} フォームデータ
   */

  const getNemberItems = async (url: string): Promise<IUserSchema[]> => {
    let data: IUserSchema[] = []

    await axios
      .get<ICommonRespon<IUserSchema[]>>(`/api/v1/${url}`)
      .then((res): void => {
        data = res.data.result
      })
      .catch((err: AxiosError): void => {
        errorHandle(err)
      })

    return data
  }

  /**
   *  --- 削除 ---
   *  @param {string} url apiのurl
   *  @param {string} param 削除id
   *  @return {IUserSchema[]} コールバック関数
   */

  const deleteNemberItems = async (url: string, param: string): Promise<IUserSchema[]> => {
    await axios
      .delete<ICommonRespon>(`/api/v1/${url}/${param}`)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((err: AxiosError): void => {
        errorHandle(err)
      })

    return getNemberItems(url)
  }

  /**
   *  --- 作成 ---
   *  @param {string} url apiのurl
   *  @param {IUserSchema} param 作成したデータ
   *  @return {IUserSchema[]} コールバック関数
   */

  const createNemberItems = async (url: string, param: IUserSchema): Promise<IUserSchema[]> => {
    await axios
      .post<ICommonRespon>(`/api/v1/${url}`, param)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((err: AxiosError): void => {
        errorHandle(err)
      })

    return getNemberItems(url)
  }

  /**
   *  --- 編集 ---
   *  @param {string} url apiのurl
   *  @param {IUserSchema} param 編集したデータ
   *  @return {IUserSchema[]} コールバック関数
   */

  const editNemberItems = async (url: string, param: IUserSchema): Promise<IUserSchema[]> => {
    await axios
      .put<ICommonRespon>(`/api/v1/${url}/${param.id}`, param)
      .then(res => {
        messageToast(res.data.message)
      })
      .catch((err: AxiosError): void => {
        errorHandle(err)
      })

    return getNemberItems(url)
  }

  return { getNemberItems, deleteNemberItems, createNemberItems, editNemberItems }
}
