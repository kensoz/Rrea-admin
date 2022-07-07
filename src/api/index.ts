// ------------------------------
// *
// * axios interceptor
// *
// ------------------------------

import axios, { AxiosRequestConfig } from 'axios'
import { ADMIN_TOKEN } from '../store/type'

export default function setAxios() {
  // request interceptor
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token: string = sessionStorage.getItem(ADMIN_TOKEN) || 'login'
    // なぜタイプを付けない ? see → axios issues: #4193 https://github.com/axios/axios/issues/4193
    // @ts-ignore
    config.headers.common['Authorization'] = `Bearer ${token}`
    return config
  })
}
