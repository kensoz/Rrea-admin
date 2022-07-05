<template>
  <!-- サイトヘッダ -->
  <div class="absolute top-0 w-full ra-layout z-5">
    <Header />
  </div>

  <div class="flex flex-column h-screen overflow-hidden ra-layout pt-6">
    <!-- サイトメイン -->
    <main class="flex-grow-1 flex flex-row max-h-screen overflow-hidden">
      <!-- サイトナビ in pc -->
      <div class="hidden lg:block">
        <Side />
      </div>

      <!-- コンテンツ -->
      <div class="flex flex-column w-full ra-bg overflow-y-scroll">
        <div class="flex-grow-1 m-2 md:m-3 xl:m-5 mt-3 lg:mt-5 ra-layout">
          <router-view />
        </div>

        <!-- コンテンツ フッター -->
        <Footer />
      </div>
    </main>

    <!-- サイトナビ in mobile -->
    <Sidebar v-model:visible="isNavBar" :show-close-icon="false" class="h-full">
      <!-- サイトロゴ in mobile -->
      <div class="mx-3 mb-3 mt-4">
        <Image :src="isDark ? '/logo-dark.png' : '/logo.png'" alt="Image" width="150" />
      </div>

      <Side />
    </Sidebar>

    <!-- サイトトースト -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
  import { defineAsyncComponent, onMounted } from 'vue'
  import { RouterView } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../store'
  import useHooks from '../hooks'

  // ----- AsyncComponent -----
  const Header = defineAsyncComponent(() => import('../layouts/Header.vue'))
  const Side = defineAsyncComponent(() => import('../layouts/Side.vue'))
  const Footer = defineAsyncComponent(() => import('../layouts/Footer.vue'))

  // ----- use hooks -----
  const { messageToast } = useHooks()
  const mainStore = useMainStore()
  const { isDark, isNavBar, isFirstLogin } = storeToRefs(mainStore)

  // ----- lifecycle -----
  onMounted((): void => {
    isFirstLogin.value && messageToast('ログイン成功しました')
  })
</script>
