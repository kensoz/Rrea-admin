<template>
  <header class="flex flex-row justify-content-between align-items-center px-4 py-2 border-bottom-1 border-100">
    <div>
      <!-- ナビボタン in moblie -->
      <Button
        icon="pi pi-bars"
        class="inline-flex lg:hidden p-button-rounded p-button-outlined p-button-sm"
        @click="isNavBar = !isNavBar"
      />

      <!-- ログ in pc -->
      <router-link to="/">
        <Image :src="isDark ? '/logo-dark.png' : '/logo.png'" alt="Image" width="150" class="hidden lg:inline-flex" />
      </router-link>
    </div>

    <div class="flex flex-row align-items-center">
      <!-- ダークモード -->
      <Button
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        class="p-button-rounded p-button-outlined p-button-sm p-button-warning"
        @click="changeMode()"
      />

      <!-- GitHub -->
      <Button
        icon="pi pi-github"
        class="mx-3 p-button-rounded p-button-outlined p-button-sm"
        @click="link('https://github.com/kensoz/Rrea-admin')"
      />

      <!-- 管理者ボタン -->
      <Button
        icon="pi pi-user"
        class="p-button-rounded p-button-sm"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="toggle"
      />
      <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../store'
  import useHooks from '../hooks'

  // ----- use hooks -----
  const mainStore = useMainStore()
  const { isNavBar, isDark } = storeToRefs(mainStore)
  const { link, logout } = useHooks()

  // ----- ダークモード切り替え -----
  const changeMode = () => {
    isDark.value = !isDark.value

    const themeUrl: string = isDark.value ? '/theme/dark.variables.css' : '/theme/light.variables.css'
    const linkElement = document.getElementById('theme') as HTMLLinkElement
    const cloneLinkElement: HTMLLinkElement = linkElement.cloneNode(true) as HTMLLinkElement

    cloneLinkElement.setAttribute('id', 'theme')
    cloneLinkElement.setAttribute('href', themeUrl)
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove()
      cloneLinkElement.setAttribute('id', 'theme')
    })

    linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling)
  }

  // ----- 管理者ボタン -----
  const menu = ref()

  // 切り替え
  const toggle = (event: MouseEvent): void => {
    menu.value.toggle(event)
  }

  // 管理者オプション
  const items = ref([
    { label: 'Clientサイト', icon: 'pi pi-external-link', url: '' },
    { label: 'Client GitHub', icon: 'pi pi-github', url: 'https://github.com/kensoz/Rrea-client' },
    { separator: true },
    { label: '管理者設定', icon: 'pi pi-user-edit', to: '/auth' },
    { label: 'ログアウト', icon: 'pi pi-sign-out', command: () => logout() },
  ])
</script>
