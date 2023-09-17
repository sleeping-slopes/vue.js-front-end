import { createRouter, createWebHistory } from 'vue-router'
import discoverView from '@/views/discoverView.vue'
import myLibraryView from '@/views/myLibraryView.vue'
import playlistModal from '@/components/playlistModal.vue'
import logInModal from '@/components/logInModal.vue'
import artistCardView from '@/views/artistCardView.vue'

const routes = [
  {
    path: '/discover',
    component: discoverView,
    children:
    [
      {
        path: 'playlist/:playlistID',
        component: playlistModal
      },
      {
        path: 'artist/:artistID',
        component: artistCardView
      }
    ]
  },
  {
    path: '/library',
    component: myLibraryView,
    children:
    [
      {
        path: 'playlist/:playlistID',
        component: playlistModal
      }
    ]
  },
  {
    path: '/login',
    component: logInModal
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
