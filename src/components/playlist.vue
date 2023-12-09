<template>

  <ul class = "playlist" v-if="songs.length>0">
    <li v-for="(song,index) in this.getShortList">
    <song
      :index = "index"
      :id = "song.id"
      :pos = "song.pos"
      :key = song.id
      @setCurrentSong="setCurrentPlaylistAndSong(index)"
    />
    </li>
  </ul>
  <div class="playlist-empty" v-else>
    <i class="bi bi-music-note-beamed"></i>
    No audio here yet
  </div>
</template>

<script>

import song from './song.vue'

export default
{
  name: 'playlist',
  components:
  {
    song
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
    maxDisplay: {default:0}
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

.playlist-empty
{
  color:var(--text-color-secondary);
  width:100%;
  padding-top:20px;
  padding-bottom:20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.playlist-empty i
{
  font-size:48px;
}
</style>