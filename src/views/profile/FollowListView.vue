<template>
  <div class="follow-list">
    <div class="title-view">
      <img
        alt="Go back icon"
        class="icon back-icon"
        src="@/assets/svg/goBackIcon.svg"
        @click="$router.back()"
      />
      <h1>{{ data.title }}</h1>
    </div>
    <!-- All users obtained -->
    <div>
      <div class="rows" v-if="data.users.length > 0">
        <rowUserComponent
          v-for="user in data.users"
          :key="user.username"
          :user="user"
        ></rowUserComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { inject, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import rowUserComponent from '@/components/rowUserComponent.vue'

// Initializations
const appStore = useAppStore()
const route = useRoute()
const axios = inject('axios')

// Reactive data
const data = reactive({
  title: '',
  percent: 0,
  users: []
})

// On mounted component
onMounted(async () => {
  // Check followList param
  switch (route.params.followList) {
    case 'followers':
      data.title = 'Followers'
      await getFollowList(route.params.userProfile, route.params.followList)
      break
    case 'following':
      data.title = 'Following'
      await getFollowList(route.params.userProfile, route.params.followList)
      break
    default:
      appStore.setInfoMessage({
        message: 'Site not developed',
        isError: true
      })
      break
  }
})

/**
 * Allows to get followers or following user list
 */
async function getFollowList(userId, followListType) {
  appStore.setIsLoading(true)
  await axios
    .get('/users/' + userId + '/' + followListType, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Get profilePicture path
        const res = getProfilePicturePath(response.data.data)
        if (res.length === 0) {
          appStore.setInfoMessage({
            message: 'Any user obtained',
            isError: false
          })
        }
        // Save into data.users reactive array the obtained response
        data.users = res
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
 * Allows to get the full profile picture path
 */
function getProfilePicturePath(users) {
  users.map((user) => {
    if (user.profilePicture) {
      user.profilePicture =
        axios.defaults.baseURL + '/uploads/' + user.profilePicture
    }
  })
  return users
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

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .follow-list {
    margin-left: 198px;
  }
  .back-icon {
    display: none;
  }
}
</style>
