<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'フォーム管理' }, { label: 'エリア' }]" />
    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- メッセージ -->
      <Message severity="warn">センサーでエリアを自動更新しますので、閲覧のみです</Message>

      <!-- タイトル -->
      <AppTitle icon="pi-map-marker" label="エリアフォーム管理" />

      <!-- テーブル -->
      <DataTable
        ref="csv"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="areaForm"
        data-key="value"
        filter-display="menu"
        :global-filter-fields="['text', 'value']"
        responsive-layout="scroll"
        show-gridlines
      >
        <!-- ヘッダ -->
        <template #header>
          <div class="flex flex-row justify-content-between">
            <div class="flex flex-row">
              <Button label="新規" icon="pi pi-plus" class="p-button-sm mr-1" disabled />
              <Button label="CSV" icon="pi pi-upload" class="p-button-secondary p-button-sm" @click="exportCSV()" />
            </div>

            <div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  class="p-inputtext-sm max-w-10rem md:max-w-max"
                  placeholder="検索"
                />
              </span>
            </div>
          </div>
        </template>

        <!-- コンテンツ -->
        <Column header="編集・削除">
          <template #body>
            <div class="flex flex-row">
              <Button icon="pi pi-pencil" class="p-button-outlined p-button-sm p-button-info mr-2" disabled />
              <Button icon="pi pi-trash" class="p-button-outlined p-button-sm p-button-danger" disabled />
            </div>
          </template>
        </Column>
        <Column field="text" header="エリア" :sortable="true">
          <template #body="slotProps">
            <Tag :value="slotProps.data.text" />
          </template>
        </Column>
        <Column field="value" header="ヴァリュー" :sortable="true" />

        <!-- フッター -->
        <template #footer> トータルアイテム：{{ areaForm?.length }} </template>
      </DataTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent, onMounted } from 'vue'
  import type { IFormSchema } from '../../../types'
  import { FilterMatchMode } from 'primevue/api'
  import useFormApi from '../../../hooks/useFormApi'
  import useHooks from '../../../hooks/useHooks'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/base/AppBreadcrumb.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/base/AppTitle.vue'))

  // ----- use hooks -----
  const { getFormItems } = useFormApi()
  const { messageToast } = useHooks()

  // ----- テーブル -----
  // csv作成
  const csv = ref()
  const exportCSV = async (): Promise<void> => {
    await csv.value.exportCSV()
    messageToast()
  }

  // フィルタ
  const filters = ref({ global: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

  // ----- フォームCRUD -----
  let areaForm = ref<IFormSchema[]>()

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // 読み取り
    areaForm.value = await getFormItems('area')
  })
</script>
