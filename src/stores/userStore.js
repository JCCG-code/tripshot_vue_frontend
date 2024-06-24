import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    /**
     * Set the user data in session
     *
     * @param {object} user - the user object
     */
    setUser(user) {
      this.user = user
    },

    /**
     * Clear the user data in session
     */
    clearUser() {
      this.user = null
    },

    /**
     * Obtain the user based on his token
     *
     * @param {string} token
     */
    async getUser(token) {
      await axios
        .post(
          '/auth/user',
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          if (response.data.status === 'OK') {
            // Set user store
            this.setUser(response.data.data.user)
          } else {
            console.error('Error: ', response.data.data.error)
            this.clearUser()
          }
        })
        .catch((error) => {
          console.error('Error: ', error.response.data.data.error)
          this.clearUser()
        })
    }
  }
})
