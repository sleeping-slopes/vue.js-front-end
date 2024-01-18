<template>
    <div class="column">
        <div class="row y-center">
          <span class="h3 secondary-text">Hear what the people you follow have posted:</span>
          <label class="label-search-input h4 right">
            <input type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </label>
        </div>
        <errorMessage  v-if="this.followings.length==0">
          <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
          <template v-slot:message>You aren’t following anyone</template>
        </errorMessage>
        <ul class="ul-grid">
            <li v-for="following in this.followings"><userCard :login="following.login"></userCard></li>
        </ul>
    </div>
</template>

<script>

import panel from "@/components/containers/panel.vue"
import userCard from "@/components/userCard.vue"
import errorMessage from "@/components/containers/errorMessage.vue";
import API from "@/axios/API";

export default
{
  name: 'YourFollowersView',
  components: { panel, userCard, errorMessage },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      user:undefined,
      followings:[],
    }
  },
  async created()
  {
    this.followings = await API.get('users/'+this.login+'/following');
  }
}

</script>
