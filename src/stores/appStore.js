import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    infoMessage: null,
    isLoading: false
  }),
  actions: {
    /**
     * Set the infoMessage data in session
     *
     * @param {object} infoMessage - the infoMessage object
     */
    setInfoMessage(infoMessage) {
      this.infoMessage = infoMessage
    },

    /**
     * Set the isLoading data in session
     *
     * @param {object} isLoading - the isLoading object
     */
    setIsLoading(isLoading) {
      this.isLoading = isLoading
    },

    /**
     * Clear the infoMessage data in session
     */
    clearInfoMessage() {
      this.infoMessage = null
    }
  }
})
