<template>

  <ul class = "playlist" v-if="songs.length>0">
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
  <div class="error-message" v-else>
    <i class="bi bi-music-note-beamed"></i>
    No audio here yet
  </div>
</template>

<script>

import song from './song.vue'
import songExtended from './songExtended.vue'

export default
{
  name: 'playlist',
  components:
  {
    song,songExtended
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

.playlist
{
  width:100%;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  height:100%;
  overflow-y:scroll;
  gap:5px;
  list-style: none;
  padding:0px;
  margin:0px;
}

.playlist::-webkit-scrollbar
{
    display: none;
}

.playlist
{
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>