<template>
  <errorMessage  v-if="songs.length==0">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>No audio here yet</template>
  </errorMessage>
  <ul class = "playlist" v-else>
    <li v-for="(song,index) in this.getShortList">
    <component :is="dynamicComponent"
      :index = "index"
      :id = "song.id"
      :pos = "song.pos"
      :key = song.id
      @setCurrentSong="setCurrentPlaylistAndSong(index)"
    ></component>
    </li>
  </ul>
</template>

<script>

import song from './song.vue'
import songExtended from './songExtended.vue'
import songCard from './songCard.vue'
import errorMessage from "@/components/errorMessage.vue"

export default
{
  name: 'playlist',
  components:
  {
    song,songExtended,songCard,errorMessage
  },
  computed:
  {
    current()
    {
      return this.$store.state.currentPlaylist.id===this.id;
    },
    getShortList()
    {
      if (this.maxDisplay<1) return this.songs;
      return this.songs.slice(0,this.maxDisplay);
    }
  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: {id:this.id,songs:this.songs}, songIndex: songIndex}));
    }
  },
  props:
  {
    id: { default: "noid"},
    songs: {type: Array, default: []},
    maxDisplay: {default:0},
    dynamicComponent: {default:"song"}
  }
}
</script>

<style>

.playlist::-webkit-scrollbar
{
    display: none;
}

.playlist
{
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y:scroll;
}

</style>