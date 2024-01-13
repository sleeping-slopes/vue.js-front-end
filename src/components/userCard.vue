<template>
  <div class = "card user-card">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class = "user-image s180x180" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s180x180 gradient-bg" v-else></div>
    </router-link>
    <div class= "info-wrapper column gap-0">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class ="h3 primary-text hoverable">
        {{this.user.username || this.login}}
      </router-link>
      <span class ="h5 icon-text secondary-text" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </span>
    </div>
    <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow</span>
    </button>
    <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow back</span>
    </button>
    <button class="button button-secondary toggled h6 icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
      <span class="bi bi bi-person-check-fill"></span><span>Following</span>
    </button>
  </div>
</template>

<script>

import API from "@/axios/API";
import { abbreviateNumber } from "@/functions.js";

export default
{
  name: 'userCard',
  props:
  {
    login: { default:"nologin"},
  },
  data()
  {
    return {
      user:{},
      picturesrc: API.defaults.baseURL+`users/`+this.login+`/picture`,
      imageAvailable: true
    }
  },
  async created()
  {
    this.user = await API.get('users/'+this.login+"/profile");
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber,
    async follow()
    {
      const response = await API.post('users/'+this.login+"/action/follow/post");
      if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
      else
      {
        this.user.followers_count++;
        this.user.youFollow=true;
      }
    },
    async unfollow()
    {
      const response = await API.post('users/'+this.login+"/action/follow/delete");
      if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
      else
      {
        this.user.followers_count--;
        this.user.youFollow=false;
      }
    }
  }
}
</script>

<style scoped>

.user-card:not(:hover) .button-secondary
{
  visibility: hidden;
}

.user-card .info-wrapper
{
  align-items: center;
}

</style>