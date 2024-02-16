<template>
<div class="content column" style="padding-top:0px;">
  <userHeader :login = "this.login"><template v-slot:caption>Followers</template></userHeader>
  <userContainer :type="'ul-grid'" :dynamicComponent="'userCard'" :users="followers"></userContainer>
  <article class="project-info row">
    <p>
      <span>About website</span><br>
      Non-commercial project created solely for demonstration purposes.<br>
      I do not own the copyrights to the posted content.
    </p>
    <p>
      <span>Technologies used</span><br>
      Frontend: HTML, CSS (PostCSS), Vue.js, Axios<br>
      Backend: Express.js, MySQL, REST API, JSON Web Token
    </p>
    <p>Created by <a href="https://github.com/sleeping-slopes" class="accent-text alink" target=”_blank” rel="noopener noreferrer">@sleeping-slopes</a></p>
    <p class="right"><span class="accent-text">Language:&nbsp</span>English (US)</p>
  </article>
</div>
</template>

<script>

import API from "@/axios/API";

import userHeader from "./userHeader.vue"
import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'UserFollowersView',
  components: { userHeader, userContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      followers: undefined
    }
  },
  async created()
  {
    this.followers = await API.get('users/'+this.login+'/followers');
  }
}

</script>
