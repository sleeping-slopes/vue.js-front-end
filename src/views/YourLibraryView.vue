<template>
  <div class="column">
    <div style="display:flex; justify-content: space-between; align-items: center;">
      <span class="h3 secondary-text">JIJA:</span>
      <div class="wrapper-search h4">
        <div class="search-panel">
          <input class="search" type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </div>
      </div>
    </div>
    <panel style="height:max-content;flex-shrink:0;">
      <template v-slot:header>Playlists</template>
      <!-- <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template> -->
      <template v-slot:content>
        <playlistCarousel :playlists="playlists" :maxDisplay="20"/>
      </template>
    </panel>
    <panel style="height:100%;">
      <template v-slot:header>Songs</template>
      <template v-slot:content>
        <playlist
        :id="discoverPlaylist.id"
        :songs="discoverPlaylist.songs"
        :dynamicComponent="'songExtended'"
        />
      </template>
    </panel>
  </div>
</template>

  <script>

  import panel from '@/components/panel.vue';
  import playlistCarousel from '@/components/playlistCarousel.vue';
  import playlist from '@/components/playlist.vue';

  import {getSongs, getPlaylists} from "@/axios/getters.js"

  export default {
    name: 'YourLibraryView',
    components:
    {
      panel,playlistCarousel,playlist
    },
    data()
    {
      return {
        playlists:[],
        discoverPlaylist:
        {
          id:'[]discover',
          songs:[]
        },
      }
    },
    async mounted()
    {
      this.playlists = await getPlaylists();
      this.discoverPlaylist.songs = await getSongs();
      document.title="Discover";
    }
  }
  </script>

  <style>

  </style>