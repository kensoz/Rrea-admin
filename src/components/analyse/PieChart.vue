<template>
  <!-- chart:pie -->
  <div class="flex flex-row flex-wrap">
    <!-- オプション -->
    <div class="flex flex-column w-full md:w-8 lg:w-4">
      <div class="mb-4 w-full md:w-full lg:w-8">
        <label class="font-semibold">利用率日付設定</label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-calendar" />
          </span>

          <Calendar
            v-model="date"
            date-format="mm/dd/yy"
            :placeholder="'今日 ' + dayjs().format('MM/DD/YYYY')"
            @date-select="change()"
          />
        </div>
      </div>

      <div>
        <label class="font-semibold">
          A: {{ dayjs(date).format('MM/DD/YYYY') || dayjs().format('MM/DD/YYYY') }}のデータ（h）
        </label>
        <div class="border-1 border-100 p-3 mt-2 w-full md:w-full lg:w-8 flex flex-row lg:flex-column flex-wrap">
          <template v-for="item in pieA" :key="item.bgColor">
            <div class="mt-1 w-6 lg:w-full">
              <span :style="`color: ${item.hoverbgColor}`">
                <i class="pi pi-circle-fill" style="font-size: 0.8rem" />
                <span class="mx-2">{{ item.area }}</span>
              </span>

              <span class="font-semibold">{{ `：  ${item.data} h` }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- pie a -->
    <div class="w-6 md:w-6 lg:w-4 pl-0 md:pl-5 pt-2 lg:pt-0">
      <div class="text-center font-semibold">
        A: {{ dayjs(date).format('MM/DD/YYYY') || dayjs().format('MM/DD/YYYY') }}の利用率
      </div>
      <Chart type="pie" :data="pieDataA" />
    </div>

    <!-- pie b -->
    <div class="w-6 md:w-6 lg:w-4 pl-0 md:pl-5 pt-2 lg:pt-0">
      <div class="text-center font-semibold">B:明日の利用率予想</div>
      <Chart type="pie" :data="pieDataB" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, Ref } from 'vue'
  import type { IPieChartData, IPieChartDataSets } from '../../types'
  import useVariables from '../../hooks/useVariables'
  import Chart from 'primevue/chart'
  import dayjs from 'dayjs'

  // ----- use hooks -----
  const { piePrototype } = useVariables()

  // ----- Chart:Pie -----
  // Pie データ
  const date = ref()

  // Pie A
  const pieA = ref<IPieChartData[]>(piePrototype)
  const pieDataA = reactive<IPieChartDataSets>({
    datasets: [
      {
        borderWidth: 1,
        borderColor: '#e1dfdd',
        data: new Array(pieA.value.length).fill(0),
        backgroundColor: pieA.value.map(i => i.bgColor),
        hoverBackgroundColor: pieA.value.map(i => i.hoverbgColor),
      },
    ],
  })

  // Pie B
  const pieB = ref<IPieChartData[]>(piePrototype)
  const pieDataB = reactive<IPieChartDataSets>({
    datasets: [
      {
        borderWidth: 1,
        borderColor: '#e1dfdd',
        data: new Array(pieB.value.length).fill(0),
        backgroundColor: pieB.value.map(i => i.bgColor),
        hoverBackgroundColor: pieB.value.map(i => i.hoverbgColor),
      },
    ],
  })

  // Pie A フォーム
  const change = (): void => {
    makePieRandomData(pieDataB, pieB)
    makePieRandomData(pieDataA, pieA)
  }

  // Pie ランダムデータ
  const makePieRandomData = (data: IPieChartDataSets, list: Ref<IPieChartData[]>): void => {
    data.datasets[0].data = list.value.map((i: IPieChartData): number => {
      const random: number = Math.floor(Math.random() * 250)
      i.data = random === 0 ? list.value.length : random
      return i.data
    })
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    await makePieRandomData(pieDataB, pieB)
    await makePieRandomData(pieDataA, pieA)
  })
</script>
