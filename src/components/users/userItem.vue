<template>
    <div class = "row">
      <router-link :to="{ name: 'User', params: { login: this.login }}">
        <img class = "user-image s160x160" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
        <div class = "user-image s160x160 gradient-bg" v-else></div>
      </router-link>
      <div class= "info-wrapper column" style="justify-content: center;">
        <router-link :to="{ name: 'User', params: { login: this.login }}" class ="h3 primary-text hoverable">
          {{this.user.username || this.login}}
        </router-link>
        <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class ="h5 icon-text secondary-text hoverable" v-if="this.user.followers_count>0">
          <span class="bi bi-people-fill"></span>
          <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
        </router-link>
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
    </div>
  </template>

<script>

import userInterface from "@/components/users/user interface.vue";

export default
{
  name: 'userItem',
  extends: userInterface
}

</script>