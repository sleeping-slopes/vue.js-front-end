<template>
  <div class = "main">
    <div class="column">
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
          <playlist class="ul-list hidden-scroll"
          :id="discoverPlaylist.id"
          :songs="discoverPlaylist.songs"
          :dynamicComponent="'songExtended'"
          />
        </template>
      </panel>
    </div>
  </div>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import playlistCarousel from '@/components/playlistCarousel.vue';
import playlist from '@/components/playlist.vue';

import {getSongs, getPlaylists} from "@/axios/getters.js"

export default {
  name: 'DiscoverView',
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
  async created()
  {
    this.playlists = await getPlaylists();
    this.discoverPlaylist.songs = await getSongs();
  }
}
</script>

<style>

</style>