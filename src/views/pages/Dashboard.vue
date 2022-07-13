<template>
  <section class="my-section">
    <!-- ようこそ -->
    <div class="px-2 py-2 md:px-3 border-bottom-1 border-100">
      <HomeWelcome />
    </div>

    <!-- クライアント -->
    <div class="my-dashcontents">
      <HomeClient />
    </div>

    <!-- 図表 -->
    <div class="my-dashcontents">
      <!-- タイトル -->
      <div class="my-3">
        <span class="pr-2"><i class="pi pi-cloud" style="color: var(--primary-color)" /></span>
        <span class="font-semibold">リアルタイムデータ</span>
      </div>

      <!-- ボタングループ -->
      <div class="mb-2 md:mb-0">
        <Button label="データ分析" icon="pi pi-chart-line" class="p-button-sm mr-1" @click="route('/analyse')" />
        <Button icon="pi pi-refresh" class="p-button-outlined p-button-sm" @click="reset()" />
      </div>

      <!-- chart:line -->
      <LineChart :key="updateKey" />
    </div>

    <!-- システムデータ -->
    <div class="my-dashcontents">
      <HomeData />
    </div>

    <!-- ショートカット -->
    <div class="px-2 pb-4 md:px-3 md:pb-5 md:pt-2 xl:px-6 xl:pb-5 xl:pt-3">
      <HomeLink />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent } from 'vue'
  import useHooks from '../../hooks/useHooks'

  // ----- AsyncComponent -----
  const LineChart = defineAsyncComponent(() => import('../../components/analyse/LineChart.vue'))
  const HomeWelcome = defineAsyncComponent(() => import('../../components/dashboard/HomeWelcome.vue'))
  const HomeClient = defineAsyncComponent(() => import('../../components/dashboard/HomeClient.vue'))
  const HomeData = defineAsyncComponent(() => import('../../components/dashboard/HomeData.vue'))
  const HomeLink = defineAsyncComponent(() => import('../../components/dashboard/HomeLink.vue'))

  // ----- use hooks -----
  const { route } = useHooks()

  // ----- chart:line リセット -----
  let updateKey = ref<number>(0)
  const reset = (): void => {
    updateKey.value += 1
  }
</script>
