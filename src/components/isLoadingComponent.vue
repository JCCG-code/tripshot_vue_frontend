<template>
  <div class="isLoading">
    <i class="pi pi-spin pi-spinner" style="font-size: 4rem"></i>
    <p>Loading</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

.isLoading {
  position: fixed;
  top: 0;
  background-color: $color-background;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /** Sizes */
  min-width: 100vw;
  min-height: 100vh;
  gap: 30px;
}
</style>
