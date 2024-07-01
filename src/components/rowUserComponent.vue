<template>
  <div class="user-row" @click="$router.push({ path: `/${user.username}` })">
    <!-- Profile picture -->
    <div class="profilePicture-wrap">
      <img
        v-if="user.profilePicture"
        alt="Profile icon"
        class="icon profile-picture"
        :src="user.profilePicture"
      />
      <img
        v-else
        alt="Profile icon"
        class="icon"
        src="@/assets/svg/profileIcon.svg"
      />
    </div>
    <!-- Username -->
    <div>
      <p>{{ user.username }}</p>
    </div>
    <!-- Email -->
    <div>
      <p>{{ user.email }}</p>
    </div>
  </div>
  <hr />
</template>

<script setup>
// Props definition
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
  background-color: #2e2e2e;
}

.user-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  /** Sizes */
  margin: 10px;
  margin-left: 30px;
  max-width: 350px;

  cursor: pointer;

  .profilePicture-wrap {
    width: 60px;
    height: 60px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  /** Username */
  div:nth-child(2) {
    font-weight: 600;
  }
}
</style>
