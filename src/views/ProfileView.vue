<template>
  <div class="profile">
    <h1>This is the profile page of {{ username }}</h1>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()

const username = computed(() => {
  return userStore.user.username
})
</script>

<style></style>
