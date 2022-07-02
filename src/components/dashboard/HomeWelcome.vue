<template>
  <div class="flex flex-column md:flex-row justify-content-between align-items-center flex-wrap">
    <!-- メッセージ -->
    <div class="w-full md:w-auto">
      <span class="pr-2"><i class="pi pi-th-large" style="color: var(--primary-color)" /></span>
      <span class="font-semibold">ダッシュボード</span>
    </div>

    <!-- ボタングループ -->
    <div class="flex flex-row mt-2 md:mt-0 w-full md:w-auto justify-content-center">
      <Button :label="`ID：${admin.id}`" icon="pi pi-user" class="p-button-outlined p-button-sm mr-2" disabled />
      <Button label="管理者設定" icon="pi pi-user-edit" class="p-button-sm mr-2" @click="route('/auth')" />
      <Button label="ログアウト" icon="pi pi-sign-out" class="p-button-help p-button-sm" @click="logout()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useHooks from '../../hooks'
  import { useMainStore } from '../../store'
  import { storeToRefs } from 'pinia'

  // ----- use hooks -----
  const { logout, route } = useHooks()
  const mainStore = useMainStore()
  const { admin } = storeToRefs(mainStore)
</script>
