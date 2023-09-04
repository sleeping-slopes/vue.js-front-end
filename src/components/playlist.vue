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
      @deleteSong="deleteSong(index)"
      />
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
      this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: this, songIndex: songIndex});
      this.$emit('playSong');
    },
    deleteSong(songIndex)
    {
      alert("WIP");
      // this.songs.splice(songIndex,1);
      // this.$store.dispatch('setCurrentPlaylist', this);
      // if (songIndex<this.$store.state.currentSongIndex)
      // this.$store.dispatch('shiftCurrentSong',-1);

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