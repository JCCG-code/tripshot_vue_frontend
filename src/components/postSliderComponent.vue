<template>
  <div class="photo-slider-wrap">
    <div class="slider">
      <div v-for="image in data.imagesData" :key="image" class="slide">
        <img :src="image.src" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { onMounted } from 'vue'

// Props definition
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const data = reactive({
  imagesData: []
})

onMounted(() => {
  // Load reactive data
  data.imagesData = props.images
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

.photo-slider-wrap {
  position: relative;
  overflow: hidden;

  /** Sizes */
  height: 450px;

  background-color: #1313136c;

  .slider {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: auto;

    /** Sizes */
    width: 100%;
    height: 450px;

    .slide {
      display: flex;
      flex: 0 0 100%;
      justify-content: center;
      align-items: center;
      scroll-snap-align: center;
    }
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  // button {
  //   background-color: red;
  // }
}
</style>
