<template>
  <Dialog
    :visible="props.visible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '40vw' }"
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
    <Message v-if="isBlank" severity="error">
      {{ blankStr }}
    </Message>

    <!-- フォームCRUD -->
    <div class="field flex flex-column">
      <div class="mb-2">
        <!-- ID -->
        <label class="font-semibold mt-2">
          ID
          <span class="text-red-300">*</span>
          <span class="text-xs font-normal">
            {{ props.mode === 'create' ? '（自動でIDを振ります）' : '（IDの編集はできません）' }}
          </span>
        </label>
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-bolt" />
          </span>
          <InputText v-model="form.id" maxlength="5" disabled />
        </div>
      </div>

      <div class="grid">
        <div class="col-12 md:col">
          <!-- アップロード -->
          <label class="font-semibold mt-2">
            メンバー写真
            <span class="text-xs font-normal">（推奨3:4）</span>
            <span class="text-red-300">*</span>
          </label>
          <FileUpload
            mode="basic"
            accept="image/*"
            :max-file-size="5242880"
            choose-label="アップロード"
            :auto="true"
            :custom-upload="true"
            @uploader="uploader"
          />
        </div>

        <div v-if="form.photo !== ''" class="col-12 md:col flex flex-column">
          <!-- 写真プレビュー -->
          <label class="font-semibold mt-2">写真プレビュー</label>
          <div class="ra-bg pt-1 flex justify-content-center align-items-center">
            <Image :src="form.photo" alt="Image" width="60" height="80" />
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col-12 md:col">
          <!-- 氏名 -->
          <label class="font-semibold">氏名<span class="text-red-300">*</span></label>
          <div class="p-inputgroup mb-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-list" />
            </span>
            <InputText v-model="form.name" maxlength="10" />
          </div>
        </div>

        <div class="col-12 md:col">
          <!-- カタカナ -->
          <label class="font-semibold">
            カタカナ
            <span class="text-red-300">*</span>
            <span class="text-xs font-normal">（全角カタカナ）</span>
          </label>
          <div class="p-inputgroup mb-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-list" />
            </span>
            <InputText v-model="form.nameSpell" maxlength="20" />
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="col-12 md:col">
          <!-- 職務 -->
          <label class="font-semibold">職務<span class="text-red-300">*</span></label>
          <div class="p-inputgroup mb-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-briefcase" />
            </span>
            <Dropdown v-model="form.jobCode" :options="formData.job" option-label="text" option-value="value" />
          </div>
        </div>

        <div class="col-12 md:col">
          <!-- 種族 -->
          <label class="font-semibold">種族<span class="text-red-300">*</span></label>
          <div class="p-inputgroup mb-1">
            <span class="p-inputgroup-addon">
              <i class="pi pi-users" />
            </span>
            <Dropdown v-model="form.raceCode" :options="formData.race" option-label="text" option-value="value" />
          </div>
        </div>
      </div>

      <!-- スキル -->
      <div class="mb-2">
        <label class="font-semibold">スキル<span class="text-red-300">*</span></label>
        <div class="p-inputgroup mb-1">
          <span class="p-inputgroup-addon">
            <i class="pi pi-book" />
          </span>
          <InputText v-model="form.skill" maxlength="20" />
        </div>
      </div>
    </div>

    <!-- フッター -->
    <template #footer>
      <div class="mt-2 md:mt-0">
        <Button label="取消" icon="pi pi-times" class="p-button-outlined p-button-warning" @click="emit('colse')" />
        <Button label="決定" icon="pi pi-check" @click="confirm()" />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineEmits, defineProps, onMounted } from 'vue'
  import type { IUserSchema, IFormData, IFormSchema } from '../../types'
  import { FileUploadRemoveEvent } from 'primevue/fileupload'
  import useFormApi from '../../hooks/useFormApi'
  import useHooks from '../../hooks/useHooks'

  // ----- use hooks -----
  const { errorToast } = useHooks()
  const { getFormItems } = useFormApi()

  // ----- Props & Custom Events -----
  const props = defineProps<{
    visible: boolean
    mode: string
    form: IUserSchema
  }>()

  const emit = defineEmits<{
    (f: 'colse'): void
    (f: 'confirm', e: IUserSchema): void
  }>()

  // ----- フォーム -----
  let form = reactive<IUserSchema>(props.form)
  let formData = reactive<IFormData>({ name: [], job: [], race: [] })

  // ----- uploadフォーム -----
  // 写真をblobからbase64文字列に
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader()

      fileReader.onloadend = (): void => resolve(fileReader.result as string)
      fileReader.readAsDataURL(blob)
      fileReader.onerror = (): void => {
        reject(errorToast('アップロード失敗'))
      }
    })
  }

  // 写真アップロード
  const uploader = async (e: FileUploadRemoveEvent): Promise<void> => {
    await blobToBase64(e.files[0]).then((res: string): void => {
      form.photo = res
    })
  }

  // ----- inputフォーム -----
  // 業務 & 種族のコードをマッピング: jobCode & raceCode
  const handleFormText = (key: 'job' | 'race', code: string): void => {
    formData[key].map((i: IFormSchema): void => {
      if (i.value === code) {
        form[key] = i.text
      }
    })
  }

  // 五十音順の行判定: nameCode
  const handleNameCode = (str: string): string => {
    const kana: Map<number, string> = new Map([
      [1, 'アイウエオ'],
      [2, 'カキクケコガギグゲゴ'],
      [3, 'サシスセソザジズゼゾ'],
      [4, 'タチツテトダヂヅデド'],
      [5, 'ナニヌネノ'],
      [6, 'ハヒフヘホパピプペポバビブベボ'],
      [7, 'マミムメモ'],
      [8, 'ヤユヨ'],
      [9, 'ラリルレロ'],
      [10, 'ワヲン'],
    ])

    // 存在の場合、カタカナの行数のkeyを返す
    for (let [key, value] of kana.entries()) {
      if (value.indexOf(str) !== -1) return key.toString()
    }

    // 存在しない場合、11を返す
    return '11'
  }

  // 送信前にチェック
  let isBlank = ref<boolean>(false)
  let blankStr = ref<string>('')

  type IKey = ['name', 'nameSpell', 'job', 'race', 'photo', 'skill']
  const key: IKey = ['name', 'nameSpell', 'job', 'race', 'photo', 'skill']
  const regNameKana = /^[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━ a-z A-Z ａ-ｚ Ａ-Ｚ ァ-ンヴーｧ-ﾝﾞﾟ]*$/

  const checkConfirm = (): void => {
    isBlank.value = false

    // 正式表現でカタカナチェック
    if (!regNameKana.test(form.nameSpell)) {
      isBlank.value = true
      blankStr.value = 'カタカナで全角カナで入力してください'
      return
    }

    // 未入力項目チェック
    key.map((i: 'name' | 'nameSpell' | 'job' | 'race' | 'photo' | 'skill'): void => {
      if (form[i] === '') {
        isBlank.value = true
        blankStr.value = '未入力項目があります'
        return
      }
    })
  }

  //  送信前に各コードを振る
  const checkCode = () => {
    handleFormText('job', form.jobCode)
    handleFormText('race', form.raceCode)
    form.nameCode = handleNameCode(form.nameSpell.substring(0, 1))
  }

  // 送信処理
  const confirm = async (): Promise<void> => {
    await checkCode()
    await checkConfirm()
    isBlank.value || emit('confirm', form)
  }

  // ----- lifecycle -----
  onMounted(async (): Promise<void> => {
    // フォーム読み取り
    formData.name = await getFormItems('name')
    formData.job = await getFormItems('job')
    formData.race = await getFormItems('race')
  })
</script>
