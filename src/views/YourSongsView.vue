<template>
  <div class="column">
    <div style="display:flex; align-items: center;" v-if="this.playlist.songs.length>0">
      <span class="h3 secondary-text">Hear your own songs and the songs you’ve liked:</span>
      <div style="display:flex; margin-left:auto; align-items: center; gap:20px;">
        <div style="display:flex; margin-left:auto; align-items: center; gap:5px;">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button-secondary bi bi-grid-fill h3" style="height:auto;padding:5px;"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button-secondary bi bi-list h3" style="height:auto;padding:5px;"></button>
        </div>
        <div class="wrapper-search h4">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
        <button class="button-primary h5">Dropdown</button>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <playlist :class="'ul-list'"
          :id="playlist.id"
          :songs="playlist.songs"
          :dynamicComponent="'songExtended'"/>
      </template>
    </panel>
    <playlist :class="'ul-grid'" v-else
      :id="playlist.id"
      :songs="playlist.songs"
      :dynamicComponent="'songCard'"/>
  </div>
</template>

  <script>

  import panel from '@/components/panel.vue';
  import playlist from '@/components/playlist.vue';
  import songCard from '@/components/song/songCard.vue'

  import {getSongs} from "@/axios/getters.js"

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
      }
    },
    async mounted()
    {
      this.playlist.songs = await getSongs();
    }
  }
  </script>

  <style>

  </style>