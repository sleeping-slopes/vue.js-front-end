<template>
  <div class="content column" style="padding-top:0px;">
    <songHeader :id="this.id"></songHeader>
    <userContainer :type="'ul-grid'" :dynamicComponent="'userCard'" :users="users"></userContainer>
  </div>
</template>

<script>

import API from "@/axios/API";

import songHeader from "./songHeader.vue";
import userContainer from '@/components/containers/userContainer.vue';

export default
{
  name: 'SongLikesView',
  components: { songHeader, userContainer },
  props:
  {
    id: { default: "noid" }
  },
  data()
  {
    return {
      users: undefined
    }
  },
  async created()
  {
    this.users = await API.get('songs/'+this.id+'/likes');
  }
}

</script>

