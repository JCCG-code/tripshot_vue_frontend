<template>
  <div class="home">
    <div class="posts-wrap" id="postContainer">
      <PostComponent
        v-for="post in data.postsOnView"
        :key="post._id"
        :post="post"
      />
      <div v-if="data.loading">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { inject, onMounted, reactive } from 'vue'
import PostComponent from '@/components/postComponent.vue'

// Initializations
const axios = inject('axios')
const userStore = useUserStore()
const appStore = useAppStore()

const data = reactive({
  offset: 0,
  limit: 2,
  count: 0,
  postsOnView: [],
  loading: false
})

onMounted(() => {
  // Applies a listener on scroll page
  window.addEventListener('scroll', handleScroll)
  // Firsly we call to API with offset in 0
  getPosts(data.offset)
})

function handleScroll() {
  let scrollTop = document.documentElement.scrollTop
  let windowHeight = window.innerHeight
  let scrollHeight = document.documentElement.scrollHeight

  if (scrollTop + windowHeight >= scrollHeight) {
    data.offset += data.limit
    if (data.offset < data.count) getPosts(data.offset)
  }
}

/**
 * Allows to get posts based on data.offset variable
 */
async function getPosts(offset) {
  data.loading = true
  await axios
    .get('/posts', {
      params: {
        offset,
        limit: data.limit
      },
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Concat both arrays
        data.postsOnView = data.postsOnView.concat(response.data.data.resPosts)
        data.count = response.data.data.countPosts
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
  data.loading = false
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

.posts-wrap {
  margin-bottom: 80px;
}

.pi-spinner {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .home {
    margin-left: 198px;
  }
  .posts-wrap {
    margin: 100px;
  }
}
</style>
