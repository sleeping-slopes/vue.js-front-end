<template>
<div class="content column" style="padding-top:0px; overflow:visible">
  <div class="sticky-top">
    <div class="column">
      <div class="row">
        <router-link :to="{ name: 'User', params: { login: this.login }}">
          <img class = "user-image s100x100" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
          <div class = "user-image s100x100 gradient-bg" v-else/>
        </router-link>
        <router-link class="primary-text hoverable h2" :to="{ name: 'User', params: { login: this.login }}">{{this.user.username || this.login}} is following</router-link>
      </div>
      <nav class="navtab">
        <div class="nav-menu">
          <router-link class="tablink h3" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
          <router-link class="tablink h3" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
        </div>
      </nav>
    </div>
  </div>
  <ul class="ul-grid" v-if="this.followings.length>0">
    <li v-for="following in this.followings"><userCard :login="following.login"></userCard></li>
  </ul>
  <errorMessage  v-else>
    <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
    <template v-slot:message>{{ this.user.username || this.login }} isn’t following anyone</template>
  </errorMessage>
</div>
</template>

<script>

  import API from "@/axios/API";

  import panel from "@/components/containers/panel.vue"
  import userCard from "@/components/userCard.vue"
  import errorMessage from "@/components/containers/errorMessage.vue";

    export default {
      name: 'UserFollowingView',
      components:{panel,userCard,errorMessage},
      props:
      {
        login: { default: "nologin" },
      },
      data()
      {
        return {
          user:{},
          followings:[],
          picturesrc: API.defaults.baseURL+`users/`+this.login+`/picture`,
          imageAvailable:true
        }
      },
      async created()
      {
        this.user = await API.get('users/'+this.login+'/username');
        if (this.user.error) this.$router.push({name:"User",params:{login:this.login}});
        this.followings = await API.get('users/'+this.login+'/following');
      }
    }
    </script>
