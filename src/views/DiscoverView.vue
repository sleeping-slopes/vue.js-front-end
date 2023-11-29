<template>
  <div class = "main">
  <div style="display:flex;flex-direction: column; overflow: hidden; gap:10px; width:100%">
    <panel style="flex-shrink:0; height:max-content">
      <template v-slot:header>Playlists</template>
      <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template>
      <template v-slot:content>
        <playlistCarousel :playlists="playlists"/>
      </template>
    </panel>
    <panel style="height:100%;">
      <template v-slot:header>Songs</template>
      <template v-slot:content>
        <playlist
        :id="discoverPlaylist.id"
        :songs="discoverPlaylist.songs"
        />
      </template>
    </panel>
  </div>
</div>
</template>

<script>

import panel from '@/components/panel.vue';
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
        id:'discover',
        songs:[]
      },
    }
  },
  async mounted()
  {
    this.playlists = await getPlaylists();
    this.discoverPlaylist.songs = await getSongs();
  }
}
</script>

<style>

</style>