<template>
  <playlistContainer class="ul-list" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"/>
</template>

<script>

import playlistContainer from "@/components/playlistContainer.vue";
import API from "@/axios/API";

  export default {
    name: 'SongLikesView',
    components:{playlistContainer},
    props:
    {
      id: { default: "noid" },
    },
    data()
    {
      return {
        playlists:[]
      }
    },
    async created()
    {
      this.playlists = await API.get('songs/'+this.id+'/playlists');
    }
  }
  </script>