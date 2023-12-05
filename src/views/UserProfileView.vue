<template>
  <div class="songs-empty" v-if="this.user.error">
    <i class="bi bi-emoji-frown"></i>
    404
  </div>
  <div class="scr" v-else>
    <div class="user-banner">
      <img class = "user-image" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
        <div class="user-banner-info">
          <span class="user-banner-name" v-if="this.user.username || this.user.login">
            {{ this.user.username?this.user.username:this.user.login }}
            <i class="bi bi-patch-check-fill" v-if="this.user.verified"></i>
          </span>
          <span class="user-banner-status" v-if="this.user.status">
            {{ this.user.status }}
          </span>
          <span class="user-banner-status" v-if="this.user.city || this.user.country">
            {{ [this.user.city,this.user.country].filter((el)=>{return el}).join(", ") }}
          </span>
      </div>
    </div>
    <div class="main">
      <div class="column">
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink" :to="{ name: 'UserActivity', params: { login: this.login }}">All</router-link>
            <router-link class="tablink" :to="{ name: 'UserPopular', params: { login: this.login }}">Popular</router-link>
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
                    <span class="stat-value">{{abbreviate_number(this.user.followers_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserFollowing', params: { login: this.login }}">
                    <span class="stat-name">Following</span>
                    <span class="stat-value">{{abbreviate_number(this.user.following_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserSongs', params: { login: this.login }}">
                    <span class="stat-name">Songs</span>
                    <span class="stat-value">{{abbreviate_number(this.user.songs_count,0)}}</span>
                  </router-link>
                </div>
                <div class="user-bio">
                  {{ this.user.bio }}
                </div>
                <ul class="user-link-list">
                  <li v-for="(link) in this.user.links">
                    <glyphLink
                      :url=link.url
                      :description=link.description
                    />
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

import { getUserProfile,getUserLinks, getUserLikedSongs } from "@/axios/getters";
import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"
import glyphLink from "@/components/glyphLink.vue"

  export default {
    name: 'UserProfileView',
    components:{panel,playlist,glyphLink},
    props:
    {
      login: { default: "nologin" },
    },
    data()
    {
      return {
        user:{},
        userLikedSongs:
        {
          id:"[]"+this.login+' liked',
          songs:[]
        },
      }
    },
    async created()
    {
      this.user = await getUserProfile(this.login);
      this.user.links = await getUserLinks(this.login);
      this.userLikedSongs.songs = await getUserLikedSongs(this.login);
    },
    methods:
    {
      abbreviate_number(num, fixed)
      {
        if (!num || num === 0) { return '0'; } // terminate early
        fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
      }
    }
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
    gap:20px;
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

  .user-bio
  {
    font-size:16px;
    color: var(--text-color-primary);
  }

  .user-link-list
  {
    list-style: none;
    padding:0px;
    margin:0px;
  }

  </style>

