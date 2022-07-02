<template>
  <!-- chart:bar -->
  <Chart type="bar" :data="barData" :options="barOptions" />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import type { IBarChartDataSets } from '../../types'
  import Chart from 'primevue/chart'

  // ----- Chart:Bar -----
  // Bar 設定
  const barOptions = reactive({
    plugins: { legend: { labels: { color: '#797775' } } },
    scales: {
      x: { ticks: { color: '#797775' }, grid: { color: '#797775' } },
      y: { ticks: { color: '#797775' }, grid: { color: '#797775' } },
    },
  })

  // Bar ランダムデータ
  const makeBarRandomData = (): number[] => {
    const numArr: number[] = []
    for (let i = 0; i < 7; i++) {
      const random: number = Math.floor(Math.random() * 250)
      numArr.push(random < 50 ? 50 : random)
    }

    return numArr
  }

  // Bar
  const barData = reactive<IBarChartDataSets>({
    labels: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    datasets: [
      {
        label: '本社',
        backgroundColor: '#bbdefb',
        data: makeBarRandomData(),
      },
      {
        label: '支社',
        backgroundColor: '#c8e6c9',
        data: makeBarRandomData(),
      },
      {
        label: '食堂',
        backgroundColor: '#fff9c4',
        data: makeBarRandomData(),
      },
      {
        label: '外勤',
        backgroundColor: '#f8bbd0',
        data: makeBarRandomData(),
      },
      {
        label: '未知',
        backgroundColor: '#e0e0e0',
        data: makeBarRandomData(),
      },
    ],
  })
</script>
