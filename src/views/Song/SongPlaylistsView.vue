<template>
  <div class="content column" style="padding-top:0px;">
    <songHeader :id="this.id"></songHeader>
    <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"/>
  </div>
</template>

<script>

import API from "@/axios/API";

import songHeader from "./songHeader.vue";
import playlistContainer from "@/components/containers/playlistContainer.vue";

export default
{
  name: 'SongPlaylistsView',
  components: { songHeader, playlistContainer },
  props:
  {
    id: { default: "noid" }
  },
  data()
  {
    return {
      playlists: undefined
    }
  },
  async created()
  {
    this.playlists = await API.get('songs/'+this.id+'/playlists');
  }
}

</script>