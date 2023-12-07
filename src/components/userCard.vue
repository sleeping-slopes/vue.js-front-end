<template>
  <div class = "user-card">
    <img class = "user-image s180x180" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
    <div class= "user-info">
      <span class ="user-info-name primary-text-hoverable">{{this.user.username?this.user.username:this.login}}</span>
      <span class ="user-info-followers secondary-text" v-if="this.user.followers_count>0"><i class="bi bi-people-fill"></i>{{this.user.followers_count}} follower{{ this.user.followers_count>1?'s':'' }}</span>
    </div>
  </div>
</template>

<script>

import { getUserProfile } from "@/axios/getters.js"
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
        user:{}
    }
  },
  async mounted()
  {
    this.user = await getUserProfile(this.login);
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
    padding-top:20px;
}

.user-card .user-image, .user-card .user-info-name
{
  cursor:pointer;
}

.user-info
{
    display:flex;
    flex-direction: column;
    align-items: center;
}

.user-info-name
{
    font-size:20px;
}

.user-info-followers
{
    font-size:14px;
    display:flex;
    gap:3px;
}

</style>