<template>
  <div class="photo-slider-wrap">
    <button class="prev-btn"><</button>
    <div class="slider">
      <div
        v-for="(image, index) in data.imagesData"
        :key="image"
        :id="index + '-image'"
        class="slide"
      >
        <img :src="image.src" />
      </div>
    </div>
    <button class="next-btn">></button>
  </div>
  <!-- List of name files -->
  <div class="namesList" v-if="data.imagesData.length > 0">
    <div v-for="(image, index) in data.imagesData">
      <a :href="'#' + index + '-image'">{{ image.name }}</a>
      <p @click="deleteImage(image.name)"><span>Delete</span></p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { defineEmits } from 'vue'

// Emits definition
const emit = defineEmits(['image-deleted'])

// Props definition
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const data = reactive({
  imagesData: [],
  currentPos: 0
})

onMounted(() => {
  // Load reactive data
  data.imagesData = props.images

  // Extract slide width
  const slider = document.getElementsByClassName('slider')[0]

  // Add events to btns
  const prevBtn = document.getElementsByClassName('prev-btn')[0]
  const nextBtn = document.getElementsByClassName('next-btn')[0]

  // Where scroll begins
  slider.scrollBy({
    left: 0,
    behavior: 'smooth'
  })

  // Move to left
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({
      left: -slider.clientWidth,
      behavior: 'smooth'
    })
  })

  // Move to right
  nextBtn.addEventListener('click', () => {
    slider.scrollBy({
      left: slider.clientWidth,
      behavior: 'smooth'
    })
  })
})

/**
 * Allows to delete an image of uploaded images
 */
function deleteImage(imageName) {
  const res = data.imagesData.filter((image) => image.name !== imageName)
  data.imagesData = res

  emit('image-deleted', data.imagesData)
}
</script>

<style lang="scss" scoped>
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

  .prev-btn {
    font-size: 20px;
    background-color: #ffffff3b;

    /** Placement */
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    /** Sizes */
    padding: 2px 12px;
  }

  .next-btn {
    font-size: 20px;
    background-color: #ffffff3b;

    /** Placement */
    z-index: 99;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    /** Sizes */
    padding: 2px 12px;
  }
}

.namesList {
  /** Sizes */
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff04;

    /** Sizes */
    padding: 5px;
    margin: 5px 0;

    a {
      margin-left: 10px;

      &:hover {
        text-decoration: underline;
      }
    }

    p:nth-child(2) {
      background-color: #ffffff1e;
      padding: 3px 10px;

      span {
        font-size: 16px;
      }

      &:hover {
        background-color: #ffffff31;
        cursor: pointer;
      }
    }
  }
}
</style>
