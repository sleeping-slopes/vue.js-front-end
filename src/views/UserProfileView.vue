<template>
<template v-if="this.loaded">
  <errorMessage v-if="this.user.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.user.error.status }}</template>
    <template v-slot:message>{{ this.user.error.message }}</template>
  </errorMessage>
  <template v-else>
    <editProfileModal v-if="this.$route.query.action=='edit' && this.user.me" :user="this.user"/>
    <div class="banner">
      <img class="banner-bg" :src="bannersrc" v-if="this.user.banner"/>
      <div class="banner-bg gradient-bg-reverse" v-else></div>
      <div style="height:min-content;position:relative;">
        <img class="user-image s200x200" :src="picturesrc" v-if="this.user.profile_picture"/>
        <div class="user-image s200x200 gradient-bg" v-else></div>
        <contextMenu class="x-center-absolute" style="top:calc(100% - 50px); min-width:120px;" v-if="this.user.me">
          <template v-slot:header>
            <button type = "button" class="button">
              <span class="icon-text">
                <span class="bi bi-camera-fill"></span><span>Update image</span>
              </span>
            </button>
          </template>
          <template v-slot:options>
            <li>
              <button type = "button" class="button" v-on:click="this.$refs.profilePictureInput.click()">Replace image</button>
              <input type="file" ref="profilePictureInput" style="display:none" v-on:change="uploadProfilePicture" accept="image/*" />
            </li>
            <li>
              <button type = "button" class="button" v-on:click="deleteProfilePicture">Delete image</button>
            </li>
          </template>
        </contextMenu>
      </div>
      <div class="info-wrapper gap-10">
        <span class="banner-info banner-info-primary font-size-large" v-if="this.user.username">{{ this.user.username }}</span>
        <span class="banner-info banner-info-secondary font-size-big" v-if="this.user.status">{{ this.user.status }}</span>
        <span class="banner-info banner-info-secondary font-size-big" v-if="this.user.city || this.user.country">{{ [this.user.city,this.user.country].filter((el)=>{return el}).join(", ") }}</span>
      </div>
      <div class="banner-edit-area" v-if="this.user.me">
        <contextMenu>
          <template v-slot:header>
            <button type = "button" class="button">
              <span class="icon-text">
                <span class="bi bi-camera-fill"></span><span>Update image</span>
              </span>
            </button>
          </template>
          <template v-slot:options>
            <li>
              <button type = "button" class="button" v-on:click="this.$refs.bannerInput.click()">Replace image</button>
              <input type="file" ref="bannerInput" style="display:none" v-on:change="uploadBanner" accept="image/*" />
            </li>
            <li>
              <button type = "button" class="button" v-on:click="deleteBanner">Delete image</button>
            </li>
          </template>
        </contextMenu>
      </div>
    </div>
    <div class="content column">
        <nav class="nav-tab">
          <ul>
            <li><router-link :to="{ name: 'UserActivity', params: { login: this.login }}">All</router-link></li>
            <li><router-link :to="{ name: 'UserPopular', params: { login: this.login }}">Popular</router-link></li>
            <li><router-link :to="{ name: 'UserSongs', params: { login: this.login }}">Songs</router-link></li>
            <li><router-link :to="{ name: 'UserPlaylists', params: { login: this.login }}">Playlists</router-link></li>
            <li><router-link :to="{ name: 'UserLikes', params: { login: this.login }}">Likes</router-link></li>
          </ul>
          <div class="row right">
            <button class="button button-secondary icon-text" v-if="this.user.me" v-on:click="$router.push({path: $route.fullPath,query:{action:'edit'}})">
              <span class="bi bi-pencil-fill"></span><span>Edit</span>
            </button>
            <button class="button button-secondary icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
              <span class="bi bi-person-plus"></span><span>Follow</span>
            </button>
            <button class="button button-secondary icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
              <span class="bi bi-person-plus"></span><span>Follow back</span>
            </button>
            <button class="button button-secondary toggled icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
              <span class="bi bi bi-person-check-fill"></span><span>Following</span>
            </button>
            <button class="button button-primary" v-if="!this.user.me">Message</button>
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
                    <span class="font-size-medium">Followers</span>
                    <span class="font-size-big">{{abbreviateNumber(this.user.followers_count,0)}}</span>
                  </router-link>
                  <router-link :to="{ name: 'UserFollowing', params: { login: this.login }}" class="user-stat">
                    <span class="font-size-medium">Following</span>
                    <span class="font-size-big">{{abbreviateNumber(this.user.following_count,0)}}</span>
                  </router-link>
                  <router-link :to="{ name: 'UserSongs', params: { login: this.login }}" class="user-stat">
                    <span class="font-size-medium">Songs</span>
                    <span class="font-size-big">{{abbreviateNumber(this.user.songs_count,0)}}</span>
                  </router-link>
                </div>
                <span class="primary-text font-size-small" v-if="this.user.bio">
                  {{ this.user.bio }}
                </span>
                <ul class="column gap-5" v-if="this.user.links.length>0">
                  <li v-for="(link) in this.user.links">
                    <glyphLink class="font-size-small" :url="link.url" :description="link.description"/>
                  </li>
                </ul>
              </template>
            </panel>
            <panel v-if="this.userSongLikes?.songs?.length">
              <template v-slot:header>
                <span class="icon-text">
                  <span class="bi bi-suit-heart-fill"></span><span>{{ abbreviateNumber(this.userSongLikes?.songs.length) }} like{{this.userSongLikes?.songs.length==1?'':'s'}}</span>
                </span>
              </template>
              <template v-slot:menu>
                <router-link :to="{ name: 'UserLikes', params: { login: this.login }}" class="button button-secondary">View all</router-link>
              </template>
              <template v-slot:content>
                <songContainer :type="'ul-list'" :playlist="this.userSongLikes" :maxDisplay="3"/>
              </template>
            </panel>
            <panel v-if="this.followers?.length">
              <template v-slot:header>
                <span class="icon-text">
                  <span class="bi bi-person-fill"></span><span>{{ abbreviateNumber(this.followers?.length) }} follower{{this.followers?.length==1?'':'s'}}</span>
                </span>
              </template>
              <template v-slot:menu>
                <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class="button button-secondary">View all</router-link>
              </template>
              <template v-slot:content>
                <userContainer :type="'row gap-0'" :dynamicComponent="'userIcon'" :users="this.followers" :maxDisplay="13"></userContainer>
              </template>
            </panel>
          </div>
        </div>
    </div>
  </template>
