<template>
  <div class="main-layout">
    <Header />

    <RouterView />
  </div>
</template>

<script>
import Header from '@/components/headerComponent.vue'

export default {
  name: 'MainLayout',
  components: {
    Header
  }
}
</script>
