<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'メンバー管理' }, { label: 'メンバー' }]" />
    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- メッセージ -->
      <Message v-if="admin.permission === 2" severity="info">
        ゲストさんはメンバーのCRUDができますが、ローカルのCURDでデータへの反映はしません
      </Message>

      <!-- タイトル -->
      <AppTitle :icon="'pi-id-card'" label="メンバー管理" />

      <!-- テーブル -->
      <DataTable
        ref="csv"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="nembers"
        data-key="id"
        filter-display="menu"
        :global-filter-fields="['id', 'name', 'nameSpell', 'job', 'race', 'skill']"
        responsive-layout="scroll"
        show-gridlines
      >
        <!-- ヘッダ -->
        <template #header>
          <div class="flex flex-row justify-content-between">
            <div class="flex flex-row">
              <Button label="新規" icon="pi pi-plus" class="p-button-sm mr-1" @click="createDialog()" />
              <Button label="CSV" icon="pi pi-upload" class="p-button-secondary p-button-sm" @click="exportCSV()" />
              <Button icon="pi pi-replay" class="p-button-success p-button-sm ml-1" @click="reset()" />
            </div>

            <div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  class="p-inputtext-sm max-w-8rem sm:max-w-10rem md:max-w-full"
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
                @click="editDialog(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-outlined p-button-sm p-button-danger"
                @click="deleteDialog(slotProps.data)"
              />
            </div>
          </template>
        </Column>
        <Column field="id" header="ID" :sortable="true" />
        <Column field="name" header="氏名" :sortable="true">
          <template #body="slotProps">
            <Tag :value="slotProps.data.name" />
          </template>
        </Column>
        <Column field="nameSpell" header="カタカナ" />
        <Column field="job" header="職務" />
        <Column field="race" header="種族" />
        <Column field="skill" header="スキル" />

        <!-- フッター -->
        <template #footer> トータルアイテム：{{ nembers?.length }} </template>
      </DataTable>
    </div>

    <!-- ダイアログボックス：新規作成&編集 -->
    <AppNemberDialog :visible="visible" :mode="mode" :form="form" @colse="colse()" @confirm="confirm" />
  </section>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
  import type { IUserSchema } from '../../../types'
  import { FilterMatchMode } from 'primevue/api'
  import { useConfirm } from 'primevue/useconfirm'
  import useVariables from '../../../hooks/useVariables'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '../../../store'
  import useNemberApi from '../../../hooks/useNemberApi'
  import useHooks from '../../../hooks/useHooks'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/base/AppBreadcrumb.vue'))
  const AppNemberDialog = defineAsyncComponent(() => import('../../../components/base/AppNemberDialog.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/base/AppTitle.vue'))

  // ----- use hooks -----
  const confirml = useConfirm()
  const mainStore = useMainStore()
  const { admin } = storeToRefs(mainStore)
  const { nembersPrototype } = useVariables()
  const { messageToast, missingValue } = useHooks()
  const { getNemberItems, deleteNemberItems, createNemberItems, editNemberItems } = useNemberApi()

  // ----- テーブル -----
  // csv作成
  const csv = ref()
  const exportCSV = async (): Promise<void> => {
    await csv.value.exportCSV()
    messageToast()
  }

  // フィルタ
  const filters = ref({ global: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

  // リセット
  const reset = async (): Promise<void> => {
    nembers.value = await getNemberItems('user')
    messageToast()
  }

  // ----- ダイアログボック -----
  let visible = ref<boolean>(false)
  const colse = (): void => {
    visible.value = false
  }

  // ----- フォームCRUD -----
  let mode = ref<string>('create')
  let nembers = ref<IUserSchema[]>()
  let form = reactive<IUserSchema>(nembersPrototype)
  const resetNembersPrototype: IUserSchema = JSON.parse(JSON.stringify(nembersPrototype))

  // 削除ダイアログ
  const deleteDialog = (i: IUserSchema): void => {
    confirml.require({
      message: `「${i.name}さん」を削除してもよろしいですか`,
      header: '削除確認',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'p-button-outlined p-button-warning',
      accept: async (): Promise<void> => {
        // 削除前に権限チェック
        if (admin.value.permission === 2) {
          guestEditorDelete('deldete', i)
        } else {
          nembers.value = await deleteNemberItems('user', i.id)
        }
      },
    })
  }

  // 作成ダイアログ
  const createDialog = (): void => {
    mode.value = 'create'

    // valueの欠損値を探す、前に0を追加
    const idArr: number[] = []
    nembers.value?.map((i: IUserSchema): void => {
      idArr.push(Number(i.id))
    })
    const valueNum: number = missingValue(idArr)
    Object.assign(form, resetNembersPrototype, { id: ('00000' + valueNum.toString()).slice(-5) })

    visible.value = true
  }

  // 編集ダイアログ
  const editDialog = (i: IUserSchema): void => {
    mode.value = 'edit'
    Object.assign(form, i)
    visible.value = true
  }

  // 作成&編集 送信
  const confirm = async (e: IUserSchema): Promise<void> => {
    Object.assign(form, e)
    colse()

    // 作成&編集前に先に権限チェック
    if (admin.value.permission === 2) {
      mode.value === 'create' ? nembers.value?.push(e) : guestEditorDelete('edit', e)
    } else {
      nembers.value =
        mode.value === 'create' ? await createNemberItems('user', form) : await editNemberItems('user', form)
    }
  }

  // ----- ゲストの編集と削除 -----
  const guestEditorDelete = (mode: 'edit' | 'deldete', user: IUserSchema): void => {
    if (mode === 'edit') {
      nembers.value?.map((i: IUserSchema): void => {
        i.id === user.id && Object.assign(i, user)
      })
    } else {
      nembers.value = nembers.value?.filter((i: IUserSchema): boolean => i.id !== user.id)
    }
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // 読み取り
    nembers.value = await getNemberItems('user')
  })
</script>
