// Pacakges
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Local files
import App from './App.vue'
import router from './router'

// Initializations
const app = createApp(App)

// Middlewares
app.use(createPinia())
app.use(router)

// App is mounted
app.mount('#app')
