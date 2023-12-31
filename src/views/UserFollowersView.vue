<template>
<div class="content" style="padding-top:0px;">
  <div class="column" style="overflow:visible">
    <div class="sticky-top">
      <div class="column">
        <div class="row">
          <router-link :to="{ name: 'User', params: { login: this.login }}">
            <img class = "user-image s100x100" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
            <div class = "user-image s100x100 gradient-bg" v-else/>
          </router-link>
          <router-link class="primary-text hoverable h2" :to="{ name: 'User', params: { login: this.login }}">Followers of {{this.user.username || this.login}}</router-link>
        </div>
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink h3" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
            <router-link class="tablink h3" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
          </div>
        </nav>
      </div>
    </div>
    <ul class="ul-grid" v-if="this.followers.length>0">
      <li v-for="follower in this.followers"><userCard :login="follower.login"></userCard></li>
    </ul>
    <errorMessage  v-else>
      <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
      <template v-slot:message>No one is following {{ this.user.username || this.login }} yet</template>
    </errorMessage>
  </div>
</div>
</template>

<script>

  import API from "@/axios/API";

  import panel from "@/components/containers/panel.vue"
  import userCard from "@/components/userCard.vue"
  import errorMessage from "@/components/containers/errorMessage.vue";

    export default {
      name: 'UserFollowersView',
      components:{panel,userCard,errorMessage},
      props:
      {
        login: { default: "nologin" },
      },
      data()
      {
        return {
          user:{},
		      followers:[],
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
