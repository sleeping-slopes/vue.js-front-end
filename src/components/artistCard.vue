

<template>
    <div class="panel" style="width:100%;">
        AAAAAAAAAAAAAAAA
    </div>
  </template>

  <script>

  import playlist from "@/components/playlist.vue";
  import axios from "axios";

  export default {
    name: 'playlistModal',
    components: {playlist},
    computed:
    {

    },
    data()
    {
      return {
        playlistData:{coversrc:"Sweet Dreams.png"},
        playlistArtists: [],
        songs:[]
      }
    },
    props:
    {

    }
  }
  </script>

  <style>

  </style>

