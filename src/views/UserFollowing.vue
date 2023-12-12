<template>
<div class="main" style="padding:0px">
	<div class="fixed-top">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class = "user-image s100x100" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"  v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s100x100 gradient-bg" v-else/>
    </router-link>
		<router-link class="primary-text-hoverable h2" :to="{ name: 'User', params: { login: this.login }}">{{this.user.username || this.login}} is following</router-link>
	</div>
	<div class="column" style="gap:0px">
		<nav class="navtab">
			<div class="nav-menu">
				<router-link class="tablink h3" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
				<router-link class="tablink h3" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
			</div>
		</nav>
		<div class="scr">
			<ul class="user-list">
				<li v-for="following in this.followings"><userCard :login="following.login"></userCard></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>

  import { getUserUsername } from "@/axios/getters";
  import { getUserFollowing } from "@/axios/getters";

  import panel from "@/components/panel.vue"
  import userCard from "@/components/userCard.vue"

    export default {
      name: 'UserFollowersView',
      components:{panel,userCard},
      props:
      {
        login: { default: "nologin" },
      },
      data()
      {
        return {
          user:{},
          followings:[],
          imageAvailable:true
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
        this.followings = await getUserFollowing(this.login);
      }
    }
    </script>

    <style>

    </style>

