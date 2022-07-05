<template>
  <Dialog
    :visible="props.visible"
    :breakpoints="{ '960px': '50vw', '640px': '90vw' }"
    :style="{ width: '25vw' }"
    :modal="true"
    :closable="false"
  >
    <!-- ヘッダ -->
    <template #header>
      <div class="text-xl font-semibold">
        <span class="mr-2 text-primary">
          <i :class="[props.mode === 'create' ? 'pi pi-plus' : 'pi pi-pencil']" />
        </span>
        <span>{{ props.mode === 'create' ? '新規作成' : '編集' }}</span>
      </div>
    </template>

    <!-- メッセージ -->
    <Message v-if="isBlank" severity="error"> 未入力項目があります </Message>

    <!-- フォームCRUD -->
    <div class="field flex flex-column">
      <label class="font-semibold">テキスト<span class="text-red-300">*</span></label>
      <div class="p-inputgroup mb-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-pencil" />
        </span>
        <InputText v-model="form.text" maxlength="15" />
      </div>

      <label class="font-semibold mt-2">
        ヴァリュー
        <span class="text-red-300">*</span>
        <span class="text-xs font-normal">
          {{ props.mode === 'create' ? '（自動でヴァリューを振ります）' : '（ヴァリューの編集はできません）' }}
        </span>
      </label>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-bolt" />
        </span>
        <InputText v-model="form.value" maxlength="2" disabled />
      </div>
    </div>

    <!-- フッター -->
    <template #footer>
      <Button label="取消" icon="pi pi-times" class="p-button-outlined p-button-warning" @click="emit('colse')" />
      <Button label="決定" icon="pi pi-check" @click="confirm()" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineEmits, defineProps } from 'vue'
  import type { IFormSchema } from '../../types'

  // ----- Props & Custom Events -----
  const props = defineProps<{
    visible: boolean
    mode: string
    form: IFormSchema
  }>()

  const emit = defineEmits<{
    (f: 'colse'): void
    (f: 'confirm', e: IFormSchema): void
  }>()

  // ----- フォーム -----
  let form = reactive<IFormSchema>(props.form)

  // 送信前にチェック
  let isBlank = ref<boolean>(false)
  const confirm = async (): Promise<void> => {
    isBlank.value = false

    if (form.text === '') {
      isBlank.value = true
    } else {
      await emit('confirm', form)
    }
  }
</script>
