<template>
  <div class="flex flex-column">
    <!-- タイトル -->
    <div class="my-3">
      <span class="pr-2"><i class="pi pi-desktop" style="color: var(--primary-color)" /></span>
      <span class="font-semibold">メンバーエリア（プレビュー）</span>
    </div>

    <!-- オプション -->
    <div class="flex flex-column lg:flex-row justify-content-between">
      <!-- ボタングループ -->
      <div class="mb-2 lg:mb-0">
        <Button label="メンバー管理" icon="pi pi-id-card" class="p-button-sm mr-1" @click="route('/data')" />
        <Button
          label="Clientサイト"
          icon="pi pi-external-link"
          class="p-button-outlined p-button-sm mr-1"
          @click="link('http://rrea-client.live')"
        />
        <Button
          icon="pi pi-refresh"
          class="p-button-outlined p-button-sm mr-1"
          :disabled="datas.length === 0 || isSkeleton"
          @click="getData()"
        />
        <Button
          :icon="isDefaultSort ? 'pi pi-sort-amount-down' : 'pi pi-sort-amount-up-alt'"
          class="p-button-outlined p-button-sm mr-1"
          :disabled="datas.length === 0 || isSkeleton"
          @click="sort()"
        />
      </div>

      <!-- エリア人数 -->
      <div>
        <template v-for="item in counts" :key="item.value">
          <Tag
            class="mr-1 mb-1 md:mb-0 text-500 font-normal"
            :value="`${item.area}：${item.count}`"
            :style="`background-color:${bgColorCreator(Number(item.value))};`"
          />
        </template>
      </div>
    </div>

    <!-- Skeleton -->
    <div v-if="isSkeleton" class="grid mt-2">
      <template v-for="item in skeleton" :key="item">
        <div class="col-6 md:col-4 lg:col-4 xl:col-3 h-5rem md:h-8rem">
          <Skeleton width="100%" height="100%" />
        </div>
      </template>
    </div>

    <!-- ユーザーデータカード -->
    <div v-else class="grid mt-2">
      <template v-for="item in datas" :key="item.id">
        <div class="col-6 md:col-4 lg:col-4 xl:col-3">
          <!-- コンテンツ start -->
          <div
            class="flex flex-row py-2 px-2 md:px-3 border-1 border-50 border-round-xs"
            :style="`background-color:${bgColorCreator(Number(item.areaCode))};`"
          >
            <!-- 写真側 -->
            <div class="mr-2 md:mr-3 border-1 border-100">
              <Image class="hidden lg:block" :src="item.photo" alt="avatars" width="90" height="120" preview />
              <Image class="block lg:hidden" :src="item.photo" alt="avatars" width="51" height="68" preview />
            </div>

            <!-- インフォメーション側 -->
            <div class="text-500">
              <div class="font-medium mb-1">エリア：{{ item.area }}</div>
              <div class="text-xs truncate">ID：{{ item.id }}</div>
              <div class="truncate">
                <span class="mr-2 font-medium">{{ item.name }}</span>
                <span class="text-xs">{{ item.nameSpell }}</span>
              </div>

              <div class="text-xs hidden lg:block truncate">
                <span class="">種族：</span>
                {{ item.race }}
              </div>

              <div class="text-xs hidden lg:block truncate">
                <span class="">職務：</span>
                {{ item.job }}
              </div>

              <div class="text-xs hidden xl:block truncate">
                <span class="">スキル：</span>
                {{ item.skill }}
              </div>
            </div>
          </div>
          <!-- コンテンツ end -->
        </div>
      </template>
    </div>

    <!-- 取得失敗表示 -->
    <div v-if="datas.length === 0 && !isSkeleton" class="m-3">
      <span class="pr-2 text-200"><i class="pi pi-exclamation-circle" style="color: var(--orange-300)" /></span>
      データ取得失敗
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import type { ICommonRespon, IDataCounts, IDataSchema, IDataBodyRespon } from '../../types'
  import useHooks from '../../hooks/useHooks'
  import axios from 'axios'

  // ----- use hooks -----
  const { link, route, errorToast, bgColorCreator } = useHooks()

  // ----- data  -----
  const skeleton: number[] = new Array(8).fill(0)
  let isSkeleton = ref<boolean>(true)
  // リクエスト
  let counts = ref<IDataCounts[]>([])
  let datas = ref<IDataSchema[]>([])

  const getData = async (): Promise<void> => {
    await axios
      .post<ICommonRespon<IDataBodyRespon>>('/api/v1/data', { areaCode: '', jobCode: [], nameCode: [], raceCode: [] })
      .then((res): void => {
        counts.value = res.data.result.count
        datas.value = isDefaultSort.value
          ? res.data.result.user
          : res.data.result.user.sort((a: IDataSchema, b: IDataSchema): number => {
              return Number(b.areaCode) - Number(a.areaCode)
            })
      })
      .catch((): void => {
        errorToast()
      })
      .finally((): void => {
        setTimeout((): void => {
          isSkeleton.value = false
        }, 300)
      })
  }

  // ソート順
  let isDefaultSort = ref<boolean>(true)
  const sort = (): void => {
    isDefaultSort.value = !isDefaultSort.value
    getData()
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // 読み取り
    await getData()
  })
</script>
