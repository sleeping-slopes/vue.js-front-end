<template>
  <div class="browser">

    <div style="display:flex;flex-direction: column; width:100%; overflow: hidden; gap:10px;">

      <div class="panel" style="flex-shrink:0; width:100%; height:max-content">
        <div class="panel-header">Playlists</div>
        <div class="panel-content">
          <playlistCarousel :playlists="playlists"/>
        </div>
      </div>

      <div class="panel" style="height:100%;">
        <div class="panel-header">Songs</div>
        <div class="panel-content">
        <playlist
          :playlistID="myAudio.playlistID"
          :songs="myAudio.songs"
        />
        </div>
      </div>

  </div>
    <div class = "panel sidebar-width" style="height:100%">
      <div class="panel-header">Recently played</div>
      <div class="panel-content">
      <playlist
          :playlistID="lastListened.playlistID"
          :songs="lastListened.songs"
        />
      </div>
    </div>
  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue'
import playlist from '@/components/playlist.vue'
import playlistModal from '@/components/playlistModal.vue'

export default {
  name: 'MyLibrary',
  components:
  {
    playlistCarousel,playlist,playlistModal
  },
  data()
  {
    return {
      playlists:
      [],
      myAudio:
      {
        playlistID:'myaudio',
        songs:
        [
        ]
      },
      lastListened:
      {
        playlistID:'lastListened',
        songs:
        [
        ]
      }
    }
  },
}
</script>

<style>

.browser
{
  width:100%;
  gap:10px;
  display:flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow:hidden;
  justify-content: center;
}
</style>