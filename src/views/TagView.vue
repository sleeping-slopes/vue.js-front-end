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


