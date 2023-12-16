<template>
  <errorMessage  v-if="songs.length==0">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>No audio here yet</template>
  </errorMessage>
  <ul class = "song-container" v-else>
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

import song from '@/components/song/song.vue'
import songExtended from '@/components/song/songExtended.vue'
import songCard from '@/components/song/songCard.vue'
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

.hidden-scroll
{
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hidden-scroll::-webkit-scrollbar
{
    display: none;
}

.song-container
{
  overflow-y:scroll;
}

</style>