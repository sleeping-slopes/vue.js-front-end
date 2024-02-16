<template>
<div class="content column" style="padding-top:30px">
  <span class="primary-text font-size-large">Songs tagged #{{ this.tag }}</span>
  <nav class="nav-tab">
    <ul>
      <li><router-link :to="{ name: 'TagPopular'}">Popular</router-link></li>
      <li><router-link :to="{ name: 'TagNew'}">New</router-link></li>
    </ul>
  </nav>
  <router-view></router-view>
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

import errorMessage from "@/components/containers/errorMessage.vue";

export default
{
  name: 'TagView',
  components: { errorMessage },
  props:
  {
    tag: { default: "notag" }
  }
}

</script>


