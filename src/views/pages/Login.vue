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
            {{ isInvalidPassWord ? '無効なパスワード' : 'パスワードを入力してください（guest）' }}
          </small>
        </div>

        <!-- ログインボタン -->
        <div class="mx-4 mb-4">
          <Button
            label="ログイン"
            class="p-button-sm w-full"
            :disabled="admin.passWord === '' || admin.id === ''"
            @click="confirm()"
          />
        </div>

        <!-- インフォメーション -->
        <div class="flex flex-column px-4 pb-5 pt-2 border-top-1 border-100">
          <div>
            <span class="mr-2 text-primary"><i class="pi pi-lock-open" style="font-size: 0.5rem" /></span>
            <small class="font-medium">ゲストはこのままログインしてください</small>
          </div>

          <div>
            <span class="mr-2 text-primary"><i class="pi pi-clock" style="font-size: 0.5rem" /></span>
            <small>sessionStorageで登録情報を保存します</small>
          </div>

          <div>
            <span class="mr-2 text-orange-400"><i class="pi pi-question-circle" style="font-size: 0.5rem" /></span>
            <small>
              ログイン問題？
              <span class="underline font-medium"><a href="https://github.com/kensoz">ここ</a></span>
              までご連絡ください
            </small>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </section>
</template>

<script setup lang="ts">
  import { ref, defineAsyncComponent } from 'vue'
  import type { ICommonRespon, IAuth, IAuthParam } from '../../types'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../../store'
  import useStorage from '../../hooks/useStorage'
  import useHooks from '../../hooks/useHooks'
  import axios from 'axios'

  // ----- AsyncComponent -----
  const Footer = defineAsyncComponent(() => import('../../layouts/Footer.vue'))

  // ----- use hooks -----
  const { errorToast, encrypt } = useHooks()
  const mainStore = useMainStore()
  const { isDark, admin } = storeToRefs(mainStore)
  const { saveLoginStorage } = useStorage()

  // ----- 登録 -----
  let isInvalidID = ref<boolean>(false)
  let isInvalidPassWord = ref<boolean>(false)

  // ID&パスワード認証
  const login = async (param: IAuthParam): Promise<void> => {
    // パスワード暗号化
    param.passWord = await encrypt(param.passWord)

    await axios
      .post<ICommonRespon<IAuth>>('/api/v1/auth', param)
      .then((res): void => {
        if (res.data.code === 10001) {
          // ログイン成功
          saveLoginStorage(res.data.result)
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
    if (admin.value.id === 'admin' || admin.value.id === 'master' || admin.value.id === 'guest') {
      // 管理者ID
      if (admin.value.passWord !== '' && admin.value.passWord !== undefined) {
        login({ id: admin.value.id, passWord: admin.value.passWord })
      } else {
        // 無効なパスワード
        isInvalidPassWord.value = true
      }
    } else {
      // 無効なID
      isInvalidID.value = true
    }
  }
</script>
