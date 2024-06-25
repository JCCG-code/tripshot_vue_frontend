<template>
  <div class="login">
    <div class="form-wrapper">
      <h1 class="main-title">TripShot</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Error message -->
        <div v-if="data.errorMessage" class="error-message">
          {{ data.errorMessage }}
        </div>
        <input type="email" v-model="data.email" placeholder="Email" />
        <input type="password" v-model="data.password" placeholder="Password" />
        <button>Log In</button>
        <!-- Link to register -->
        <span
          >Don't have an account?
          <RouterLink to="/register" class="link">Click here</RouterLink></span
        >
      </form>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { inject, reactive } from 'vue'
import { RouterLink } from 'vue-router'

// Initializations
const axios = inject('axios')

// Reactive page data
const data = reactive({
  email: '',
  password: '',
  errorMessage: ''
})

/**
 * Asynchronously send login data to the backend side
 */
async function handleSubmit() {
  await axios
    .post('/auth/login', { email: data.email, password: data.password })
    .then((response) => {
      if (response.data.status === 'OK') {
        // Set localStorage with the token
        localStorage.setItem('token', response.data.data.token)
        // Go to home
        router.push({ path: '/' })
      }
    })
    .catch((error) => {
      data.errorMessage = error.response.data.data.error
      console.error('Error: ', error.response.data.data.error)
    })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

// Only one main title
.main-title {
  font-family: $font-main-title;
  font-size: 30px;
  font-weight: bold;
}

input,
button {
  border: 1px solid $color-background-shadow;
  border-radius: 10px;

  /** Sizes */
  padding: 15px;
  width: 100%;

  text-align: center;

  &::placeholder {
    opacity: 0.5;
  }
}

input:focus {
  outline: 1px solid white;
}

.link:hover {
  text-decoration: underline;
}

button {
  background-color: $color-text;
  color: $color-background;
  font-weight: 600;
}

/** --------------------------------- */
/** Mobile, tablet and desktop design */
/** --------------------------------- */

.login {
  position: fixed;
  background-color: $color-background;
  z-index: 1;

  /** Sizes */
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 500px;
    margin: 0 auto;

    .main-title {
      margin: 30px 0 50px 0;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      /** Sizes */
      min-width: 100%;
      padding: 50px;

      background-color: #111111;

      .error-message {
        color: red;

        /** Sizes */
        margin-bottom: 20px;
        width: 100%;
      }

      input,
      button {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
