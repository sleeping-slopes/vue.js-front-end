<template>
  <div class="main">
    <div style="display:flex;flex-direction: column; overflow: hidden; gap:10px; width:100%">

      <panel style="flex-shrink:0; height:max-content">
      <template v-slot:header>My playlists</template>
      <template v-slot:content>
        <playlistCarousel :playlists="myPlaylists"/>
      </template>
    </panel>

      <panel style="height:100%;">
        <template v-slot:header>Songs</template>
        <template v-slot:content>
        <playlist
          :playlistID="myAudio.playlistID"
          :songs="myAudio.songs"
        />
        </template>
      </panel>

  </div>
  <panel style="width:360px;height:100%; flex-shrink:0">
    <template v-slot:header>Recently played</template>
    <template v-slot:content>
    <playlist
        :playlistID="lastListened.playlistID"
        :songs="lastListened.songs"
      />
    </template>
  </panel>
</div>
</template>

<script>

import panel from '@/components/panel.vue'
import playlistCarousel from '@/components/playlistCarousel.vue'
import playlist from '@/components/playlist.vue'

import {getPlaylists} from "@/axios/getters.js"
import {getSongs} from "@/axios/getters.js"

export default
{
  name: 'MyLibraryView',
  components:
  {
    panel,playlistCarousel,playlist
  },
  data()
  {
    return {
      myPlaylists:
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
  async mounted()
  {
    this.myPlaylists = await getPlaylists();
    this.myAudio.songs = await getSongs();
  }
}
</script>

<style>

</style>