<template>

  <div class = "playlist" :key="playlistID">
    <song v-for="(song,index) in songs"
      :index = "index"
      :song="song"
      @setCurrentSong="setCurrentPlaylistAndSong(index)"
    />
    <div class="songs-empty" v-if="songs.length==0">
      <i class="bi bi-music-note-beamed"></i>
      <span>No audio here yet</span>
    </div>
  </div>
</template>

<script>

import song from './song.vue'

export default {
  name: 'myPlaylist',
  components: { song },
  computed:
  {
    current()
    {
      return this.$store.state.currentPlaylist.playlistID===this.playlistID;
    }
  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      //console.log(JSON.stringify({playlist: {playlistID:this.playlistID,songs:this.songs}, songIndex: songIndex}));
      this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: {playlistID:this.playlistID,songs:this.songs}, songIndex: songIndex}));
      this.$store.dispatch('shuffleSongs');
    }
  },
  props:
  {
    playlistID: {type: String, default:'-1'},
    songs: {type: Object, default: {}}
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

.songs-empty
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

.songs-empty i
{
  font-size:3em;
}
</style>