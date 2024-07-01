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
  <Transition>
    <InfoMessage
      v-if="data.infoMessage"
      :message="data.infoMessage"
      :isError="data.isError"
      @click="closeModal"
    />
  </Transition>
  <!-- Is loading view -->
  <IsLoading v-if="appStore.isLoading" />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { computed, reactive, watch } from 'vue'
import Header from '@/components/headerComponent.vue'
import InfoMessage from '@/components/infoMessageComponent.vue'
import IsLoading from '@/components/isLoadingComponent.vue'

// Stores initialization
const userStore = useUserStore()
const appStore = useAppStore()

// User computed instance
const user = computed(() => {
  return userStore.user
})

const data = reactive({
  infoMessage: '',
  isError: false
})

// Watching infoMessage and isError changes
watch(
  () => appStore.infoMessage,
  () => {
    data.infoMessage = appStore.infoMessage.message
    data.isError = appStore.infoMessage.isError
  }
)

function closeModal() {
  data.infoMessage = ''
}
</script>

<style lang="scss">
@import '@/assets/styles/css/reset.css';
@import '@/assets/styles/css/init.css';

.app-main-wrap {
  min-width: 100vw;
  min-height: 100vh;
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
.v-enter-to,
.v-leave-from {
  transform: translateY(0px);
  opacity: 1;
}
</style>
