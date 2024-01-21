<template>
<div class="content column" style="padding-top:0px;">
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
    <userContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'userCard'" :users="followers"></userContainer>
</div>
</template>

<script>

import API from "@/axios/API";
import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'UserFollowersView',
  components: { userContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      user: {},
      followers: undefined,
      picturesrc: API.defaults.baseURL+`users/`+this.login+`/picture`,
      imageAvailable:true
    }
  },
  async created()
  {
    this.user = await API.get('users/'+this.login+'/username');
    if (this.user.error) this.$router.push({name:"User",params:{login:this.login}});
    this.followers = await API.get('users/'+this.login+'/followers');
  }
}

</script>
