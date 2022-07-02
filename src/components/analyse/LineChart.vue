<template>
  <!-- chart:line -->
  <div>
    <Chart type="line" :data="lineData" :options="lineOptions" />
    <div class="text-xs mt-2">更新時間：{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import type { ILineChartDataSets } from '../../types'
  import Chart from 'primevue/chart'
  import dayjs from 'dayjs'

  // ----- Chart:Line -----
  // Line 設定
  const lineOptions = reactive({
    plugins: { legend: { labels: { color: '#797775' } } },
    scales: {
      x: { ticks: { color: '#797775' }, grid: { color: '#797775' } },
      y: { ticks: { color: '#797775' }, grid: { color: '#797775' } },
    },
  })

  // Line ランダムデータ
  const makeLineRandomData = (): number[] => {
    const numArr: number[] = []
    for (let i = 0; i < 6; i++) {
      const random: number = Math.floor(Math.random() * 100)
      numArr.push(random < 10 ? 10 : random)
    }

    return numArr
  }

  // Line
  const lineData = reactive<ILineChartDataSets>({
    labels: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: '本社',
        borderColor: '#bbdefb',
        data: makeLineRandomData(),
        tension: 0.5,
        borderWidth: 2,
      },
      {
        label: '支社',
        borderColor: '#c8e6c9',
        data: makeLineRandomData(),
        tension: 0.5,
        borderWidth: 2,
      },
      {
        label: '食堂',
        borderColor: '#fff9c4',
        data: makeLineRandomData(),
        tension: 0.5,
        borderWidth: 2,
      },
      {
        label: '外勤',
        borderColor: '#f8bbd0',
        data: makeLineRandomData(),
        tension: 0.5,
        borderWidth: 2,
      },
      {
        label: '未知',
        borderColor: '#e0e0e0',
        data: makeLineRandomData(),
        tension: 0.5,
        borderWidth: 2,
      },
    ],
  })
</script>
