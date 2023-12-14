<template>
  <div class="column">
    <div style="display:flex; align-items: center;" v-if="this.playlists.length>0">
      <span class="h3 secondary-text">Hear your own playlists and the playlists you’ve liked:</span>
      <div style="display:flex; margin-left:auto; align-items: center; gap:20px;">
        <div class="wrapper-search h4">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
        <button class="button-primary h5">Dropdown</button>
      </div>
    </div>
    <errorMessage  v-else>
      <template v-slot:errorIcon><span class="bi bi-music-note-list"></span></template>
      <template v-slot:message>No playlists here yet</template>
    </errorMessage>
    <ul class="ul-grid">
      <li v-for="playlist in this.playlists">
        <playlistCard :id="playlist.id"/>
      </li>

    </ul>
  </div>
  <router-view></router-view>
</template>

  <script>

  import playlistCard from '@/components/playlistCard.vue'
  import errorMessage from '@/components/errorMessage.vue'

  import {getPlaylists} from "@/axios/getters.js"

  export default {
    name: 'YourPlaylistsView',
    components:
    {
      playlistCard,errorMessage
    },
    data()
    {
      return {
        playlists:[],
      }
    },
    async mounted()
    {
      this.playlists = await getPlaylists();
    }
  }
  </script>

  <style>

  </style>