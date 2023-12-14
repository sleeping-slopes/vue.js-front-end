<template>
    <errorMessage v-if="this.user.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.user.error.status }}</template>
    <template v-slot:message>{{ this.user.error.message }}</template>
  </errorMessage>
  <div class="scr" v-else>
    <div class="user-banner-wrapper">
      <img class="user-banner-background" v-if="backgroundImageAvailable" @error="backgroundImageAvailable=false" :src="`http://localhost:5000/api/user/`+this.login+`/banner`"/>
      <div class = "user-banner-background gradient-bg-reverse" v-else/>
      <div class="user-banner">
        <img class = "user-image s200x200" v-if="imageAvailable" @error="imageAvailable=false" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
        <div class = "user-image s200x200 gradient-bg" v-else/>
        <div class="user-banner-info">
          <h2 class="user-banner-name" v-if="this.user.username || this.user.login">
            {{ this.user.username || this.user.login }}
            <span class="bi bi-patch-check-fill" v-if="this.user.verified"></span>
          </h2>
          <h3 class="user-banner-status" v-if="this.user.status">
            {{ this.user.status }}
          </h3>
          <h3 class="user-banner-status" v-if="this.user.city || this.user.country">
            {{ [this.user.city,this.user.country].filter((el)=>{return el}).join(", ") }}
          </h3>
      </div>
    </div>
    </div>
    <div class="main">
      <div class="column">
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink h3" :to="{ name: 'UserActivity', params: { login: this.login }}">All</router-link>
            <router-link class="tablink h3" :to="{ name: 'UserPopular', params: { login: this.login }}">Popular</router-link>
            <router-link class="tablink h3" :to="{ name: 'UserSongs', params: { login: this.login }}">Songs</router-link>
            <router-link class="tablink h3" :to="{ name: 'UserPlaylists', params: { login: this.login }}">Playlists</router-link>
            <router-link class="tablink h3" :to="{ name: 'UserLikes', params: { login: this.login }}">Likes</router-link>
          </div>
          <div class="nav-menu" style="margin-left:auto">

            <button class="button-primary h5" v-if="this.user.owner">Edit</button>
            <button class="button-primary h5" v-if="!this.user.owner">Follow</button>
            <button class="button-primary h5" v-if="!this.user.owner">Message</button>
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
                    <span class="h4">Followers</span>
                    <span class="h3">{{abbreviateNumber(this.user.followers_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserFollowing', params: { login: this.login }}">
                    <span class="h4">Following</span>
                    <span class="h3">{{abbreviateNumber(this.user.following_count,0)}}</span>
                  </router-link>
                  <router-link class="user-stat" :to="{ name: 'UserSongs', params: { login: this.login }}">
                    <span class="h4">Songs</span>
                    <span class="h3">{{abbreviateNumber(this.user.songs_count,0)}}</span>
                  </router-link>
                </div>
                <span class="primary-text h5" v-if="this.user.bio">
                  {{ this.user.bio }}
                </span>
                <ul class="h5" v-if="this.user.links && this.user.links.length>0">
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
                <router-link class="button-secondary h5" :to="{ name: 'UserLikes', params: { login: this.login }}">View all</router-link>
              </template>
              <template v-slot:content>
                <playlist class="ul-list"
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
import errorMessage from "@/components/errorMessage.vue"

  export default {
    name: 'UserProfileView',
    components:{panel,playlist,glyphLink,errorMessage},
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
        imageAvailable: true,
        backgroundImageAvailable: true
      }
    },
    async created()
    {
      this.user = await getUserProfile(this.login);
      this.user.links = await getUserLinks(this.login);
      this.userLikedSongs.songs = await getUserLikedSongs(this.login);

      document.title=this.user.username || this.user.login;
    },
    methods:
    {
      abbreviateNumber: abbreviateNumber
    }
  }
  </script>

  <style>

.user-banner-wrapper
{
  width:1240px;
  height:260px;
  flex-shrink:0;
  position:relative;
  overflow:hidden;
  margin-left:auto;
  margin-right:auto;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
}

.user-banner-background
{
  position:absolute;
  width:100%;
  height:100%;
}

.user-banner
{
  position:absolute;
  display:flex;
  gap:20px;
  padding:30px;
  box-sizing:border-box;
}

.user-banner-info
{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.user-banner-info h2, .user-banner-info h3
{
  background-color:rgb(0,0,0,0.8);
  padding:5px;
  width:fit-content;
}

.user-banner-name
{
  color:var(--soft-white);
}

.user-banner-status
{
  color:var(--light-gray);
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
}

.user-stat:hover
{
  color: var(--text-color-primary);
}

  </style>

