<template>
    <div style="display:flex;flex-direction: column; overflow: hidden; gap:10px;">

      <panel style="flex-shrink:0; height:max-content">
      <template v-slot:header>My playlists</template>
      <template v-slot:content>
        <playlistCarousel :playlists="playlists"/>
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
  <panel class = "sidebar-width" style="height:100%;">
    <template v-slot:header>Recently played</template>
    <template v-slot:content>
    <playlist
        :playlistID="lastListened.playlistID"
        :songs="lastListened.songs"
      />
    </template>
  </panel>
</template>

<script>

import panel from '@/components/panel.vue'
import playlistCarousel from '@/components/playlistCarousel.vue'
import playlist from '@/components/playlist.vue'

import {getPlaylists} from "@/axios/getters.js"

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
  async mounted()
  {
    this.playlists = await getPlaylists();
    // this.discoverPlaylist.songs = await getSongs();
  }
}
</script>

<style>

</style>