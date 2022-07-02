<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'メンバー管理' }, { label: 'データ分析' }]" />

    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- タイトル -->
      <AppTitle icon="pi-chart-line" label="データ分析" />

      <!-- メインタブー start -->
      <!-- タブー1 分析と予想 -->
      <TabView>
        <TabPanel>
          <template #header>
            <span class="mr-2"><i class="pi pi-server" /></span>
            <span>分析と予想</span>
          </template>

          <div>
            <!-- コンテンツ1 -->
            <div class="pb-5 border-bottom-1 border-100">
              <!-- タイトル -->
              <AppTitle icon="pi-chart-pie" label="エリア利用率分析と予想" />

              <!-- chart:pie -->
              <PieChart />
            </div>

            <!-- コンテンツ2 -->
            <div>
              <!-- タイトル -->
              <AppTitle icon="pi-chart-bar" label="エリア週間利用時間分析" />

              <!-- chart:bar -->
              <BarChart />
            </div>
          </div>
        </TabPanel>

        <!-- タブー2 リアルタイム -->
        <TabPanel>
          <template #header>
            <span class="mr-2"><i class="pi pi-cloud" /></span>
            <span>リアルタイム</span>
          </template>

          <!-- タイトル -->
          <AppTitle icon="pi-chart-line" label="リアルタイムデータ" />

          <!-- ボタン -->
          <div class="my-2">
            <Button label="更新" icon="pi pi-refresh" class="p-button-sm" @click="reset()" />
          </div>

          <!-- chart:line -->
          <LineChart :key="updateKey" />
        </TabPanel>
      </TabView>
      <!-- メインタブー end -->
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent } from 'vue'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/AppBreadcrumb.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/AppTitle.vue'))
  const LineChart = defineAsyncComponent(() => import('../../../components/analyse/LineChart.vue'))
  const BarChart = defineAsyncComponent(() => import('../../../components/analyse/BarChart.vue'))
  const PieChart = defineAsyncComponent(() => import('../../../components/analyse/PieChart.vue'))

  // ----- chart:line リセット -----
  let updateKey = ref<number>(0)
  const reset = (): void => {
    updateKey.value += 1
  }
</script>
