<template>
  <!-- タイトル -->
  <div class="mb-3 mt-5 text-lg font-semibold">
    <span class="mr-2 text-primary"><i :class="`pi ${props.icon}`" /></span>
    <span>{{ props.label }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  // ----- Props -----
  const props = defineProps<{
    label: string
    icon: string
  }>()
</script>
