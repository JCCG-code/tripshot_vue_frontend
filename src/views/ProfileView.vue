<template>
  <div class="profile">
    <h1>This is the profile page of {{ $route.params.userProfile }}</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // console.log(`Profile mounted.`)
})
</script>

<style></style>
