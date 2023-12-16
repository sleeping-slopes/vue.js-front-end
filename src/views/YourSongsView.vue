<template>
  <div class="column">
    <div style="display:flex; align-items: center;">
      <span class="h3 secondary-text">Hear your own songs and the songs you’ve liked:</span>
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
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <playlist :class="'ul-list hidden-scroll'"
          :id="playlist.id"
          :songs="playlist.songs"
          :dynamicComponent="'songExtended'"/>
      </template>
    </panel>
    <playlist :class="'ul-grid hidden-scroll'" v-else
      :id="playlist.id"
      :songs="playlist.songs"
      :dynamicComponent="'songCard'"/>
  </div>
</template>

  <script>

  import panel from '@/components/panel.vue';
  import playlist from '@/components/playlist.vue';
  import songCard from '@/components/song/songCard.vue'

  import { getUserAllSongs, getUserCreatedSongs, getUserLikedSongs} from "@/axios/getters.js"

  export default {
    name: 'YourSongsView',
    components:
    {
      panel,playlist,songCard
    },
    data()
    {
      return {
        playlist:
        {
          id:'[]RENAME',
          songs:[],
        },
        currentViewStyle:1,
        selected:'All',
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
            case "All": this.playlist.id="[]YouAll";this.playlist.songs = await getUserAllSongs(this.login); break;
            case "Created": this.playlist.id="[]YouCreated";this.playlist.songs = await getUserCreatedSongs(this.login); break;
            case "Liked": this.playlist.id="[]YouLiked";this.playlist.songs = await getUserLikedSongs(this.login); break;
          }
        },
        immediate: true
      }
    }
  }
  </script>

  <style>

  </style>