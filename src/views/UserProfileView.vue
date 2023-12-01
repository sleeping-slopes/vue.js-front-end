<template >
  <div class="scr" v-if="this.user">
    <div class="user-banner">
      <img class = "user-image" :src="`http://localhost:5000/api/user/`+this.username+`/picture`"/>
        <div class="user-banner-info">
        <span class="user-banner-name">
          {{ this.user.username }}
        </span>
        <span class="user-banner-status">
          {{ this.user.username }}
        </span>
      </div>
    </div>
    <div class="main">
      <div class="column">
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink" :to="{ name: 'UserPopular', params: { username: this.username }}">Popular songs</router-link>
            <router-link class="tablink" :to="{ name: 'UserSongs', params: { username: this.username }}">Songs</router-link>
            <router-link class="tablink" :to="{ name: 'UserPlaylists', params: { username: this.username }}">Playlists</router-link>
          </div>
          <div class="nav-menu" style="margin-left:auto">
            <button class="button-primary">Follow</button>
            <button class="button-primary">Edit</button>
            <button class="button-primary">Message</button>
          </div>
        </nav>
        <div class="row">
          <router-view></router-view>
          <div class="column" style="width:360px;flex-shrink:0;">
            <panel style="flex-shrink: 0;">
              <template v-slot:content>
                <div class="user-stats">
                  <div>
                    <span class="stat-name">Followers</span>
                    <span class="stat-value">32K</span>
                  </div>
                  <div>
                    <span class="stat-name">Following</span>
                    <span class="stat-value">32K</span>
                  </div>
                  <div>
                    <span class="stat-name">Songs</span>
                    <span class="stat-value">999</span>
                  </div>
                </div>
                <div class="user-description">
                  {{ this.user.username }}
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
              <template v-slot:header>Likes</template>
              <template v-slot:menu>
                <button class="button-secondary">View all</button>
              </template>
              <template v-slot:content>
                <playlist
                  :id="this.$store.state.currentPlaylist.id"
                  :songs="this.$store.state.currentPlaylist.songs.slice(0,3)"
                />
              </template>
            </panel>
            <panel style="">
              <template v-slot:header>Likes</template>
              <template v-slot:menu>
                <button class="button-secondary">View all</button>
              </template>
              <template v-slot:content>
                <playlist
                  :id="this.$store.state.currentPlaylist.id"
                  :songs="this.$store.state.currentPlaylist.songs.slice(0,3)"
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

import { getUserByID } from "@/axios/getters";
import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"

  export default {
    name: 'UserProfileView',
    components:{panel,playlist},
    props:
    {
      username:
      {
        default:-1,
      },
    },
    data()
    {
      return {
        user: undefined
      }
    },
    async created()
    {
      const r = await getUserByID(this.username);
      if (r.status===200) this.user=r.values;
      else this.user=undefined;
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

  .tablink.router-link-active
  {
    border-bottom:2px solid var(--accent-color);
    color: var(--accent-color);
  }

  .user-stats
  {
    display:flex;
    gap:5px;
  }


  .user-stats > div
  {
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    color: var(--text-color-secondary);
    cursor:pointer;
    /* height: 40px; */
  }

  .user-stats > div:hover
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

