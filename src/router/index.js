import { createRouter, createWebHistory } from 'vue-router'
import discoverView from '@/views/DiscoverView.vue'
import myLibraryView from '@/views/MyLibraryView.vue'
import playlistModal from '@/components/playlistModal.vue'
import logInModal from '@/components/logInModal.vue'
import signUpModal from '@/components/signUpModal.vue'
import userProfileView from '@/views/UserProfileView.vue'
import userSongsView from '@/views/UserSongsView.vue'

const routes = [
  {
    path: '/discover',
    component: discoverView,
    children:
    [
      {
        path: 'playlist/:id/',
        component: playlistModal,
        props:true,
      },
    ]
  },
  {
    path: '/feed',
    component: discoverView,
  },
  {
    path: '/library',
    component: myLibraryView,
    children:
    [
      {
        path: 'playlist/:id',
        component: playlistModal,
        props:true,
      }
    ]
  },
  {

    path: '/id/:login',
    component: userProfileView,
    redirect: { name: "UserPopular"},
    props:true,
    children:
    [
      {
        name: "UserPopular",
        path: 'popular',
        component: userSongsView,
        props:true
      },
      {
        name: "UserSongs",
        path: 'songs',
        component: userSongsView,
        props:true
      },
      {
        name: "UserPlaylists",
        path: 'playlists',
        // component: userSongsView
      },
      {
        name: "UserFollowers",
        path: 'followers',
        // component: userSongsView
      },
      {
        name: "UserFollowing",
        path: 'following',
        // component: userSongsView
      },
    ]
  },
  {
    path: '/signup',
    component: signUpModal
  },
  {
    path: '/login',
    component: logInModal
  }
]

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

export default router
