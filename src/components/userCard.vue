<template>
  <div class = "card user-card">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class = "user-image s180x180" :src="`http://192.168.100.7:5000/api/users/`+this.login+`/picture`"  v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s180x180 gradient-bg" v-else/>
    </router-link>
    <div class= "user-info">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class ="h3 primary-text hoverable icon-text">
        <span>{{this.user.username || this.login}}</span>
        <span class="bi bi-patch-check-fill" v-if="this.user.verified"></span>
      </router-link>
      <span class ="h5 icon-text secondary-text" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </span>
    </div>
    <button class="button-secondary h6 icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow</span>
    </button>
    <button class="button-secondary h6 icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow back</span>
    </button>
    <button class="button-secondary toggled h6 icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
      <span class="bi bi bi-person-check-fill"></span><span>Following</span>
    </button>

  </div>
</template>

<script>

import { getUser } from "@/axios/getters.js"
import { postFollowUser } from "@/axios/getters.js";
import { deleteFollowUser } from "@/axios/getters.js";

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
      imageAvailable: true
    }
  },
  async created()
  {
    this.user = await getUser(this.login);
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber,
    async follow()
    {
      const response = await postFollowUser(this.login);
      if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
      else
      {
        this.user.followers_count++;
        this.user.youFollow=true;
      }
    },
    async unfollow()
    {
      const response = await deleteFollowUser(this.login);
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

<style>

.user-info
{
    display:flex;
    flex-direction: column;
    align-items: center;
}

.user-card .button-secondary
{
  height:min-content;
}

.user-card:not(:hover) .button-secondary
{
  visibility: hidden;
}

.name
{
  max-width:100%;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>