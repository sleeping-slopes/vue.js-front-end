<template>
  <div class="songs-empty" v-if="this.user.error">
    <i class="bi bi-emoji-frown"></i>
    404
  </div>
  <div class="scr" v-else>
    <div class="user-banner">
      <img class = "user-image s200x200" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
        <div class="user-banner-info">
          <span class="user-banner-name" v-if="this.user.username || this.user.login">
            {{ this.user.username || this.user.login }}
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
                    <span class="stat-value">{{abbreviateNumber(this.user.followers_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserFollowing', params: { login: this.login }}">
                    <span class="stat-name">Following</span>
                    <span class="stat-value">{{abbreviateNumber(this.user.following_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserSongs', params: { login: this.login }}">
                    <span class="stat-name">Songs</span>
                    <span class="stat-value">{{abbreviateNumber(this.user.songs_count,0)}}</span>
                  </router-link>
                </div>
                <div class="primary-text">
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
import { abbreviateNumber } from "@/functions.js"

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
      abbreviateNumber: abbreviateNumber
    }
  }
  </script>

  <style>

  </style>

