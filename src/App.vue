<template>
  <!-- User on store exists -->
  <div class="app-main-wrap" v-if="user">
    <Header />
    <RouterView />
  </div>
  <!-- Non exists user on store -->
  <div v-else>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import Header from '@/components/headerComponent.vue'

// User store initialization
const userStore = useUserStore()

// User computed instance
const user = computed(() => {
  return userStore.user
})
</script>

<style lang="scss">
@import '@/assets/styles/css/reset.css';
@import '@/assets/styles/css/init.css';

.app-main-wrap {
  min-width: 100vw;
  min-height: 100vh;
}
</style>
