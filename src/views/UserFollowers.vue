<template>
  <div class="scr">
    <div class="main">
			<panel>
				<template v-slot:content>
					<img class = "user-image" :src="`http://localhost:5000/api/user/`+this.login+`/picture`"/>
					{{this.user.username}} is following
				</template>
			</panel>
			<div class="column">
				<nav class="navtab">
					<div class="nav-menu">
						<router-link class="tablink" :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link>
						<router-link class="tablink" :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link>
					</div>
				</nav>
				<ul class="user-list">
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
					<li><userCard :login="'norimyxxxo'"></userCard></li>
				</ul>
			</div>
  	</div>
  </div>
</template>

<script>

  import { getUserUsername } from "@/axios/getters";
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
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
      }
    }
    </script>

    <style>

.user-list
{
	list-style: none;
	padding:0px;
	margin:0px;
	gap:45px;
	display:flex;
}
    </style>

