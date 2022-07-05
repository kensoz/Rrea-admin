<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'フォーム管理' }, { label: 'ネーム' }]" />

    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- メッセージ -->
      <Message v-if="mainStore.permission === 2" severity="error">ゲストさんのCRUDができません</Message>

      <!-- タイトル -->
      <AppTitle icon="pi-list" label="ネームフォーム管理" />

      <!-- テーブル -->
      <DataTable
        ref="csv"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="nameForm"
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
              <Button label="新規" icon="pi pi-plus" class="p-button-sm mr-2" @click="permissionDialog()" />
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
              <Button
                icon="pi pi-pencil"
                class="p-button-outlined p-button-sm p-button-info mr-2"
                @click="permissionDialog()"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-outlined p-button-sm p-button-danger"
                @click="permissionDialog()"
              />
            </div>
          </template>
        </Column>
        <Column field="text" header="ネーム" :sortable="true">
          <template #body="slotProps">
            <Tag :value="slotProps.data.text" />
          </template>
        </Column>
        <Column field="value" header="ヴァリュー" :sortable="true" />

        <!-- フッター  -->
        <template #footer> トータルアイテム：{{ nameForm?.length }} </template>
      </DataTable>
    </div>
  </section>

  <!-- ダイアログボックス：権限確認 -->
  <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '90vw' }" />
</template>

<script lang="ts" setup>
  import { ref, defineAsyncComponent, onMounted } from 'vue'
  import type { IFormSchema } from '../../../types'
  import { FilterMatchMode } from 'primevue/api'
  import { useMainStore } from '../../../store'
  import useFormApi from '../../../hooks/formApi'
  import useHooks from '../../../hooks'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/AppBreadcrumb.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/AppTitle.vue'))

  // ----- use hooks -----
  const mainStore = useMainStore()
  const { getFormItems } = useFormApi()
  const { messageToast, permissionDialog } = useHooks()

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
  let nameForm = ref<IFormSchema[]>()

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // 読み取り
    nameForm.value = await getFormItems('name')
  })
</script>
