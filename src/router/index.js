import { createRouter, createWebHistory } from 'vue-router'

// Local pages
import HomeView from '@/views/HomeView.vue'
import NewPost from '@/views/NewPostView.vue'
import UserProfileView from '@/views/profile/UserProfileView.vue'
import FollowListView from '@/views/profile/FollowListView.vue'
import AboutView from '@/views/AboutView.vue'
import SettingsView from '@/views/SettingsView.vue'
import EditProfileView from '@/views/settings/EditProfileView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

// Local stores
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newPost',
      name: 'NewPost',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:userProfile',
      name: 'UserProfile',
      component: UserProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:userProfile/:followList',
      name: 'FollowList',
      component: FollowListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings/editProfile',
      name: 'EditProfile',
      component: EditProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ]
})

/**
 * Check if the user is authenticated before requesting a route on all routes that require authentication.
 */
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // Redirect to login
    if (!localStorage.getItem('token')) {
      next('/login')
      return
    } else {
      // Load user by localStorage token
      const userStore = useUserStore()
      // Load user into store
      await userStore.getUser(localStorage.getItem('token'))
      // Check user
      if (!userStore.$state.user) {
        next('/login')
        return
      }
      next()
      return
    }
  }
  next()
})

export default router
