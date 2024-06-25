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
    <section class="section-wrap" v-if="data.loading">
      <div class="loading-data-wrap">
        <p>Loading profile</p>
      </div>
    </section>
    <section class="section-wrap" v-else>
      <form @submit.prevent="editProfile" enctype="multipart/form-data">
        <!-- Edit profile picture -->
        <div class="profilePicture-wrap">
          <img
            v-if="data.profilePicturePath"
            alt="Profile icon"
            class="icon profile-picture edit-profile-icon"
            :src="data.profilePicturePath"
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
        <input type="text" v-model="data.username" />
        <p>Bio</p>
        <input type="text" v-model="data.bio" />
        <p>Email</p>
        <input type="email" v-model="data.email" />
        <p>Password</p>
        <input type="password" v-model="data.password" />
        <button>Update</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed, inject, onMounted, reactive } from 'vue'

// Reactive page data
const data = reactive({
  id: '',
  username: '',
  email: '',
  password: '',
  bio: '',
  profilePicture: '',
  profilePicturePath: '',
  errorMessage: '',
  loading: false
})

// Initializations
const axios = inject('axios')
const userStore = useUserStore()

// Computed page data
const userStored = computed(() => {
  return userStore.user
})

onMounted(() => {
  if (userStored.value) {
    // Update user id
    data.id = userStored.value.id
    // Update username
    data.username = userStored.value.username
    // Update email
    data.email = userStored.value.email
    // Update bio
    data.bio = userStored.value.bio
    // Update profile picture
    if (userStored.value.profilePicture) {
      data.profilePicturePath =
        axios.defaults.baseURL + '/uploads/' + userStored.value.profilePicture
    }
  }
})

/**
 *
 */
async function editProfile() {
  const formData = new FormData()
  formData.append('username', data.username)
  formData.append('bio', data.bio)
  formData.append('email', data.email)
  formData.append('password', data.password)
  if (data.profilePicture) {
    formData.append(
      'profilePicture',
      data.profilePicture,
      data.profilePicture.name
    )
  }

  await axios
    .put('/users/' + data.id, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      if (response.data.status === 'OK') {
        data.loading = true
        // Set stored user
        userStore.setUser(response.data.data.userData)
        // Reload the page and load new user stored
        location.reload()
        data.loading = false
      }
    })
    .catch((error) => {
      data.errorMessage = error.response.data.data.error
      console.error('Error: ', error.response.data.data.error)
    })
}

/**
 * Allows to update profile picture if it changes
 *
 * @param {object} e - event javascript object
 */
async function onFileSelected(e) {
  data.profilePicture = e.target.files[0]
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

.loading-data-wrap {
  height: calc(100vh - 154px);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 20px;
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
    color: #c06767;
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

  /** Sizes */
  margin-top: 40px;
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
