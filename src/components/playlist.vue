<template>

  <div class = "playlist">
    <song v-for="(song,index) in songs"
      :index = "index"
      :songID="song.songID"
      :songPosition="song.songPosition"
      :audiosrc="song.audiosrc"
      :coversrc="song.coversrc"
      :songName="song.songName"
      :artists="song.artists"
      :songDuration="song.songDuration"
      @setCurrentSong="setCurrentPlaylistAndSong(index)"
      @deleteSong="deleteSong(index)"
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
  created()
  {

  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: this, songIndex: songIndex}));
    },
    deleteSong(songIndex)
    {
      // // alert("WIP");
      // this.songs.splice(songIndex,1);
      // if (this.current)
      // if (songIndex<this.$store.state.currentSongIndex)
      // this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: this, songIndex: this.$store.state.currentSongIndex-1}));
      // // if (songIndex<this.$store.state.currentSongIndex)
      // // this.$store.dispatch('shiftCurrentSong',-1);

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
  box-sizing: border-box;
  height:100%;
  overflow-y:scroll;
  padding:5px;
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
  font-size:64px;
  width:100%;
  padding-top:20px;
  padding-bottom:20px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.songs-empty span
{
  font-size:16px;
  font-family: "Kanit regular", sans-serif;
}
</style>