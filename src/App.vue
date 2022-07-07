<!-- ######################################################
// *
// * 🔵Rrea-Admin
// * by renhou 2022
// *
// * github: https://github.com/kensoz/Rrea-admin
// * Vue.js3 + primeVue
// *
###################################################### -->

<template>
  <router-view />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import.meta.env.MODE === 'development' ? console.log('dev standing 🚀') : console.log('こんにちは！🙈')
</script>
