<template>
    <div class = "playlist">
      <song v-for="(song,index) in songs"
      :index = "index"
      :songID="song.songID"
      :audio="song.audio"
      :cover="song.cover"
      :songName="song.songName"
      :songArtist="song.songArtist"
      :songDuration="song.songDuration"
      @setCurrentSong="setCurrentPlaylistAndSong(index)"
      />
    </div>
</template>

<script>
// v-bind:style=" current ? 'background-color:red;' : '' "
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
      this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: this, songIndex: songIndex});
      this.$emit('playSong');
    }
  },
  props:
  {
    playlistID: {type: String, default:'test'},
    songs: {type: Array, default:[]},
  }
}
</script>

<style>
.playlist
{
  width:100%;
  display:flex;
  flex-direction: column;
  gap: 5px;
  background-color:#1d232f;
  padding: 5px;
  box-sizing: border-box;
  height:100%;
  overflow-y:scroll;
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