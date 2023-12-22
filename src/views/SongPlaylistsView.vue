<template>
  <ul class="ul-list" v-if="this.playlists.length>0">
    <li v-for="playlist in this.playlists"><playlistExpansible :id="playlist.id"></playlistExpansible></li>
  </ul>
  <errorMessage  v-else>
    <template v-slot:errorIcon><span class="bi bi-music-note-list"></span></template>
    <template v-slot:message>No one added this song to any playlist yet</template>
  </errorMessage>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";
import playlistExpansible from "@/components/playlists/playlistExpansible.vue";
import API from "@/axios/API";

  export default {
    name: 'SongLikesView',
    components:{playlistExpansible,errorMessage},
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