<template>
  <errorMessage v-if="this.user.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.user.error.status }}</template>
    <template v-slot:message>{{ this.user.error.message }}</template>
  </errorMessage>
  <template v-else>
    <div class="banner" style="position:relative">
      <img class="banner-bg" v-if="backgroundImageAvailable" @error="backgroundImageAvailable=false" :src="bannersrc"/>
      <div class = "banner-bg gradient-bg-reverse" v-else></div>
      <img class = "user-image s200x200" v-if="imageAvailable" @error="imageAvailable=false" :src="picturesrc"/>
      <div class = "user-image s200x200 gradient-bg" v-else></div>
      <div class="info-wrapper column gap-10">
        <h2 class="banner-info banner-info-primary" v-if="this.user.username || this.user.login">{{ this.user.username || this.user.login }}</h2>
        <h3 class="banner-info banner-info-secondary" v-if="this.user.status">{{ this.user.status }}</h3>
        <h3 class="banner-info banner-info-secondary" v-if="this.user.city || this.user.country">{{ [this.user.city,this.user.country].filter((el)=>{return el}).join(", ") }}</h3>
      </div>
    </div>
    <div class="content column">
        <nav class="navtab">
          <ul class="h3">
            <li><router-link :to="{ name: 'UserActivity', params: { login: this.login }}">All</router-link></li>
            <li><router-link :to="{ name: 'UserPopular', params: { login: this.login }}">Popular</router-link></li>
            <li><router-link :to="{ name: 'UserSongs', params: { login: this.login }}">Songs</router-link></li>
            <li><router-link :to="{ name: 'UserPlaylists', params: { login: this.login }}">Playlists</router-link></li>
            <li><router-link :to="{ name: 'UserLikes', params: { login: this.login }}">Likes</router-link></li>
          </ul>
          <div class="row right">
            <button class="button button-secondary h6" v-if="this.user.me">Edit</button>
            <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
              <span class="bi bi-person-plus"></span><span>Follow</span>
            </button>
            <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
              <span class="bi bi-person-plus"></span><span>Follow back</span>
            </button>
            <button class="button button-secondary toggled h6 icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
              <span class="bi bi bi-person-check-fill"></span><span>Following</span>
            </button>
            <button class="button button-primary h6" v-if="!this.user.me">Message</button>
          </div>
        </nav>
        <div class="row">
          <div class="column" style="width:810px;">
            <router-view></router-view>
          </div>
          <div class="column" style="width:360px;">
            <panel>
              <template v-slot:content>
                <div class="row gap-5">
                  <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class="user-stat">
                    <span class="h4">Followers</span>
                    <span class="h3">{{abbreviateNumber(this.user.followers_count,0)}}</span>
                  </router-link>
                  <router-link :to="{ name: 'UserFollowing', params: { login: this.login }}" class="user-stat">
                    <span class="h4">Following</span>
                    <span class="h3">{{abbreviateNumber(this.user.following_count,0)}}</span>
                  </router-link>
                  <router-link :to="{ name: 'UserSongs', params: { login: this.login }}" class="user-stat">
                    <span class="h4">Songs</span>
                    <span class="h3">{{abbreviateNumber(this.user.songs_count,0)}}</span>
                  </router-link>
                </div>
                <p class="primary-text h5" v-if="this.user.bio">
                  {{ this.user.bio }}
                </p>
                <ul class="h5 column gap-5" v-if="this.userLinks.length>0">
                  <li v-for="(link) in this.userLinks">
                    <glyphLink :url="link.url" :description="link.description"/>
                  </li>
                </ul>
              </template>
            </panel>
            <panel v-if="this.userLikedSongs?.songs?.length">
              <template v-slot:header>
                <span class="icon-text">
                  <span class="bi bi-suit-heart-fill"></span><span>{{ abbreviateNumber(this.userLikedSongs?.songs.length) }} like{{this.userLikedSongs?.songs.length==1?'':'s'}}</span>
                </span>
              </template>
              <template v-slot:menu>
                <router-link :to="{ name: 'UserLikes', params: { login: this.login }}" class="button button-secondary h6">View all</router-link>
              </template>
              <template v-slot:content>
                <songContainer :type="'ul-list hidden-scroll'" :playlist="this.userLikedSongs" :maxDisplay="3"/>
              </template>
            </panel>
            <panel v-if="this.followers?.length">
              <template v-slot:header>
                <span class="icon-text">
                  <span class="bi bi-person-fill"></span><span>{{ abbreviateNumber(this.followers?.length) }} follower{{this.followers?.length==1?'':'s'}}</span>
                </span>
              </template>
              <template v-slot:menu>
                <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class="button button-secondary h5">View all</router-link>
              </template>
              <template v-slot:content>
                <userList :users="this.followers" :maxDisplay="13"></userList>
              </template>
            </panel>
          </div>
        </div>
    </div>
  </template>
</template>

<script>

import API from "@/axios/API";

import userCard from "@/components/userCard.vue"
import userList from "@/components/userList.vue"
import panel from "@/components/containers/panel.vue"
import songContainer from "@/components/songContainer.vue"
import glyphLink from "@/components/glyphLink.vue"
import errorMessage from "@/components/containers/errorMessage.vue"

export default
{
  name: 'UserProfileView',
  extends: userCard,
  components: { panel, songContainer, glyphLink, errorMessage, userList },
  data()
  {
    return {
      userLikedSongs: undefined,
      userLinks: [],
      followers: undefined,
      bannersrc: API.defaults.baseURL+`users/`+this.login+`/banner`,
      backgroundImageAvailable: true
    }
  },
  async created()
  {
    this.followers = await API.get('users/'+this.login+'/followers');
    this.userLinks = await API.get('users/'+this.login+'/links');
    this.userLikedSongs = await API.get('users/'+this.login+'/songs/liked');
  },
}

</script>

<style scoped>
.user-stat
{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content:center;
  color: var(--text-color-secondary);
  cursor:pointer;
}

.user-stat:hover
{
  color: var(--text-color-primary);
}

  </style>

