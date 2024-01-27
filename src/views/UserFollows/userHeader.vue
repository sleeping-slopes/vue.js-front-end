<template>
  <div class="sticky-top">
    <div class="column">
      <div class="row">
        <router-link :to="{ name: 'User', params: { login: this.login }}">
          <img class = "user-image s100x100" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
          <div class = "user-image s100x100 gradient-bg" v-else></div>
        </router-link>
        <router-link :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable h2">Followers of {{this.user.username}}</router-link>
      </div>
      <nav class="navtab">
        <ul class="h3">
          <li><router-link :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link></li>
          <li><router-link :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>

import API from "@/axios/API";

export default
{
  name: 'userHeader',
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      user: {},
      picturesrc: API.defaults.baseURL+`users/`+this.login+`/picture`,
      imageAvailable:true
    }
  },
  async created()
  {
    this.user = await API.get('users/'+this.login+'/username');
    if (this.user.error) this.$router.push({name:"User",params:{login:this.login}});
  }
}

</script>