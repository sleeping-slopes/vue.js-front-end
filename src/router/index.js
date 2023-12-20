import { createRouter, createWebHistory } from 'vue-router'

import discoverView from '@/views/DiscoverView.vue'

import youView from '@/views/YouView.vue'
import yourSongsView from '@/views/YourSongsView.vue'
import yourPlaylistsView from '@/views/YourPlaylistsView.vue'
import yourHistoryView from '@/views/YourHistoryView.vue'
import yourFollowingView from '@/views/YourFollowingView.vue'

import userProfileView from '@/views/UserProfileView.vue'
import userPopularView from '@/views/UserPopularView.vue'
import userSongsView from '@/views/UserSongsView.vue'
import userLikesView from '@/views/UserLikesView.vue'
import userFollowersView from '@/views/UserFollowersView.vue'
import userFollowingView from '@/views/UserFollowingView.vue'
import userPlaylistsView from '@/views/UserPlaylistsView.vue'

import songView from '@/views/SongView.vue'
import songLikesView from '@/views/SongLikesView.vue'
import songPlaylistsView from '@/views/SongPlaylistsView.vue'
import songRelatedView from '@/views/SongRelatedView.vue'

const routes = [
  {
    path:'',
    redirect: {name:'Discover'}
  },
  {
    name: 'Discover',
    path: '/discover',
    component: discoverView,
  },
  {
    name: 'Feed',
    path: '/feed',
    component: '',
  },
  {
    name: 'You',
    path: '/you',
    component: youView,
    redirect: {name:'YourSongs'},
    children:
    [
      {
        path: 'songs',
        name: 'YourSongs',
        component: yourSongsView,
      },
      {
        path: 'playlists',
        name: 'YourPlaylists',
        component: yourPlaylistsView,
      },
      {
        path: 'following',
        name: 'YourFollowing',
        component: yourFollowingView,
      },
      {
        path: 'history',
        name: 'YourHistory',
        component: yourHistoryView,
      },
    ]
  },
  {
    name: "User",
    path: '/id/:login',
    component: userProfileView,
    props:true,
    children:
    [
      {
        name: "UserActivity",
        path: '',
        props:true,
        component:''
      },
      {
        name: "UserPopular",
        path: 'popular',
        component: userPopularView,
        props:true,
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
        component: userPlaylistsView,
        props:true,
      },
      {
        name: "UserLikes",
        path: 'likes',
        component: userLikesView,
        props:true,
      },
    ],
  },
  {
    name: "UserFollowers",
    path: '/id/:login/followers',
    component: userFollowersView,
    props:true
  },
  {
    name: "UserFollowing",
    path: '/id/:login/following',
    component: userFollowingView,
    props:true
  },
  {
    name: "Song",
    path: '/song/:id',
    component: songView,
    props:true,
    redirect: {name:'SongLikes'},
    children:
    [
      {
        name: "SongLikes",
        path: 'likes',
        props:true,
        component: songLikesView
      },
      {
        name: "SongPlaylists",
        path: 'playlists',
        component: songPlaylistsView,
        props:true
      },
      {
        name: "SongRelated",
        path: 'related',
        component: songRelatedView,
        props:true
      }
    ]
  }
]

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

router.beforeEach((to, from) => {

  document.title = to.meta?.title ?? '3V3R51NC3'

});

export default router
