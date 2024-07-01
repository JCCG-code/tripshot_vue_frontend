<template>
  <div class="editProfile">
    <div class="title-view">
      <img
        alt="Go back icon"
        class="icon back-icon"
        src="@/assets/svg/goBackIcon.svg"
        @click="$router.back()"
      />
      <h1>Edit profile</h1>
    </div>
    <!-- Edit profile form -->
    <section class="section-wrap">
      <form @submit.prevent="editProfile" enctype="multipart/form-data">
        <!-- Edit profile picture -->
        <div class="profilePicture-wrap">
          <img
            v-if="data.user.profilePicture"
            alt="Profile icon"
            class="icon profile-picture edit-profile-icon"
            :src="data.user.profilePicture"
            @click="triggerFileInput"
          />
          <img
            v-else
            alt="Profile icon"
            class="icon edit-profile-icon"
            src="@/assets/svg/profileIcon.svg"
            @click="triggerFileInput"
          />
          <p @click="triggerFileInput">Edit profile picture</p>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            @change="onFileSelected"
            style="display: none"
          />
        </div>
        <p>Username</p>
        <input type="text" v-model="data.user.username" />
        <p>Bio</p>
        <input type="text" v-model="data.user.bio" />
        <p>Email</p>
        <input type="email" v-model="data.user.email" />
        <p>Change password</p>
        <input type="password" v-model="data.user.password" />
        <button>Update</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { inject, onMounted, reactive, watch } from 'vue'

// Reactive page data
const data = reactive({
  user: {
    id: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    profilePicture: ''
  }
})

// Initializations
const axios = inject('axios')
const appStore = useAppStore()
const userStore = useUserStore()

onMounted(() => {
  if (userStore.user) {
    // Update user id
    data.user.id = userStore.user.id
    // Update username
    data.user.username = userStore.user.username
    // Update email
    data.user.email = userStore.user.email
    // Update bio
    data.user.bio = userStore.user.bio
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
    data.user.id = userStore.user.id
    data.user.username = userStore.user.username
    data.user.email = userStore.user.email
    if (userStore.user.profilePicture) {
      data.user.profilePicture =
        axios.defaults.baseURL + '/uploads/' + userStore.user.profilePicture
    }
  }
)

/**
 * Allows to update the user profile
 */
async function editProfile() {
  const formData = new FormData()
  formData.append('username', data.user.username)
  formData.append('bio', data.user.bio)
  formData.append('email', data.user.email)
  formData.append('password', data.user.password)
  if (data.user.profilePicture.name) {
    formData.append(
      'profilePicture',
      data.user.profilePicture,
      data.user.profilePicture.name
    )
  }

  appStore.setIsLoading(true)
  await axios
    .put('/users/' + data.user.id, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Set stored user
        userStore.setUser(response.data.data.userData)
        // Modal data
        appStore.setInfoMessage({
          message: 'Your profile has been updated!',
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
  appStore.setIsLoading(false)
}

/**
 * Allows to update profile picture if it changes
 *
 * @param {object} e - event javascript object
 */
async function onFileSelected(e) {
  data.user.profilePicture = e.target.files[0]
  await editProfile()
}

/**
 * Triggers file input
 */
function triggerFileInput() {
  const fileInput = document.getElementById('profilePicture')
  fileInput.click()
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

.profilePicture-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;

  .edit-profile-icon {
    /** Sizes */
    width: 70px;
    height: 70px;
  }
  p {
    color: $color-secondary;
    font-size: 12px;
    font-weight: 600;

    /** Sizes */
    margin-top: 5px;
  }
}

input,
button {
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

button {
  background-color: $color-text;
  color: $color-background;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;

  /** Sizes */
  margin-top: 40px;

  &:hover {
    background-color: #929292;
  }
}

form {
  /** Sizes */
  margin: 0 30px;

  p {
    color: #727272;
    font-size: 12px;
    font-weight: 600;

    /** Sizes */
    margin-top: 10px;
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .editProfile {
    margin-left: 198px;
  }
  .back-icon {
    display: none;
  }
  form {
    /** Sizes */
    margin: 0 250px;
  }
}
</style>
