<template>

  <div class="browser">
    <div style="display:flex;flex-direction: column; width:100%; overflow: hidden; gap:10px;">
    <playlistCarousel :playlists="playlists"/>
    <div class="panel" style="height:100%;">
        <div class="panel-header">Songs</div>
        <div class="panel-content">
        <playlist
          :playlistID="discoverPlaylist.playlistID"
          :songs="discoverPlaylist.songs"
        />
        </div>
      </div>
  </div>
  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue';
import playlist from '@/components/playlist.vue';
import {getSongs, getPlaylists} from "@/axios/getters.js"

export default {
  name: 'discover',
  components:
  {
    playlistCarousel,playlist
  },
  data()
  {
    return {
      playlists:[],
      discoverPlaylist:
      {
        playlistID:'discover',
        songs:[]
      },
    }
  },
  created()
  {
    (async () => { this.playlists = await getPlaylists() })();
    (async () => { this.discoverPlaylist.songs = await getSongs() })();
  }
}
</script>

<style>

</style>