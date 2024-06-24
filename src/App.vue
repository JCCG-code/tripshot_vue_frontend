<template>
  <div class="app-main-wrap">
    <Header />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

// Components and views
import Header from '@/components/headerComponent.vue'
</script>

<style lang="scss">
@import '@/assets/styles/css/reset.css';
@import '@/assets/styles/css/init.css';

.app-main-wrap {
  min-width: 100vw;
  min-height: 100vh;
}
</style>
