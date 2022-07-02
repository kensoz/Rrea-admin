<template>
  <nav class="flex">
    <Menu :model="items" class="flex-grow-1" />
  </nav>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../store'

  // ----- use hooks -----
  const mainStore = useMainStore()
  const { isNavBar } = storeToRefs(mainStore)

  // ----- サイドメニュー -----
  const close = (): void => {
    if (isNavBar.value) isNavBar.value = false
  }

  const items = [
    { items: [{ label: 'ダッシュボード', icon: 'pi pi-th-large', to: '/', command: () => close() }] },
    { separator: true },
    {
      label: 'フォーム管理',
      items: [
        { label: 'ネーム', icon: 'pi pi-list', to: '/name', command: () => close() },
        { label: 'エリア', icon: 'pi pi-map-marker', to: '/area', command: () => close() },
        { label: '職務', icon: 'pi pi-briefcase', to: '/job', command: () => close() },
        { label: '種族', icon: 'pi pi-users', to: '/race', command: () => close() },
      ],
    },
    { separator: true },
    {
      label: 'メンバー管理',
      items: [
        { label: 'メンバー', icon: 'pi pi-id-card', to: '/data', command: () => close() },
        { label: 'データ分析', icon: 'pi pi-chart-line', to: '/analyse', command: () => close() },
      ],
    },
    { separator: true },
    {
      label: 'システム管理',
      items: [
        { label: '管理者設定', icon: 'pi pi-user-edit ', to: '/auth', command: () => close() },
        { label: 'アバウト', icon: 'pi pi-circle', to: '/about', command: () => close() },
      ],
    },
  ]
</script>
