<template>
  <div class = "user-card">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
    <img class = "user-image s180x180" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"  v-if="imageAvailable" @error="imageAvailable=false"/>
    <div class = "user-image s180x180 gradient-bg" v-else/>
  </router-link>
    <div class= "user-info">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class ="h3 primary-text-hoverable">{{this.user.username || this.login}}</router-link>
      <span class ="h5 icon-text secondary-text" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </span>
    </div>
  </div>
</template>

<script>

import { getUserShortProfile } from "@/axios/getters.js"

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
  async mounted()
  {
    this.user = await getUserShortProfile(this.login);
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber
  }
}
</script>

<style>

.user-card
{
    display:flex;
    flex-direction: column;
    gap:10px;
    width:180px;
    height:250px;
}

.user-info
{
    display:flex;
    flex-direction: column;
    align-items: center;
}

</style>