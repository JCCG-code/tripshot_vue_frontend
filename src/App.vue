<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>HEADER</h1>
  </header>

  <RouterView />

  <footer>
    <h1>FOOTER</h1>
  </footer>
</template>

<style lang="scss">
@import '@/assets/styles/css/reset.css';
@import '@/assets/styles/css/init.css';
</style>
