<template>
  <div class="sticky-top">
    <div class="column">
      <div class="row">
        <router-link :to="{ name: 'User', params: { login: this.login }}">
          <img class="user-image s100x100" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
          <div class="user-image s100x100 gradient-bg" v-else></div>
        </router-link>
        <div class="info-wrapper" v-if="this.user">
          <h1>
            <router-link v-if="this.user" :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable font-size-large">
              <slot name="caption"></slot> {{this.user.username}}
            </router-link>
          </h1>
        </div>
      </div>
      <nav class="nav-tab">
        <ul>
          <li><router-link :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link></li>
          <li><router-link :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link></li>
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
  data()
  {
    return {
      login: this.$route.params.login,
      user: undefined,
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