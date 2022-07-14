<template>
  <!-- タイトル -->
  <div class="my-3">
    <span class="pr-2"><i class="pi pi-database" style="color: var(--primary-color)" /></span>
    <span class="font-semibold">システムデータ</span>
  </div>

  <!-- カード -->
  <div class="flex flex-row flex-wrap md:flex-nowrap justify-content-center gap-0 md:gap-4">
    <template v-for="item in data" :key="item.id">
      <router-link :to="item.link" class="w-6 md:w-3 flex flex-column p-2 border-1 border-100">
        <div class="text-center font-medium">
          <span class="mr-2" :class="item.color"><i :class="item.icon" /></span>
          <span>{{ item.text }}</span>
        </div>

        <div class="text-center py-2 font-bold text-lg">
          {{ item.msg }}
        </div>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import type { IData } from '../../types'

  // ----- data -----
  const data: IData[] = [
    { id: 1, text: 'スタック', msg: 'Vue.js3 + TS', icon: 'pi pi-cog', color: 'text-red-400', link: '/about' },
    { id: 2, text: 'UIライブラリ', msg: 'primeVue', icon: 'pi pi-palette', color: 'text-blue-400', link: '/about' },
    { id: 3, text: '権限レベル', msg: '3種類 + JWT', icon: 'pi pi-sliders-h', color: 'text-teal-400', link: '/auth' },
    { id: 4, text: 'テストカバレッジ', msg: '89.45％', icon: 'pi pi-box', color: 'text-purple-400', link: '/about' },
  ]
</script>
