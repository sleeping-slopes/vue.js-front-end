<template>
    <div class = "user-card">
            <img class = "user-image" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
        <div class= "user-info">
            <span class ="user-info-name">{{this.user.username}}</span>
            <span class ="user-info-followers" v-if="this.user.followers_count>0">{{this.user.followers_count}} follower{{ this.user.followers_count>1?'s':'' }}</span>
        </div>
    </div>

</template>

<script>

import { getUserProfile } from "@/axios/getters.js"

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
  }
}
</script>

<style>

.user-card
{
    display:flex;
    flex-direction: column;
    gap:10px;
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
    color:var(--text-color-primary);
}

.user-info-followers
{
    font-size:14px;
    color:var(--text-color-secondary);
}

</style>