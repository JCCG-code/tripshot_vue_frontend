<template>
  <div class="newPost">
    <div class="title-view">
      <img
        alt="Go back icon"
        class="icon"
        src="@/assets/svg/goBackIcon.svg"
        @click="$router.back()"
      />
      <h1>New post</h1>
    </div>

    <div class="newPost-wrap">
      <!-- Photo slider -->
      <PhotoSlider
        :images="data.previewImages"
        @image-deleted="imageDeleted"
        v-if="data.previewImages.length > 0"
      />

      <div class="uploads-wrap">
        <!-- Upload visible button -->
        <button @click="triggerFileInput" class="upload-btn">
          <p>Uploads</p>
          <img
            alt="Upload icon"
            class="icon"
            src="@/assets/svg/uploadIcon.svg"
          />
        </button>
      </div>

      <!-- New post form -->
      <form @submit.prevent="newPost" enctype="multipart/form-data">
        <input
          type="file"
          name="profilePicture"
          id="profilePicture"
          @change="onFileSelected"
          multiple
          style="display: none"
        />
        <p class="section-description">Description</p>
        <input type="text" v-model="data.post.description" required />
        <p class="section-description">Place</p>
        <input type="text" v-model="data.post.place" required />
        <p class="section-description">Country</p>
        <input type="text" v-model="data.post.country" required />
        <button class="publish-btn" :disabled="data.previewImages.length <= 0">
          Publish post
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import PhotoSlider from '@/components/photoSliderComponent.vue'
import { useUserStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Stores initializations
const userStore = useUserStore()
const appStore = useAppStore()
const router = useRouter()

const data = reactive({
  post: {
    userId: '',
    description: '',
    place: '',
    country: ''
  },
  previewImages: []
})

async function newPost() {
  // Form-data form filled
  const formData = new FormData()
  formData.append('userId', userStore.user.id)
  formData.append('username', userStore.user.username)
  formData.append('description', data.post.description)
  formData.append('place', data.post.place)
  formData.append('country', data.post.country)
  // Append files
  data.previewImages.forEach((image) => {
    formData.append('imageUrl', image.file, image.file.name)
  })

  // Loading and axios calls
  appStore.setIsLoading(true)
  await axios
    .post('/posts', formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Modal data
        appStore.setInfoMessage({
          message: 'New post published successfully!',
          isError: false
        })
        router.push({ path: '/' })
      }
    })
    .catch((error) => {
      // Reactive data
      appStore.setInfoMessage({
        message: error.response.data.data.error,
        isError: true
      })
      console.error('Error: ', error.response.data.data.error)
    })
  appStore.setIsLoading(false)
}

/**
 * Allows to get uploaded pictures
 *
 * @param {object} e - event javascript object
 */
function onFileSelected(e) {
  // Extract files array object
  const filesArray = e.target.files
  // Checks all files
  for (const file of filesArray) {
    // Reader instance
    const reader = new FileReader()
    // Get url data for each file instance
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // Push on images array
      data.previewImages.push({
        name: file.name,
        src: e.target.result,
        file: file
      })
    }
  }
}

/**
 * Triggers file input
 */
function triggerFileInput() {
  const fileInput = document.getElementById('profilePicture')
  fileInput.click()
}

function imageDeleted(newArray) {
  data.previewImages = newArray
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

/** ------------------------ */
/** Mobile and tablet design */
/** ------------------------ */
.title-view {
  display: flex;
  align-items: center;

  /** Sizes */
  padding: 30px;

  img {
    /** Sizes */
    width: 25px;
    height: 25px;
    margin: 0 40px 0 5px;
  }

  h1 {
    font-size: 25px;
    font-weight: 600;
  }
}

.newPost-wrap {
  margin: 0 40px;
}

.section-description {
  color: #727272;
  font-size: 12px;
  font-weight: 600;

  /** Sizes */
  margin-top: 10px;
}

.uploads-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  /** Sizes */
  width: 100%;

  .upload-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $color-secondary;
    border-radius: 7px;

    /** Sizes */
    padding: 5px 10px;
    gap: 10px;
    margin: 20px 0;

    p {
      font-size: 16px;
    }
  }
}

input {
  background-color: #161616;
  color: #838383;

  /** Sizes */
  padding: 10px;
  margin: 5px 0;
  width: 100%;

  &::placeholder {
    opacity: 0.5;
  }
}

input:focus {
  outline: 1px solid white;
  color: $color-text;
}

.publish-btn {
  background-color: $color-text;
  color: $color-background;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;

  /** Sizes */
  padding: 10px;
  margin: 40px 0 100px 0;
  width: 100%;

  &:hover {
    background-color: #929292;
  }

  &:disabled {
    opacity: 0.3;
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .newPost {
    margin-left: 198px;
  }
  .newPost-wrap {
    margin: 0 150px;
  }
}
</style>
