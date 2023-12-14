<template>
<div class="main" style="padding:0px">
	<div class="fixed-top">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class = "user-image s100x100" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"  v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s100x100 gradient-bg" v-else/>
    </router-link>
		<router-link class="primary-text-hoverable h2" :to="{ name: 'User', params: { login: this.login }}">Followers of {{this.user.username || this.login}}</router-link>
	</div>
	<div class="column" style="gap:30px">
		<nav class="navtab">
			<div class="nav-menu">
				<router-link class="tablink h3" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
				<router-link class="tablink h3" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
			</div>
		</nav>
		<div class="scr">
			<ul class="ul-grid" v-if="this.followers.length>0">
				<li v-for="follower in this.followers"><userCard :login="follower.login"></userCard></li>
			</ul>
      <errorMessage  v-else>
          <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
          <template v-slot:message>No one is following {{(this.user.username || this.user.login)}} yet</template>
        </errorMessage>
		</div>

	</div>
</div>
</template>

<script>

  import { getUserUsername } from "@/axios/getters";
  import { getUserFollowers } from "@/axios/getters";

  import panel from "@/components/panel.vue"
  import userCard from "@/components/userCard.vue"
  import errorMessage from "@/components/errorMessage.vue";

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
      imageAvailable:true
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
		    this.followers = await getUserFollowers(this.login);
        document.title=(this.user.username || this.user.login)+" followers";
      }
    }
    </script>

    <style>

    </style>

