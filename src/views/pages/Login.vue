<template>
  <!-- ログインページ -->
  <section class="flex flex-column w-screen h-screen ra-bg">
    <div class="flex-grow-1 flex justify-content-center align-items-center">
      <div class="ra-layout flex flex-column">
        <!-- ロゴ -->
        <div class="px-4 pt-4 pb-3 border-bottom-1 border-100">
          <Image :src="isDark ? '/logo-dark.png' : '/logo.png'" alt="Iogo" width="170" />
        </div>

        <!-- ID & パスワード -->
        <div class="field flex flex-column m-4">
          <label class="font-semibold">管理者ID<span class="text-red-300">*</span></label>

          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user" />
            </span>
            <InputText v-model="admin.id" class="p-inputtext-sm w-15rem" type="text" />
          </div>

          <small :class="{ 'p-error': isInvalidID }">
            {{ isInvalidID ? '無効な管理者ID' : '管理者IDを入力してください' }}
          </small>

          <label class="font-semibold mt-2">パスワード<span class="text-red-300">*</span></label>

          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock" />
            </span>
            <InputText v-model="admin.passWord" class="w-15rem" type="password" />
          </div>

          <small :class="{ 'p-error': isInvalidPassWord }">
            {{ isInvalidPassWord ? '無効なパスワード' : 'パスワードを入力してください' }}
          </small>
        </div>

        <!-- ログインボタン -->
        <div class="mx-4 mb-5">
          <Button
            label="ログイン"
            class="p-button-sm w-full"
            :disabled="admin.passWord === '' || admin.id === ''"
            @click="confirm()"
          />

          <small class="mt-2">ゲストはこのままログインしてください</small>
        </div>
      </div>
    </div>

    <Footer />
  </section>
</template>

<script setup lang="ts">
  import { ref, defineAsyncComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import type { ICommonRespon, IAuth, IAuthParam } from '../../types'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../../store'
  import useHooks from '../../hooks'
  import dayjs from 'dayjs'
  import axios from 'axios'

  // ----- AsyncComponent -----
  const Footer = defineAsyncComponent(() => import('../../layouts/Footer.vue'))

  // ----- use hooks -----
  const router = useRouter()
  const { errorToast } = useHooks()
  const mainStore = useMainStore()
  const { isDark, isFirstLogin, admin } = storeToRefs(mainStore)

  // ----- 登録 -----
  let isInvalidID = ref<boolean>(false)
  let isInvalidPassWord = ref<boolean>(false)

  // ID&パスワード認証
  const login = async (param: IAuthParam): Promise<void> => {
    await axios
      .post<ICommonRespon<IAuth>>('/api/v1/auth', param)
      .then((res): void => {
        if (res.data.code === 10001) {
          // ログイン成功
          isFirstLogin.value = true
          sessionStorage.setItem('isLoggedIn', res.data.result.id)
          sessionStorage.setItem('adminPermission', String(res.data.result.permission))
          sessionStorage.setItem('loggedInTime', res.data.result.time)

          Object.assign(admin.value, res.data.result)
          router.push({ name: 'Dashboard' })
        } else if (res.data.code === 10002) {
          // 無効なID
          isInvalidID.value = true
        } else {
          // 無効なパスワード
          isInvalidPassWord.value = true
        }
      })
      .catch((): void => {
        errorToast()
      })
  }

  // ログイン処理
  const confirm = (): void => {
    if (admin.value.id === 'guest') {
      // ゲストID
      if (admin.value.passWord === '*****') {
        isFirstLogin.value = true
        sessionStorage.setItem('isLoggedIn', 'guest')
        admin.value.permission = 2
        admin.value.time = dayjs().format('YYYY-MM-DD HH:mm:ss')

        router.push({ name: 'Dashboard' })
      } else {
        isInvalidPassWord.value = true
      }
    } else if (admin.value.id === 'admin' || admin.value.id === 'master') {
      // 管理者ID
      if (admin.value.passWord !== '' && admin.value.passWord !== undefined) {
        login({ id: admin.value.id, passWord: admin.value.passWord })
      } else {
        isInvalidPassWord.value = true
      }
    } else {
      // 無効なID
      isInvalidID.value = true
    }
  }
</script>
