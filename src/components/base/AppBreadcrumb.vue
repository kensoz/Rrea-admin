<template>
  <!-- パンくず -->
  <Breadcrumb :home="{ icon: 'pi pi-th-large', to: '/' }" :model="props.label" />
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  // パンくずのタイプ
  interface IBreadcrumb {
    label: string
  }

  // ----- Props -----
  const props = defineProps<{
    label: IBreadcrumb[]
  }>()
</script>
