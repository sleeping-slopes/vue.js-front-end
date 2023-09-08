import { createRouter, createWebHistory } from 'vue-router'
import DiscoverView from '../views/DiscoverView.vue'
import MyLibraryView from '../views/MyLibraryView.vue'

const routes = [
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView
  },
  {
    path: '/library',
    name: 'My library',
    component: MyLibraryView,

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
