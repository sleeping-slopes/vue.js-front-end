<template>
<div class="main" style="padding:0px">
	<div class="fixed-top">
		<img class = "user-image s100x100" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
		<span class="primary-text-hoverable">Followers of {{this.user.username?this.user.username:this.login}}</span>
	</div>
	<div class="column" style="gap:0px">
		<nav class="navtab">
			<div class="nav-menu">
				<router-link class="tablink" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
				<router-link class="tablink" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
			</div>
		</nav>
		<div class="scr">
			<ul class="user-list">
				<li v-for="follower in this.followers"><userCard :login="follower.login"></userCard></li>
				<!-- <li><userCard :login="'user'"></userCard></li> -->
			</ul>
		</div>
	</div>
</div>
</template>

<script>

  import { getUserUsername } from "@/axios/getters";
  import { getUserFollowers } from "@/axios/getters";

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
		  followers:[]
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
		this.followers = await getUserFollowers(this.login);
		console.log(this.followers);
      }
    }
    </script>

    <style>

    </style>

