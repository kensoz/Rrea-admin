<template>
  <router-view />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import.meta.env.MODE === 'development' ? console.log('dev') : console.log('こんにちは！')
</script>
