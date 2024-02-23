import { createRouter, createWebHistory } from 'vue-router'

const routes =
[
  {
    name: 'Root',
    path:'',
    redirect: {name:'Discover'}
  },
  {
    name: 'Discover',
    path: '/discover',
    component: () => import('@/views/DiscoverView.vue')
  },
  {
    name: 'Tag',
    path: '/tags/:tag',
    component: () => import('@/views/TagView.vue'),
    props:true,
    redirect: {name:'TagPopular'},
    children:
    [
      {
        name: 'TagPopular',
        path: '/tags/:tag/popular',
        component: () => import('@/views/Tag/TagPopularView.vue'),
        props:true
      },
      {
        name: 'TagNew',
        path: '/tags/:tag/new',
        component: () => import('@/views/Tag/TagNewView.vue'),
        props:true
      },
    ]
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import('@/views/SearchView.vue'),
    redirect: {name:'SearchSongs'},
    children:
    [
      {
        name: 'SearchSongs',
        path: '/search/songs',
        component: () => import('@/views/Search/SearchSongsView.vue')
      },
      {
        name: 'SearchPlaylists',
        path: '/search/playlists',
        component: () => import('@/views/Search/SearchPlaylistsView.vue')
      },
      {
        name: 'SearchUsers',
        path: '/search/users',
        component: () => import('@/views/Search/SearchUsersView.vue')
      },
    ]
  },
  {
    name: 'Feed',
    path: '/feed',
    component: () => import('@/views/FeedView.vue'),
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
        component: () => import('@/views/You/YourSongsView.vue')
      },
      {
        path: 'playlists',
        name: 'YourPlaylists',
        component: () => import('@/views/You/YourPlaylistsView.vue')
      },
      {
        path: 'following',
        name: 'YourFollowing',
        component: () => import('@/views/You/YourFollowingView.vue')
      },
      {
        path: 'history',
        name: 'YourHistory',
        component: () => import('@/views/You/YourHistoryView.vue')
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
        component: () => import('@/views/UserProfile/UserPopularView.vue'),
        props:true
      },
      {
        name: "UserPopular",
        path: 'popular',
        component: () => import('@/views/UserProfile/UserPopularView.vue'),
        props:true,
      },
      {
        name: "UserSongs",
        path: 'songs',
        component: () => import('@/views/UserProfile/UserSongsView.vue'),
        props:true
      },
      {
        name: "UserPlaylists",
        path: 'playlists',
        component: () => import('@/views/UserProfile/UserPlaylistsView.vue'),
        props:true
      },
      {
        name: "UserLikes",
        path: 'likes',
        component:() => import('@/views/UserProfile/UserLikesView.vue'),
        props:true
      },
    ],
  },
  {
    name: "UserFollowers",
    path: '/id/:login/followers',
    component: () => import('@/views/UserFollows/UserFollowersView.vue'),
    props:true
  },
  {
    name: "UserFollowing",
    path: '/id/:login/following',
    component: () => import('@/views/UserFollows/UserFollowingView.vue'),
    props:true
  },
  {
    name: 'Song',
    path: '/song/:id',
    component: () => import('@/views/SongView.vue'),
    props:true
  },
  {
    name: "SongLikes",
    path: '/song/:id/likes',
    component: () => import('@/views/Song/SongLikesView.vue'),
    props:true

  },
  {
    name: "SongPlaylists",
    path: '/song/:id/playlists',
    component: () => import('@/views/Song/SongPlaylistsView.vue'),
    props:true
  },
  {
    name: "SongRelated",
    path: '/song/:id/related',
    component: () => import('@/views/Song/SongRelatedView.vue'),
    props:true
  },
  {
    name: "Upload",
    path: '/upload',
    component: () => import('@/views/UploadView.vue'),
    meta: { authRequired:true }
  },
  {
    name: "Settings",
    path: '/settings',
    component: () => import('@/views/SettingsView.vue'),
    redirect: {name:'SettingsAccount'},
    meta: { authRequired:true },
    children:
    [
      {
        name: "SettingsAccount",
        path: '',
        component: () => import('@/views/Settings/SettingsAccountView.vue'),
      },
      {
        name: "SettingsTheme",
        path: 'theme',
        component: () => import('@/views/Settings/SettingsThemeView.vue'),
      }
    ]
  },
  {
    name: "Notifications",
    path: '/notifications',
    component: () => import('@/views/NotificationsView.vue'),
    meta: { authRequired:true }
  },
  {
    name: "Messages",
    path: '/messages',
    component: () => import('@/views/MessagesView.vue'),
    meta: { authRequired:true }
  },
  {
    name: "PageNotFound",
    path: "/:catchAll(.*)",
    component: () => import('@/views/PageNotFoundView.vue')
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
      if (from.meta?.authRequired) { to.name = from.name; from.name = "Root"; }
      const redirectLogIn = {name: from.name,query:{action:'login',to:to.name}};
      return next(redirectLogIn);
    }
    return next();
  }
  return next();
});

export default router
