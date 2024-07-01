<template>
  <header>
    <!-- Header navigation -->
    <main class="main-nav-responsive">
      <nav>
        <!-- Header main application title -->
        <RouterLink to="/" class="main-title">
          <h1>TripShot</h1>
        </RouterLink>
        <!-- Go to home -->
        <RouterLink to="/">
          <img alt="Home icon" class="icon" src="@/assets/svg/homeIcon.svg" />
          <span>Home</span>
        </RouterLink>

        <!-- Go to new post -->
        <RouterLink to="/newPost">
          <img
            alt="New post icon"
            class="icon"
            src="@/assets/svg/newPostIcon.svg"
          />
          <span>Create</span>
        </RouterLink>

        <!-- Go to profile -->
        <RouterLink :to="'/' + data.user.username">
          <img
            v-if="data.user.profilePicture"
            alt="Profile icon"
            class="icon profile-picture"
            :src="data.user.profilePicture"
          />
          <img
            v-else
            alt="Profile icon"
            class="icon"
            src="@/assets/svg/profileIcon.svg"
          />
          <span>Profile</span>
        </RouterLink>

        <!-- Go to about us -->
        <RouterLink to="/settings">
          <img
            alt="Settings icon"
            class="icon"
            src="@/assets/svg/settingsIcon.svg"
          />
          <span>Settings</span>
        </RouterLink>
      </nav>
    </main>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { inject, onMounted, reactive, watch } from 'vue'
import router from '@/router'

// Initializations
const axios = inject('axios')
const userStore = useUserStore()
const route = useRouter()

const data = reactive({
  user: {
    username: '',
    profilePicture: ''
  }
})

// First time header is mounted
onMounted(() => {
  if (userStore.user) {
    // Update username
    data.user.username = userStore.user.username
    // Update profile picture
    if (userStore.user.profilePicture) {
      data.user.profilePicture =
        axios.defaults.baseURL + '/uploads/' + userStore.user.profilePicture
    }
  }
})

// Watching user store and update data if changes
watch(
  () => userStore.user,
  () => {
    data.user.username = userStore.user.username
    if (userStore.user.profilePicture) {
      data.user.profilePicture =
        axios.defaults.baseURL + '/uploads/' + userStore.user.profilePicture
    }
  }
)
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

// Only one main title
.main-title {
  font-family: $font-main-title;
  font-size: 25px;
  font-weight: bold;
}
.router-link-active {
  font-weight: bold;
}

/** ------------------------ */
/** Mobile and tablet design */
/** ------------------------ */

/** Not displayed */
.main-title,
.about,
span {
  display: none;
}

/* Navigation */
.main-nav-responsive {
  position: fixed;
  bottom: 0;
  border-top: solid 2px $color-background-shadow;

  background-color: $color-background;
  z-index: 100;

  /** Sizes */
  min-width: 100vw;

  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;

    /** Sizes */
    padding: 12px 0 5px 0;
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  /** Displayed */
  .main-title,
  span {
    display: inline;
  }

  /* Navigation */
  .main-nav-responsive {
    position: fixed;
    top: 0;
    left: 0;
    border: 0;
    border-right: solid 2px $color-background-shadow;

    /** Sizes */
    min-width: 200px;
    min-height: 100vh;

    nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .main-title {
        /** Sizes */
        padding: 20px;
        margin-bottom: 30px;
      }
      a {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        /** Sizes */
        min-width: 100%;
        padding: 15px 0;
        margin-left: 30px;

        .icon {
          margin: 0 15px;
        }
      }
    }
  }
}
</style>
