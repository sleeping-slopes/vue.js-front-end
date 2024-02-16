<template>

<playlistContainer :type="'column'" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"></playlistContainer>

</template>

<script>

import API from '@/axios/API';
import playlistContainer from "@/components/containers/playlistContainer.vue"

export default
{
  name: 'UserPlaylistsView',
  components: { playlistContainer },
  props:
  {
    login: { default: "route_param_login" }
  },
  data()
  {
    return{
      playlists: undefined
    }
  },
  computed:
  {
    user() { return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    this.playlists = await API.get('users/'+this.login+'/playlists/created');
  },
}

</script>