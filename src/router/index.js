import { createRouter, createWebHistory } from 'vue-router'

const routes =
[
  {
    path:'',
    redirect: {name:'Discover'}
  },
  {
    name: 'Discover',
    path: '/discover',
    component: () => import('@/views/DiscoverView.vue')
  },
  {
    name: 'Feed',
    path: '/feed',
    component: '',
    meta: { authRequired:true }
  },
  {
    name: 'You',
    path: '/you',
    component: () => import('@/views/YouView.vue'),
    redirect: {name:'YourSongs'},
    meta: { authRequired:true },
    children:
    [
      {
        path: 'songs',
        name: 'YourSongs',
        component: () => import('@/views/YourSongsView.vue')
      },
      {
        path: 'playlists',
        name: 'YourPlaylists',
        component: () => import('@/views/YourPlaylistsView.vue')
      },
      {
        path: 'following',
        name: 'YourFollowing',
        component: () => import('@/views/YourFollowingView.vue')
      },
      {
        path: 'history',
        name: 'YourHistory',
        component: () => import('@/views/YourHistoryView.vue')
      },
    ]
  },
  {
    name: "User",
    path: '/id/:login',
    component: () => import('@/views/UserProfileView.vue'),
    props:true,
    redirect: {name:'UserActivity'},
    children:
    [
      {
        name: "UserActivity",
        path: '',
        component: () => import('@/views/UserPopularView.vue'),
        props:true
      },
      {
        name: "UserPopular",
        path: 'popular',
        component: () => import('@/views/UserPopularView.vue'),
        props:true,
      },
      {
        name: "UserSongs",
        path: 'songs',
        component: () => import('@/views/UserSongsView.vue'),
        props:true
      },
      {
        name: "UserPlaylists",
        path: 'playlists',
        component: () => import('@/views/UserPlaylistsView.vue'),
        props:true
      },
      {
        name: "UserLikes",
        path: 'likes',
        component:() => import('@/views/UserLikesView.vue'),
        props:true
      },
    ],
  },
  {
    name: "UserFollowers",
    path: '/id/:login/followers',
    component: () => import('@/views/UserFollowersView.vue'),
    props:true
  },
  {
    name: "UserFollowing",
    path: '/id/:login/following',
    component: () => import('@/views/UserFollowingView.vue'),
    props:true
  },
  {
    name: "Song",
    path: '/song/:id',
    component: () => import('@/views/SongView.vue'),
    redirect: {name:'SongLikes'},
    props:true,
    children:
    [
      {
        name: "SongLikes",
        path: 'likes',
        component: () => import('@/views/SongLikesView.vue'),
        props:true

      },
      {
        name: "SongPlaylists",
        path: 'playlists',
        component: () => import('@/views/SongPlaylistsView.vue'),
        props:true
      },
      {
        name: "SongRelated",
        path: 'related',
        component: () => import('@/views/SongRelatedView.vue'),
        props:true
      }
    ]
  }
]

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

import API from '@/axios/API';

router.beforeEach(async (to, from, next) =>
{
  document.title = to.meta?.title ?? '3V3R51NC3'
  if (to.matched.some(route=>route.meta?.authRequired))
  {
    const user = await API.get('me');
    if (user.error)
    {
      const redirectLogIn = {name: from.name,query:{action:'login',to:to.name}};
      return next(redirectLogIn);
    }
    return next();
  }
  return next();
});

export default router
