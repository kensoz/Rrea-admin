<template>
  <Dialog :visible="props.visible" :style="{ width: '25vw' }" :modal="true" :closable="false">
    <!-- ヘッダ -->
    <template #header>
      <div class="text-xl font-semibold">
        <span class="mr-2 text-primary">
          <i class="pi pi-pencil" />
        </span>
        パスワード変更
      </div>
    </template>

    <!-- メッセージ -->
    <Message v-if="isBlank || isDuplicate" severity="error">
      {{ isDuplicate ? 'パスワードは一致していません' : '未入力項目があります' }}
    </Message>

    <!-- フォームCRUD -->
    <div class="field flex flex-column">
      <label class="font-semibold">ID</label>
      <div class="p-inputgroup mb-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-bolt" />
        </span>
        <InputText type="text" :placeholder="props.adminId" disabled />
      </div>

      <label class="font-semibold">パスワード<span class="text-red-300">*</span></label>
      <div class="p-inputgroup mb-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-unlock" />
        </span>
        <InputText v-model="passWord.first" maxlength="15" />
      </div>

      <label class="font-semibold">パスワード確認<span class="text-red-300">*</span></label>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-unlock" />
        </span>
        <InputText v-model="passWord.confirm" maxlength="15" />
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

  // ----- Props & Custom Events -----
  const props = defineProps<{
    visible: boolean
    adminId: string
  }>()

  const emit = defineEmits<{
    (f: 'colse'): void
    (f: 'confirm', pw: string): void
  }>()

  // ----- フォーム -----
  interface IPassWord {
    first: string
    confirm: string
  }

  let passWord = reactive<IPassWord>({
    first: '',
    confirm: '',
  })

  console.log(passWord)

  // 送信前にチェック
  let isBlank = ref<boolean>(false)
  let isDuplicate = ref<boolean>(false)

  const confirm = async (): Promise<void> => {
    isBlank.value = false
    isDuplicate.value = false

    if (passWord.first === '') {
      isBlank.value = true
    } else if (passWord.first !== passWord.confirm) {
      isDuplicate.value = true
    } else {
      await emit('confirm', passWord.first)
      passWord.first = ''
      passWord.confirm = ''
    }
  }
</script>
