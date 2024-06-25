<template>
  <div class="settings">
    <div class="title-view">
      <img
        alt="Go back icon"
        class="icon"
        src="@/assets/svg/goBackIcon.svg"
        @click="$router.back()"
      />
      <h1>Settings</h1>
    </div>
    <!-- App info -->
    <section class="section-wrap">
      <div class="section-title">
        <hr />
        <p>TripShot information</p>
      </div>
      <div class="row-section">
        <p @click="$router.push({ path: '/about' })">About us</p>
      </div>
      <div class="row-section">
        <p>Terms of use</p>
      </div>
    </section>
    <!-- Config account -->
    <section class="section-wrap">
      <div class="section-title">
        <hr />
        <p>Manage your account</p>
      </div>
      <div class="row-section">
        <p @click="$router.push({ path: '/settings/editProfile' })">
          Edit profile
        </p>
      </div>
      <div class="row-section">
        <p @click="logout" style="color: red">Log out</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  // console.log(`About mounted.`)
})

function logout() {
  // Delete token property of localStorage
  localStorage.clear()
  // Go to home
  router.push({ path: '/' })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

/** ------------------------ */
/** Mobile and tablet design */
/** ------------------------ */
.section-wrap {
  margin-bottom: 20px;
}
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

.section-title {
  hr {
    height: 5px;
    background-color: #2e2e2e;
  }
  p {
    font-weight: bold;
    font-size: 12px;
    color: #727272;

    /** Sizes */
    margin-left: 10px;
    padding: 7px 0 10px 20px;
  }
}

.row-section {
  /** Sizes */
  padding: 10px 30px;
  margin-left: 20px;
  p {
  }
}

/** ------------- */
/* Desktop design */
/** ------------- */
@media (min-width: $desktop-breakpoint) {
  .settings {
    margin-left: 198px;
  }
  hr,
  img {
    display: none;
  }
}
</style>
