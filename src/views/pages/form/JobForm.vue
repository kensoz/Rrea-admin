<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'フォーム管理' }, { label: '職務' }]" />
    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- メッセージ -->
      <Message v-if="mainStore.permission === 2" severity="error">ゲストさんはフォームのCRUDができません</Message>

      <!-- タイトル -->
      <AppTitle icon="pi-briefcase" label="職務フォーム管理" />

      <!-- テーブル -->
      <DataTable
        ref="csv"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="jobForm"
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
              <Button
                label="新規"
                icon="pi pi-plus"
                class="p-button-sm mr-1"
                @click="mainStore.permission === 2 ? permissionDialog() : createDialog()"
              />
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
          <template #body="slotProps">
            <div class="flex flex-row">
              <Button
                icon="pi pi-pencil"
                class="p-button-outlined p-button-sm p-button-info mr-2"
                @click="mainStore.permission === 2 ? permissionDialog() : editDialog(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-outlined p-button-sm p-button-danger"
                @click="mainStore.permission === 2 ? permissionDialog() : deleteConfirm(slotProps.data)"
              />
            </div>
          </template>
        </Column>
        <Column field="text" header="職務" :sortable="true">
          <template #body="slotProps">
            <Tag :value="slotProps.data.text" />
          </template>
        </Column>
        <Column field="value" header="ヴァリュー" :sortable="true" />

        <!-- フッター -->
        <template #footer> トータルアイテム：{{ jobForm?.length }} </template>
      </DataTable>
    </div>

    <!-- ダイアログボックス：新規作成&編集 -->
    <AppFormDialog :visible="visible" :mode="mode" :form="form" @colse="colse()" @confirm="confirm" />
    <!-- ダイアログボックス：権限確認、削除確認 -->
    <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '90vw' }" />
  </section>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
  import type { IFormSchema, IUserSchema } from '../../../types'
  import { FilterMatchMode } from 'primevue/api'
  import { useMainStore } from '../../../store'
  import { useConfirm } from 'primevue/useconfirm'
  import useVariables from '../../../hooks/variable'
  import useFormApi from '../../../hooks/formApi'
  import useNemberApi from '../../../hooks/nemberApi'
  import useHooks from '../../../hooks'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/base/AppBreadcrumb.vue'))
  const AppFormDialog = defineAsyncComponent(() => import('../../../components/base/AppFormDialog.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/base/AppTitle.vue'))

  // ----- use hooks -----
  const confirml = useConfirm()
  const mainStore = useMainStore()
  const { formPrototype } = useVariables()
  const { messageToast, missingValue, permissionDialog } = useHooks()
  const { getNemberItems } = useNemberApi()
  const { getFormItems, deleteFormItems, createFormItems, editFormItems } = useFormApi()

  // ----- テーブル -----
  // csv作成
  const csv = ref()
  const exportCSV = async (): Promise<void> => {
    await csv.value.exportCSV()
    messageToast()
  }

  // フィルタ
  const filters = ref({ global: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

  // ----- ダイアログボック -----
  let visible = ref<boolean>(false)
  const colse = (): void => {
    visible.value = false
  }

  // ----- フォームCRUD -----
  let mode = ref<string>('create')
  let form = reactive<IFormSchema>(formPrototype)
  let jobForm = ref<IFormSchema[]>()

  // 削除したい職務は使っているかどうかをチェック
  const deleteConfirm = async (job: IFormSchema): Promise<void> => {
    const nembers: IUserSchema[] = await getNemberItems('user')
    const flg: number = nembers.findIndex((number: IUserSchema): boolean => number.jobCode === job.value)
    flg === -1
      ? deleteDialog(`「${job.text}」を削除してもよろしいですか`, job.value)
      : deleteDialog('使っている職務で削除できません')
  }

  // 削除ダイアログ
  const deleteDialog = (message: string, value?: string): void => {
    confirml.require({
      message: message,
      header: '削除確認',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'p-button-outlined p-button-warning',
      acceptClass: value ? '' : 'hidden',
      accept: async (): Promise<void> => {
        jobForm.value = await deleteFormItems('job', value as string)
      },
    })
  }

  // 作成ダイアログ
  const createDialog = (): void => {
    mode.value = 'create'

    // valueの欠損値を探す
    const valueArr: number[] = []
    jobForm.value?.map((i: IFormSchema): void => {
      valueArr.push(Number(i.value))
    })
    const valueNum: number = missingValue(valueArr)

    Object.assign(form, { text: '', value: valueNum.toString() })
    visible.value = true
  }

  // 編集ダイアログ
  const editDialog = (i: IFormSchema): void => {
    mode.value = 'edit'
    Object.assign(form, i)
    visible.value = true
  }

  // 作成&編集 送信
  const confirm = async (e: IFormSchema): Promise<void> => {
    Object.assign(form, e)
    colse()
    jobForm.value = mode.value === 'create' ? await createFormItems('job', form) : await editFormItems('job', form)
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // 読み取り
    jobForm.value = await getFormItems('job')
  })
</script>
