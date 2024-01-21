<template>
    <div class="column">
        <div class="row y-center">
          <span class="h3 secondary-text">Hear what the people you follow have posted:</span>
          <label class="label-search-input h4 right">
            <input type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </label>
        </div>
        <userContainer :type="'ul-grid'" :dynamicComponent="'userCard'" :users="followings"></userContainer>
    </div>
</template>

<script>

import API from "@/axios/API";
import userContainer from "@/components/userContainer.vue";

export default
{
  name: 'YourFollowersView',
  components: { userContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return {
      user: undefined,
      followings: undefined,
    }
  },
  async created()
  {
    this.followings = await API.get('users/'+this.login+'/following');
  }
}

</script>
