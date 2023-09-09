import { createRouter, createWebHistory } from 'vue-router'
import DiscoverView from '../views/DiscoverView.vue'
import MyLibraryView from '../views/MyLibraryView.vue'
import playlistModal from '@/components/playlistModal.vue'

const routes = [
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView,
    children:
    [
      // {
      //   path: '/library/playlist/:playlistID',
      //   component: playlistModal
      // }
    ]
  },
  {
    path: '/library',
    name: 'My library',
    component: MyLibraryView,
    children:
    [
      // {
      //   path: '/library/playlist/:playlistID',
      //   component: playlistModal
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
