<template>
  <section class="my-section">
    <!-- パンくず -->
    <AppBreadcrumb :label="[{ label: 'システム管理' }, { label: '管理者設定' }]" />
    <!-- コンテンツ -->
    <div class="my-contents">
      <!-- メッセージ -->
      <Message severity="error">Adminしか新規・編集・削除できません</Message>

      <!-- タイトル -->
      <AppTitle icon="pi-user-edit" label="管理者設定" />

      <!-- テーブル -->
      <DataTable
        ref="csv"
        v-model:filters="filters"
        class="p-datatable-sm"
        :value="authArr"
        data-key="id"
        filter-display="menu"
        :global-filter-fields="['id', 'permission']"
        responsive-layout="scroll"
        show-gridlines
      >
        <!-- ヘッダ -->
        <template #header>
          <div class="flex flex-row justify-content-between">
            <div class="flex flex-row">
              <Button
                label="ログアウト"
                icon="pi pi-sign-out"
                class="p-button-help p-button-sm mr-2"
                @click="logout()"
              />
            </div>

            <div>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" class="p-inputtext-sm" placeholder="検索" />
              </span>
            </div>
          </div>
        </template>

        <!-- コンテンツ -->
        <Column header="パスワード変更">
          <template #body="slotProps">
            <div class="flex flex-row">
              <Button
                icon="pi pi-pencil"
                class="p-button-outlined p-button-sm p-button-info mr-2"
                @click="passWordDialog(slotProps.data)"
              />
            </div>
          </template>
        </Column>
        <Column field="id" header="管理者ID" :sortable="true">
          <template #body="slotProps">
            <Tag
              v-if="admin.id === slotProps.data.id"
              icon="pi pi-user"
              severity="success"
              :value="`現在：${slotProps.data.id}`"
            />
            <Tag v-else :value="slotProps.data.id" />
          </template>
        </Column>
        <Column field="permission" header="パスワード">
          <template #body> ***** </template>
        </Column>
        <Column field="permission" header="権限" :sortable="true" />
        <Column field="permission" header="権限説明">
          <template #body="slotProps">
            {{
              slotProps.data.permission === 0
                ? 'マスター：パスワード変更などのすべて'
                : slotProps.data.permission === 1
                ? '管理員：DBへのCURD'
                : 'ゲスト：情報確認'
            }}
          </template>
        </Column>
        <Column field="time" header="前回の利用時間" :sortable="true" />

        <!-- フッター -->
        <template #footer> トータルアイテム：{{ authArr?.length }} </template>
      </DataTable>
    </div>
  </section>

  <!-- ダイアログボックス：パスワード修正 -->
  <AppAdminDialog :visible="visible" :admin-id="newAdminPassWord.id" @colse="colse()" @confirm="confirm" />
  <!-- ダイアログボックス：ガスト確認 -->
  <ConfirmDialog :breakpoints="{ '960px': '75vw', '640px': '90vw' }" />
</template>

<script lang="ts" setup>
  import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
  import type { ICommonRespon, IAuth, IAuthParam } from '../../../types'
  import { FilterMatchMode } from 'primevue/api'
  import { useConfirm } from 'primevue/useconfirm'
  import { useMainStore } from '../../../store'
  import useHooks from '../../../hooks'
  import { storeToRefs } from 'pinia'
  import axios from 'axios'

  // ----- AsyncComponent -----
  const AppBreadcrumb = defineAsyncComponent(() => import('../../../components/AppBreadcrumb.vue'))
  const AppAdminDialog = defineAsyncComponent(() => import('../../../components/AppAdminDialog.vue'))
  const AppTitle = defineAsyncComponent(() => import('../../../components/AppTitle.vue'))

  // ----- use hooks -----
  const confirml = useConfirm()
  const mainStore = useMainStore()
  const { admin } = storeToRefs(mainStore)
  const { logout, messageToast, errorToast } = useHooks()

  // ----- テーブル -----
  // フィルタ
  const filters = ref({ global: { value: undefined, matchMode: FilterMatchMode.CONTAINS } })

  // ----- ダイアログボック -----
  let visible = ref<boolean>(false)
  const colse = (): void => {
    visible.value = false
  }

  // ----- フォームCRUD -----
  let authArr = ref<IAuth[]>()
  let newAdminPassWord = reactive<IAuthParam>({ id: '', passWord: '' })

  // 読み取り
  const getAuth = async (): Promise<void> => {
    await axios
      .get<ICommonRespon<IAuth[]>>('/api/v1/auth')
      .then(res => {
        authArr.value = res.data.result
        authArr.value.push({ id: admin.value.id, permission: admin.value.permission, time: admin.value.time })
      })
      .catch((): void => {
        errorToast()
      })
  }

  // パスワード変更
  const confirm = async (pw: string): Promise<void> => {
    colse()

    await axios
      .patch<ICommonRespon>(`/api/v1/auth/${newAdminPassWord.id}`, { passWord: pw })
      .then((res): void => {
        messageToast(res.data.message)
      })
      .catch((): void => {
        errorToast()
      })
  }

  const passWordDialog = (e: IAuth): void => {
    if (e.id === 'guest') {
      confirml.require({
        message: 'ゲスト用のため、変更できません',
        header: 'お知らせ',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'hidden',
      })
    } else {
      newAdminPassWord.id = e.id
      visible.value = true
    }
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    await getAuth()
  })
</script>
