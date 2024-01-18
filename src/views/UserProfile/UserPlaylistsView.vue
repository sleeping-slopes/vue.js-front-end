<template>

<playlistContainer class="column" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"></playlistContainer>

</template>

<script>

import API from '@/axios/API';
import playlistContainer from "@/components/playlistContainer.vue"

export default
{
  name: 'UserPlaylistsView',
  components: { playlistContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return{
      playlists:[],
      user:{}
    }
  },
  async created()
  {
    this.playlists = await API.get('users/'+this.login+'/playlists/created');
  },
}

</script>