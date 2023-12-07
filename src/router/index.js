import { createRouter, createWebHistory } from 'vue-router'
import discoverView from '@/views/DiscoverView.vue'
import myLibraryView from '@/views/MyLibraryView.vue'

import playlistModal from '@/views/PlaylistModalView.vue'
import logInModal from '@/views/LogInModalView.vue'
import signUpModal from '@/views/SignUpModalView.vue'

import userProfileView from '@/views/UserProfileView.vue'
import userPopularView from '@/views/UserPopularView.vue'
import userSongsView from '@/views/UserSongsView.vue'
import userLikesView from '@/views/UserLikesView.vue'

import userFollowers from '@/views/UserFollowers.vue'
import userFollowing from '@/views/UserFollowing.vue'

const routes = [
  {
    name: 'Discover',
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
    name: 'Feed',
    path: '/feed',
    component: '',
  },
  {
    name: 'Library',
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
    props:true,
    children:
    [
      {
        name: "UserActivity",
        path: '',
        props:true,
        // component:''
      },
      {
        name: "UserPopular",
        path: 'popular',
        component: userPopularView,
        props:true,
        children:
        [
          {
            path: 'playlist/:id/',
            component: playlistModal,
            props:true,
          }
        ]
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
        component: '',
      },
      {
        name: "UserLikes",
        path: 'likes',
        component: userLikesView,
        props:true,
        children:
        [
          {
            path: 'playlist/:id/',
            component: playlistModal,
            props:true,
          }
        ]
      },
    ],

  },
  {
    name: "UserFollowers",
    path: '/id/:login/followers',
    component: userFollowers,
    props:true
  },
  {
    name: "UserFollowing",
    path: '/id/:login/following',
    component: userFollowing,
    props:true
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
