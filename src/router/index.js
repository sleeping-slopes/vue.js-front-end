import { createRouter, createWebHistory } from 'vue-router'
import discoverView from '@/views/DiscoverView.vue'
import myLibraryView from '@/views/MyLibraryView.vue'
import playlistModal from '@/components/playlistModal.vue'
import logInModal from '@/components/logInModal.vue'
import signUpModal from '@/components/signUpModal.vue'
import artistCardView from '@/views/artistCardView.vue'

const routes = [
  {
    path: '/discover',
    redirect:'/discover/main',
    children:
    [
      {
        path:'main',
        component: discoverView,
        children:
        [
          {
            path: 'playlist/:playlistID',
            component: playlistModal
          },
        ]
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
  },
  {
    path: '/signup',
    component: signUpModal
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
