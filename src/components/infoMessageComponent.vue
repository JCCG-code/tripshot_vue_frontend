<template>
  <div :class="infoModal">
    <div>{{ message }}</div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  isError: {
    type: Boolean,
    required: true
  }
})

const infoModal = computed(() => ({
  'info-message-wrap': true,
  'infoModal-error': props.isError,
  'infoModal-info': !props.isError
}))
</script>

<style lang="scss" scoped>
.info-message-wrap {
  background-color: #141414;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0 0 20px #000000;

  /** Placement */
  display: flex;
  flex-direction: column;
  gap: 10px;

  /** Sizes */
  padding: 20px;
  margin: 20px;
}

.infoModal-error {
  border-left: 2px solid red;
}

.infoModal-info {
  border-left: 2px solid green;
}
</style>
