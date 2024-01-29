<template>
<div class="content column" style="padding-top:0px;">
  <userHeader :login = "this.login"><template v-slot:caption>Followings</template></userHeader>
  <userContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'userCard'" :users="followings"></userContainer>
</div>
</template>

<script>

import API from "@/axios/API";

import userHeader from "./userHeader.vue"
import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'UserFollowingView',
  components: { userHeader, userContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      followings: undefined
    }
  },
  async created()
  {
    this.followings = await API.get('users/'+this.login+'/following');
  }
}

</script>
