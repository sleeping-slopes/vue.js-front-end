<template>
  <template v-if="this.user && !this.user.error">
    <div class="content column">
      <div class="sticky-top">
        <div style="position:relative">
          <userHeader :login="this.login"><template v-slot:caption>Followings of</template></userHeader>
        </div>
        <nav class="nav-tab">
          <ul>
            <li><router-link :to="{ name: 'UserFollowers', params: { login: this.login }}">Followers</router-link></li>
            <li><router-link :to="{ name: 'UserFollowing', params: { login: this.login }}">Following</router-link></li>
          </ul>
        </nav>
      </div>
      <userContainer :type="'ul-grid'" :dynamicComponent="'userCard'" :users="following"></userContainer>
      <article class="project-info row">
        <p>
          <span>About website</span><br>
          Non-commercial project created solely for demonstration purposes.<br>
          I do not own the copyrights to the posted content.
        </p>
        <p>
          <span>Technologies used</span><br>
          Frontend: HTML, CSS (PostCSS), Vue.js, Axios;<br>
          Backend: Express.js, MySQL, REST API, Multer, JSON Web Token.
        </p>
        <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
        <p class="right"><span class="accent-text">Language:&nbsp</span>English (US)</p>
      </article>
    </div>
  </template>
</template>

<script>

import API from "@/axios/API";

import userHeader from "@/components/users/userHeader.vue"
import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'UserFollowingView',
  components: { userHeader, userContainer },
  props:
  {
    login: { default: "route_param_login" }
  },
  data()
  {
    return {
      user: undefined,
      following: undefined
    }
  },
  async created()
  {
    this.user = await API.get('users/'+this.login+'/profile');
    if (this.user.error) this.$router.push({ name:"User", params: { login: this.login } });
    this.following = await API.get('users/'+this.login+'/following');
  }
}

</script>
