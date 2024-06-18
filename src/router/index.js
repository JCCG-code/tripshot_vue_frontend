import { createRouter, createWebHistory } from 'vue-router'

// Local pages
import MainLayout from '../views/MainLayout.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    }
  ]
})

export default router
