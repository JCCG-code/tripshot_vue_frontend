<template>
  <div class="profile">
    <!-- header profile view -->
    <div class="header-profile-view-wrap">
      <!-- Profile picture -->
      <div class="profilePicture-wrap">
        <img
          v-if="data.profilePicture"
          alt="Profile icon"
          class="icon profile-picture profile-icon"
          :src="data.profilePicture"
        />
        <img
          v-else
          alt="Profile icon"
          class="icon edit-profile-icon"
          src="@/assets/svg/profileIcon.svg"
        />
      </div>
      <!-- Username and bio -->
      <div class="user-bio">
        <div class="username">
          <p>{{ data.username }}</p>
        </div>
        <div class="bio">
          <p>{{ data.bio }}</p>
        </div>
      </div>
    </div>
    <!-- Follows info -->
    <div class="follows-wrap">
      <div class="number-typeName-wrap">
        <p class="number">{{ data.postNumber }}</p>
        <p class="typeName">posts</p>
      </div>
      <div
        class="number-typeName-wrap"
        @click="
          $router.push({ path: '/' + route.params.userProfile + '/followers' })
        "
      >
        <p class="number">{{ data.followers }}</p>
        <p class="typeName">followers</p>
      </div>
      <div
        class="number-typeName-wrap"
        @click="
          $router.push({ path: '/' + route.params.userProfile + '/following' })
        "
      >
        <p class="number">{{ data.following }}</p>
        <p class="typeName">following</p>
      </div>
    </div>
    <div class="edit-follow-button">
      <button
        v-if="data.isConnected"
        @click="$router.push({ path: '/settings/editProfile' })"
      >
        Edit profile
      </button>
      <button v-else @click="followProfile(data.id)">Follow</button>
      <button>Share</button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { inject, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

// Reactive page data
const data = reactive({
  id: '',
  username: '',
  bio: '',
  profilePicture: '',
  followers: 0,
  following: 0,
  postNumber: 0,
  isConnected: false
})

// Initializations
const axios = inject('axios')
const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()

onMounted(async () => {
  if (route.params.userProfile) {
    await getUserProfile(route.params.userProfile)
    // Check if requested user is connected
    if (route.params.userProfile === userStore.user.username) {
      data.isConnected = true
    }
  }
})

watch(
  () => route.params.userProfile,
  async () => {
    await getUserProfile(route.params.userProfile)
    // Check if requested user is connected
    data.isConnected = !!(route.params.userProfile === userStore.user.username)
  }
)

/**
 * Allows to obtain the user data based on userProfile url param
 *
 * @param {String} userProfile - the user profile url param
 */
async function getUserProfile(userProfile) {
  appStore.setIsLoading(true)
  await axios
    .get('/users/' + userProfile, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Extract the user
        const userFound = response.data.data.resUser
        // Update data reactive
        data.id = userFound._id
        data.username = userFound.username
        data.bio = userFound.bio
        if (userFound.profilePicture) {
          data.profilePicture =
            axios.defaults.baseURL + '/uploads/' + userFound.profilePicture
        }
        data.followers = userFound.followers.length
        data.following = userFound.following.length
      } else {
        appStore.setInfoMessage({ message: 'User not found', isError: true })
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
 * Allows to follow an user
 *
 * @param {String} userProfile - the user profile url param
 */
async function followProfile(userIdToFollow) {
  await axios
    .post(
      '/users/' + userStore.user.username + '/follow',
      {
        id: userIdToFollow
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      console.log(response.data)
      if (response.data.status === 'OK') {
        // Reactive data
        appStore.setInfoMessage({
          message: response.data.data,
          isError: false
        })
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
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

/** ------------------------ */
/** Mobile and tablet design */
/** ------------------------ */
.header-profile-view-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;

  .profilePicture-wrap {
    /** Sizes */
    padding: 15px 15px 10px 15px;

    .profile-icon {
      /** Sizes */
      min-width: 50px;
      height: 50px;
    }
  }

  .user-bio {
    /** Sizes */
    margin-right: 10px;

    .username {
      font-size: 20px;
      font-weight: 500;
    }
    .bio {
      font-size: 12px;
    }
  }
}

.follows-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  /** Sizes */
  margin-top: 10px;

  .number-typeName-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .number {
      font-weight: bold;
    }
    .typeName {
      font-size: 10px;
    }
  }
}

.edit-follow-button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  button {
    text-align: center;
    background-color: $color-secondary;

    /** Sizes */
    margin: 20px;
    padding: 7px;
    width: 100%;
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .profile {
    margin-left: 198px;
  }
  .header-profile-view-wrap {
    .profilePicture-wrap {
      padding: 0;
      margin: 20px 40px;
      .profile-icon {
        min-width: 90px;
        height: 90px;
      }
    }
    .user-bio {
      .username {
        font-size: 30px;
        font-weight: 500;
      }
      .bio {
        font-size: 14px;
      }
    }
  }
  .follows-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    /** Sizes */
    margin: 0;

    .number-typeName-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 7px;

      .number {
        font-weight: bold;
        font-size: 18px;
      }
      .typeName {
        font-size: 16px;
      }
    }
  }
}
</style>
