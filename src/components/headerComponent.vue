<template>
  <header>
    <!-- Header navigation -->
    <nav class="main-nav-responsive">
      <ul>
        <!-- Header main application title -->
        <li class="main-title">
          <h1>TripShot</h1>
        </li>
        <!-- Go to home -->
        <li>
          <img alt="Home icon" class="icon" src="@/assets/svg/homeIcon.svg" />
          <span>Home</span>
        </li>

        <!-- Go to new post -->
        <li>
          <img
            alt="New post icon"
            class="icon"
            src="@/assets/svg/newPostIcon.svg"
          />
          <span>Create</span>
        </li>

        <!-- Go to profile -->
        <li>
          <img
            alt="Profile icon"
            class="icon"
            src="@/assets/svg/profileIcon.svg"
          />
          <span> Profile </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Header mounted.`)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/_variables.scss';

// Only one main title
.main-title {
  font-family: $font-main-title;
  font-size: 25px;
  font-weight: bold;
}

/** ------------------------ */
/** Mobile and tablet design */
/** ------------------------ */

/** Not displayed */
.main-title,
span {
  display: none;
}

/* Navigation */
.main-nav-responsive {
  position: fixed;
  bottom: 0;
  border-top: solid 2px $color-background-shadow;

  /** Sizes */
  min-width: 100vw;

  ul {
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

    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .main-title {
        /** Sizes */
        padding: 20px;
        margin-bottom: 30px;
      }
      li {
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
