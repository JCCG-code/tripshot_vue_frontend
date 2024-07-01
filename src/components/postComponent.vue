<template>
  <div class="post">
    <!-- Profile picture, username, place and country -->
    <div class="header">
      <img
        v-if="data.post.profilePicture"
        alt="Profile icon"
        class="icon"
        :src="data.post.profilePicture"
        @click="$router.push({ path: `/${data.post.username}` })"
      />
      <img
        v-else
        alt="Profile icon"
        class="icon"
        src="@/assets/svg/profileIcon.svg"
        @click="$router.push({ path: `/${data.post.username}` })"
      />
      <div class="header-postInfo">
        <p
          class="username"
          @click="$router.push({ path: `/${data.post.username}` })"
        >
          {{ data.post.username }}
        </p>
        <div>
          <p class="place-country">
            {{ data.post.place }}, {{ data.post.country }}
          </p>
          <p class="createdAt">{{ data.post.createdAt }}</p>
        </div>
      </div>
    </div>
    <!-- Slider -->
    <PostSlider :images="data.post.imagesUrl" />
    <!-- Icons -->
    <div class="icons-wrap">
      <div>
        <i class="pi pi-heart" style="font-size: 1.5rem"></i>
        <i class="pi pi-comment" style="font-size: 1.5rem"></i>
      </div>
      <i class="pi pi-share-alt" style="font-size: 1.5rem"></i>
    </div>
    <!-- Likes -->
    <div class="likes-wrap">
      <p>
        <span>{{ data.post.likes }}</span> likes
      </p>
    </div>
    <!-- Username and post description -->
    <div class="description-wrap">
      <p>
        <span @click="$router.push({ path: `/${data.post.username}` })">
          {{ data.post.username }}
        </span>
        · <span>{{ data.post.description }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import PostSlider from '@/components/postSliderComponent.vue'
import { useAppStore } from '@/stores/appStore'
import { reactive, inject, onMounted } from 'vue'

// Initializations
const axios = inject('axios')
const appStore = useAppStore()

// Props definition
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// Reactive data
const data = reactive({
  post: {
    username: '',
    profilePicture: '',
    imagesUrl: [],
    description: '',
    place: '',
    country: '',
    likes: 0,
    createdAt: ''
  }
})

onMounted(() => {
  // Load imagesUrl array
  props.post.imageUrl.map((url) => {
    const res = { src: axios.defaults.baseURL + '/uploads/' + url }
    data.post.imagesUrl.push(res)
  })
  // Get user data by id
  getUser(props.post.user)
})

async function getUser(userId) {
  await axios
    .get('/users/' + userId, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        const user = response.data.data.resUser
        data.post.username = user.username
        if (user.profilePicture) {
          data.post.profilePicture =
            axios.defaults.baseURL + '/uploads/' + user.profilePicture
        }
        data.post.description = props.post.description
        data.post.place = props.post.place
        data.post.country = props.post.country
        data.post.likes = props.post.likes.length
        data.post.createdAt = formatDate(new Date(props.post.createdAt))
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
}

/**
 * Allows to obtain the transcurred time
 */
function formatDate(date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`

  return formattedDate
}
</script>

<style lang="scss" scoped>
.icon {
  border-radius: 50%;

  /** Sizes */
  margin-left: 10px;
  width: 40px;
  height: 40px;
}

.post {
  /** Sizes */
  margin: 20px 0;
  margin-bottom: 60px;

  .header {
    display: flex;

    /** Sizes */
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;

    .header-postInfo {
      width: 100%;

      .username {
        font-weight: 600;
      }
      div {
        display: flex;
        justify-content: space-between;

        /** Sizes */
        margin-right: 10px;

        p:nth-child(1) {
          font-size: 12px;
        }
        p:nth-child(2) {
          font-size: 12px;
          opacity: 0.5;
        }
      }
    }
  }

  .icons-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    /** Sizes */
    margin: 15px 10px;

    div:nth-child(1) {
      display: flex;
      gap: 20px;
    }
  }

  .likes-wrap {
    margin-left: 10px;
    p {
      font-weight: 600;
    }
  }
  .description-wrap {
    margin-left: 10px;

    span:nth-child(1) {
      font-weight: 600;
    }
  }
}
</style>
