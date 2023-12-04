<template >
  <div class="scr" v-if="this.user" >
    <div class="user-banner">
      <img class = "user-image" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
        <div class="user-banner-info">
        <span class="user-banner-name">
          {{ this.user.username }}
        </span>
        <span class="user-banner-status">
          {{ this.user.status }}
        </span>
      </div>
    </div>
    <div class="main">
      <div class="column">
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink" :to="{ name: 'UserActivity', params: { login: this.login }}">All</router-link>
            <router-link class="tablink" :to="{ name: 'UserPopular', params: { login: this.login }}">Popular songs</router-link>
            <router-link class="tablink" :to="{ name: 'UserSongs', params: { login: this.login }}">Songs</router-link>
            <router-link class="tablink" :to="{ name: 'UserPlaylists', params: { login: this.login }}">Playlists</router-link>
            <router-link class="tablink" :to="{ name: 'UserLikes', params: { login: this.login }}">Likes</router-link>
          </div>
          <div class="nav-menu" style="margin-left:auto">
            <button class="button-primary">Follow</button>
            <button class="button-primary">Edit</button>
            <button class="button-primary">Message</button>
          </div>
        </nav>
        <div class="row">
          <div class="column" style="width:100%;">
            <router-view></router-view>
          </div>
          <div class="column" style="width:360px;flex-shrink:0;">
            <panel style="flex-shrink: 0;">
              <template v-slot:content>
                <div class="user-stats">
                  <router-link class="user-stat" :to="{ name: 'UserFollowers', params: { login: this.login }}">
                    <span class="stat-name">Followers</span>
                    <span class="stat-value">32K</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserFollowing', params: { login: this.login }}">
                    <span class="stat-name">Following</span>
                    <span class="stat-value">32K</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserSongs', params: { login: this.login }}">
                    <span class="stat-name">Songs</span>
                    <span class="stat-value">999</span>
                  </router-link>
                </div>
                <div class="user-description">
                  {{ this.user.description }}
                </div>
                <ul class="user-link-list">
                  <li>
                    <a href="#" class="user-link">
                        <i class="bi bi-telegram"></i>Telegram
                    </a>
                  </li>
                  <li>
                    <a href="#" class="user-link">
                        <i class="bi bi-telegram"></i>Telegram
                    </a>
                  </li>
                  <li>
                    <a href="#" class="user-link">
                        <i class="bi bi-telegram"></i>Telegram
                    </a>
                  </li>
                  <li>
                    <a href="#" class="user-link">
                        <i class="bi bi-telegram"></i>Telegram
                    </a>
                  </li>
                </ul>
              </template>
            </panel>
            <panel style="">
              <template v-slot:header>{{this.userLikedSongs.songs.length}} likes</template>
              <template v-slot:menu>
                <router-link class="button-secondary" :to="{ name: 'UserLikes', params: { login: this.login }}">View all</router-link>
              </template>
              <template v-slot:content>
                <playlist
                  :id="this.userLikedSongs.id"
                  :songs="this.userLikedSongs.songs"
                  :maxDisplay="3"
                />
              </template>
            </panel>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

  <script>

import { getUserByLogin,getUserLikedSongs } from "@/axios/getters";
import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"

  export default {
    name: 'UserProfileView',
    components:{panel,playlist},
    props:
    {
      login:
      {
        default: -1,
      },
    },
    data()
    {
      return {
        user: undefined,
        userLikedSongs:
        {
          id:this.login+' liked',
          songs:[]
        },
      }
    },
    watch:
    {
      "this.$route.params.login"(s)
      {
        alert(s);
      }
    },
    async created()
    {
      const r = await getUserByLogin(this.login);
      if (r.status===200) this.user=r.values;
      else this.user=undefined;

      this.userLikedSongs.songs = await getUserLikedSongs(this.login);
    },
  }
  </script>

  <style>

  .scr
  {
    overflow-y:scroll;
    width:100%;
  }
  .scr::-webkit-scrollbar
  {
    display: none;
  }

  .scr
  {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .user-banner
  {
    position:relative;
    width:1240px;
    height:260px;
    background-color:green;
    padding:30px;
    box-sizing:border-box;
    flex-shrink:0;
    display:flex;
    background-image: url(https://i1.sndcdn.com/visuals-000754706119-8swAvk-t1240x260.jpg);
    gap:20px;
    margin-left:auto;
    margin-right:auto;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  }

  .user-image
  {
    width:200px;
    height:200px;
    background-color:red;
    border-radius:50%;
    border:3px solid black;
    box-sizing: border-box;
    flex-shrink:0;
  }

  .user-banner-info
  {
    display:flex;
    flex-direction:column;
    gap:10px;
  }

  .user-banner-info span
  {
    background-color:rgb(0,0,0,0.8);
    padding:5px;
    width:fit-content;
  }

  .user-banner-name
  {
    font-size:26px;
    color:var(--soft-white);

  }

  .user-banner-status
  {
    font-size:20px;
    color:var(--light-gray);
  }

  .nav-menu
  {
    display:flex;
    gap:10px;
  }

  nav
  {
    display:flex;
    height:min-content;
    gap:10px;
    width:100%;
  }

  .navtab
  {
    border-bottom:1px solid var(--panel-border-color);
  }

  .tablink
  {
    display:flex;
    align-items: center;
    height:100%;
    color: var(--text-color-primary);
    cursor:pointer;
    text-decoration: none;
    white-space: nowrap;
    padding:0px 5px 0px 5px;
    font-size:18px;
  }

  .tablink:hover
  {
    border-bottom:2px solid var(--text-color-primary);
  }

  .tablink.router-link-exact-active
  {
    border-bottom:2px solid var(--accent-color);
    color: var(--accent-color);
  }

  .user-stats
  {
    display:flex;
    gap:5px;
  }


  .user-stat
  {
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    color: var(--text-color-secondary);
    cursor:pointer;
    text-decoration: none;
    /* height: 40px; */
  }

  .user-stat:hover
  {
    color: var(--text-color-primary);
    /* height: 40px; */
  }

  .stat-name
  {
    font-size:16px;
  }

  .stat-value
  {
    font-size:22px;
  }

  .user-description
  {
    font-size:16px;
    color: var(--text-color-primary);
  }



  .user-link-list
  {
    list-style: none;
    padding:0px;
    margin:0px;
    color:var(--text-color-secondary);

  }

  .user-link
  {
    all: unset;
    display:flex;
    width:min-content;
    white-space: nowrap;
    gap:3px;
    font-size:16px;
    cursor:pointer;
  }

  .user-link:hover
  {
    color:var(--text-color-primary);
  }

  </style>

