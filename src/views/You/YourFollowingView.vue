<template>
  <div class="column">
      <div class="row y-center">
        <span class="secondary-text font-size-big">Hear what the people you follow have posted:</span>
        <label class="label-search right">
          <input type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
      </div>
      <userContainer :type="'ul-grid'" :dynamicComponent="'userCard'" :users="following"></userContainer>
  </div>
</template>

<script>

import API from "@/axios/API";
import userContainer from "@/components/containers/userContainer.vue";

export default
{
  name: 'YourFollowingView',
  components: { userContainer },
  data()
  {
    return {
      login: this.$store.state.currentUser.login,
      following: undefined,
    }
  },
  async created()
  {
    this.following = await API.get('users/'+this.login+'/following');
  }
}

</script>
