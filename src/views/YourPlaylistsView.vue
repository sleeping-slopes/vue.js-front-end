<template>
  <div class="column">
    <div style="display:flex; align-items: center;">
      <span class="h3 secondary-text">Hear your own playlists and the playlists you’ve liked:</span>
      <div style="display:flex; margin-left:auto; align-items: center; gap:20px;">
        <div style="display:flex; margin-left:auto; align-items: center; gap:5px;">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button-secondary bi bi-grid-fill h3" style="padding:5px;"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button-secondary bi bi-list h3" style="padding:5px;"></button>
        </div>
        <div class="wrapper-search h4">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
        <select v-model="selected">
          <option>All</option>
          <option>Created</option>
          <option>Liked</option>
        </select>
      </div>
    </div>
    <errorMessage  v-if="this.playlists.length==0">
      <template v-slot:errorIcon><span class="bi bi-music-note-list"></span></template>
      <template v-slot:message>No playlists here yet</template>
    </errorMessage>
    <ul class="column" v-if="this.currentViewStyle==0">
      <li v-for="playlist in this.playlists">
        <playlistExpansible :id="playlist.id" :key="playlist.id"/>
      </li>
    </ul>
    <ul class="ul-grid" v-else>
      <li v-for="playlist in this.playlists">
        <playlistCard :id="playlist.id" :key="playlist.id"/>
      </li>
    </ul>
  </div>
  <router-view></router-view>
</template>

  <script>

  import playlistCard from '@/components/playlist/playlistCard.vue'
  import playlistExpansible from '@/components/playlist/playlistExpansible.vue'
  import errorMessage from '@/components/errorMessage.vue'

  import {getUserAllPlaylists, getUserCreatedPlaylists, getUserLikedPlaylists} from "@/axios/getters.js"

  export default {
    name: 'YourPlaylistsView',
    components:
    {
      playlistCard,playlistExpansible,errorMessage
    },
    data()
    {
      return {
        playlists:[],
        selected:'All',
        currentViewStyle:1,
      }
    },
    props:
    {
      login:{default:"nologin"}
    },
    watch:
    {
      'selected':
      {
        handler: async function(value)
        {
          switch (value)
          {
            case "All": this.playlists = await getUserAllPlaylists(this.login); break;
            case "Created": this.playlists = await getUserCreatedPlaylists(this.login); break;
            case "Liked": this.playlists = await getUserLikedPlaylists(this.login); break;
          }
        },
        immediate: true
      }
    }
  }
  </script>

  <style>

  </style>