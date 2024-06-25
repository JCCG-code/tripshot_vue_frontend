// Packages
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Local files
import App from './App.vue'
import router from './router'

// Initializations
const app = createApp(App)
const pinia = createPinia()

// Axios default base url of API
axios.defaults.baseURL = import.meta.env.VITE_API_URI

// Middlewares
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)

// Provide axios because of composition API
app.provide('axios', app.config.globalProperties.axios)

// App is mounted
app.mount('#app')
