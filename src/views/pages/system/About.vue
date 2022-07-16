<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'システム管理' }, { label: 'アバウト' }]" />

    <!-- コンテンツ -->
    <div class="px-4 pb-2 pt-1 md:px-6 md:pb-6 md:pt-3">
      <div class="flex flex-column">
        <!-- ロゴ -->
        <div class="mt-5 mb-2">
          <Image :src="isDark ? '/logo-dark.png' : '/logo.png'" alt="Iogo" width="150" />
        </div>

        <!-- 私 -->
        <div class="text-xs font-semibold font-italic text-200 pb-3 border-bottom-1 border-100">by RenHou</div>

        <!-- badge -->
        <div class="mt-2">
          <Image class="mr-1" :src="node" alt="Node.js" />
          <Image class="mr-1" :src="coverage" alt="Coverage" />
          <Image :src="mit" alt="Lisence" />
        </div>

        <!-- 紹介 -->
        <div class="my-3 text-sm">メンバー位置と情報の管理システムRreaの管理者用サイト(Admin)です。</div>
        <label class="font-semibold">スタック</label>
        <template v-for="item in data" :key="item.id">
          <div>
            <span class="mr-2 text-200"><i :class="item.icon" style="font-size: 0.5rem" /></span>
            <span class="text-sm">{{ item.text }}</span>
          </div>
        </template>

        <!-- リンク -->
        <label class="mt-3 font-semibold">リンク</label>
        <div class="mt-1">
          <Button
            icon="pi pi-external-link"
            label="個人GitHub ホームページ"
            class="p-button-sm p-button-outlined"
            @click="link(url.github)"
          />
        </div>
        <div class="my-1">
          <Button
            icon="pi pi-github"
            label="Admin-GitHub（本プロジェクト）"
            class="p-button-sm p-button-outlined"
            @click="link(url.admin)"
          />
        </div>
        <div>
          <Button
            icon="pi pi-github"
            label="Client-GitHub"
            class="p-button-sm p-button-outlined mr-1"
            @click="link(url.client)"
          />
          <Button
            icon="pi pi-external-link"
            label="Client ホームページ"
            class="p-button-sm p-button-outlined mr-1"
            @click="link(url.clinetSite)"
          />
          <Button
            icon="pi pi-github"
            label="Server-GitHub"
            class="p-button-sm p-button-outlined mt-1 md:mt-0"
            @click="link(url.server)"
          />
        </div>

        <!-- システムアーキテクチャー -->
        <label class="mt-3 font-semibold">システムアーキテクチャー</label>
        <div class="mt-1">
          <Image
            class="border-1 border-100"
            src="https://s2.loli.net/2022/07/16/Y7BqVkciA9MCLQZ.jpg"
            alt="system"
            width="280"
            preview
          />
        </div>

        <!-- スター -->
        <div class="my-5">
          <span class="mr-2 text-yellow-300"><i class="pi pi-star-fill" /></span>
          <span class="text-xs font-semibold">Waiting for Your Star !</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { defineAsyncComponent } from 'vue'
  import useHooks from '../../../hooks/useHooks'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../../../store'
  import type { IData } from '../../../types'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/base/AppBreadcrumb.vue'))

  // ----- use hooks -----
  const { link } = useHooks()
  const mainStore = useMainStore()
  const { isDark } = storeToRefs(mainStore)

  // ----- data -----
  const data: IData[] = [
    { id: 1, text: 'Vue.js', icon: 'pi pi-circle', link: '' },
    { id: 2, text: 'TypeScript', icon: 'pi pi-circle', link: '' },
    { id: 3, text: 'PrimeVue', icon: 'pi pi-circle', link: '' },
    { id: 4, text: 'Eslint + Prettier', icon: 'pi pi-circle', link: '' },
    { id: 5, text: 'Vite', icon: 'pi pi-circle', link: '' },
  ]

  const mit = 'https://img.shields.io/badge/License-MIT-0284C7.svg?style=flat-square'
  const coverage = 'https://img.shields.io/badge/Coverage-89.45%25-84CC16.svg?style=flat-square'
  const node = 'https://img.shields.io/badge/Node.js-v18.0.0-fb7185.svg?logo=&style=flat-square'

  const url = {
    admin: 'https://github.com/kensoz/Rrea-admin',
    client: 'https://github.com/kensoz/Rrea-client',
    clinetSite: 'http://rrea-client.live',
    server: 'https://github.com/kensoz/Rrea-server',
    github: 'https://github.com/kensoz',
  }
</script>
