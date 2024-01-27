<template>
<div class="content column" style="padding-top:0px;">
  <userHeader :login = "this.login"></userHeader>
  <userContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'userCard'" :users="followers"></userContainer>
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