</template>
<div class="loader-wrapper" v-else>
  <div class="loader"></div>
</div>
</template>

<script>

import API from "@/axios/API";

import userInterface from '@/components/interfaces/userInterface.vue'

import editProfileModal from "@/components/modals/editProfileModal.vue";

import panel from "@/components/containers/panel.vue"
import songContainer from "@/components/containers/songContainer.vue"
import glyphLink from "@/components/glyphLink.vue"
import errorMessage from "@/components/containers/errorMessage.vue"
import contextMenu from "@/components/containers/contextMenu.vue";

import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'UserProfileView',
  extends: userInterface,
  components: { panel, songContainer, glyphLink, errorMessage, userContainer,editProfileModal, contextMenu },
  data()
  {
    return {
      userSongLikes: undefined,
      followers: undefined
    }
  },
  async created()
  {
    this.followers = await API.get('users/'+this.login+'/followers');
    this.userSongLikes = await API.get('users/'+this.login+'/songs/likes');
  },
  methods:
  {
    async uploadProfilePicture(event)
    {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      const selectedFile = event.target.files[0];
      if (!selectedFile || !validImageTypes.includes(selectedFile.type)) return;

      const fd = new FormData();
      fd.append('userProfilePicture',selectedFile,selectedFile.name);
      const r = await API.post('me/profile-picture', fd);
    },
    async deleteProfilePicture()
    {
      const r = await API.delete('me/profile-picture');
    },

    async uploadBanner(event)
    {
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

      const selectedFile = event.target.files[0];
      if (!selectedFile || !validImageTypes.includes(selectedFile.type)) return;

      const fd = new FormData();
      fd.append('userBanner',selectedFile,selectedFile.name);
      const r = await API.post('me/banner', fd);
    },
    async deleteBanner()
    {
      const r = await API.delete('me/banner');
    },
  }
}

</script>

<style scoped>

.banner-edit-area
{
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  width:180px;
  padding:20px 20px 0px 40px;
  box-sizing:border-box;
}

.user-stat
{
  width:100%;
  display:flex;
  flex-direction: column;
  color: var(--text-color-secondary);
}

.user-stat:hover
{
  color: var(--text-color-primary);
}

  </style>

