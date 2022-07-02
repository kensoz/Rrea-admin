<template>
  <div class="flex flex-row flex-wrap">
    <div class="border-none xl:border-right-1 border-100 pr-0 xl:pr-6">
      <!-- タイトル -->
      <div class="my-3">
        <span class="pr-2"><i class="pi pi-bolt" style="color: var(--primary-color)" /></span>
        <span class="font-semibold">フォームリンク</span>
      </div>

      <!-- ボタングループ -->
      <div class="flex flex-row justify-content-start">
        <template v-for="item in form" :key="item.id">
          <Button :label="item.text" :icon="item.icon" class="p-button-sm mr-1" @click="route(item.link)" />
        </template>
      </div>
    </div>

    <div class="pl-0 xl:pl-6">
      <!-- タイトル -->
      <div class="my-3">
        <span class="pr-2"><i class="pi pi-send" style="color: var(--primary-color)" /></span>
        <span class="font-semibold">GitHubリンク</span>
      </div>

      <!-- ボタングループ -->
      <div class="flex flex-row justify-content-start flex-wrap">
        <template v-for="item in url" :key="item.id">
          <Button
            :label="item.text"
            :icon="item.icon"
            class="p-button-outlined p-button-sm mr-1 mt-1 md:mt-0"
            @click="link(item.link)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useHooks from '../../hooks'
  import type { IData } from '../../types'

  // ----- use hooks -----
  const { route, link } = useHooks()

  // ----- data -----
  const form: IData[] = [
    { id: 1, text: 'ネーム', icon: 'pi pi-list', link: '/name' },
    { id: 2, text: 'エリア', icon: 'pi pi-map-marker', link: '/area' },
    { id: 3, text: '職務', icon: 'pi pi-briefcase', link: '/job' },
    { id: 4, text: '種族', icon: 'pi pi-users', link: '/race' },
  ]

  const url: IData[] = [
    { id: 1, text: 'Admin-GitHub', icon: 'pi pi-github', link: '' },
    { id: 2, text: 'Server-GitHub', icon: 'pi pi-github', link: 'https://github.com/kensoz/Rrea-server' },
    { id: 3, text: 'Client-GitHub', icon: 'pi pi-github', link: 'https://github.com/kensoz/Rrea-client' },
    { id: 4, text: 'Clinetサイト', icon: 'pi pi-external-link', link: '' },
  ]
</script>
