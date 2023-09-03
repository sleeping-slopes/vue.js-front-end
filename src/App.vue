<template>
  <navbar/>
  <div class = "main" >
    <div class = "playlist-menu sidebar-width">
      <div class = "playlist-menu-button-row">
        <button class="button-switch" v-bind:class="{'active': visiblePlaylist===0}" v-on:click="visiblePlaylist=0"><i class="bi bi-music-note-list"></i>Playlist</button>
        <button class="button-switch" v-bind:class="{'active': visiblePlaylist===1}" v-on:click="visiblePlaylist=1"><i class="bi bi-clock-history"></i>Recently played</button>
        <button class="button-switch" v-bind:class="{'active': visiblePlaylist===2}" v-on:click="visiblePlaylist=2"><i class="bi bi-hand-thumbs-up"></i>Recommended</button>
      </div>
      <playlist
        v-if="visiblePlaylist===0"
        :playlistID="playlists[0].playlistID"
        :songs="playlists[0].songs"
        @playAudio="playAudio"
      />
      <playlist
        v-if="visiblePlaylist===1"
        :playlistID="playlists[1].playlistID"
        :songs="playlists[1].songs"
        @playAudio="playAudio"
      />
      <playlist
        v-if="visiblePlaylist===2"
        :playlistID="playlists[2].playlistID"
        :songs="playlists[2].songs"
        @playAudio="playAudio"
      />
    </div>
    <div class="browser">
      <router-view/>
    </div>
  </div>
  <div class="player" v-if="this.$store.state.currentPlaylist.songs && this.$store.state.currentPlaylist.songs.length>0 && this.$store.state.currentSongIndex>=0">
    <div class ="song sidebar-width">
      <div class = "wrapper-song-cover">
        <img class = "song-cover" :src="require(`./assets/covers/${this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].cover}`)"/>
      </div>
      <div class= "song-info">
          <div class ="song-info-name" style="font-size:20px">{{this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].songName}}</div>
          <a href="#" class ="song-info-artist" style="font-size:20px">{{this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].songArtist}}</a>
      </div>
    </div>
    <div class="player-menu">
      <div class = "player-menu-button-row">
            <button class="round-button medium bi bi-plus-lg"></button>
            <button class="round-button medium bi bi-skip-start-fill"
              v-on:click="this.$store.dispatch('shiftCurrentSong',-1)"></button>
            <button class="round-button large"
              v-bind:class="{ 'bi bi-play-circle': !this.$store.state.isPlaying,'bi bi-pause-circle-fill':this.$store.state.isPlaying }"
              v-on:click="this.$store.state.isPlaying=!this.$store.state.isPlaying"></button>
            <button class="round-button medium bi bi-skip-end-fill"
              v-on:click="this.$store.dispatch('shiftCurrentSong',1); playAudio()"></button>
            <button class="round-button medium bi bi-repeat"></button>
        </div>
      <input class="song-slider" type="range" min="1" max="100" value="0">
    </div>
    <div class ="sidebar-width"></div>
  </div>
</template>


<script>
import navbar from "@/components/navbar.vue"
import playlist from "@/components/playlist.vue"

export default{
  components: {navbar,playlist},
  name: 'app',
  data()
  {
    return {
      playlists:
      [
        {
          playlistID:'CURRENT',
          songs:
          [
            {
              songID: 0,
              audio: "Слава КПСС - ОЙ ДА.mp3",
              cover: 'gorgorod.jpg',
              songName: 'Не с начала',
              songArtist: 'Oxxxymiron',
              songDuration: 122
            }
          ]
        },
        {
          playlistID:'RECENT',
          songs:
          [
            {
              songID: 0,
              audio: "Слава КПСС - ОЙ ДА.mp3",
              cover: 'gorgorod.jpg',
              songName: 'Не с начала',
              songArtist: 'Oxxxymiron',
              songDuration: 122
            }
          ]
        },
        {
          playlistID:'RECOMMENDED',
          songs:
          [
            {
              songID: 0,
              audio: "Слава КПСС - Горгород.fm.mp3",
              cover: 'gorgorod2.jpg',
              songName: 'Горгород.fm',
              songArtist: 'Слава КПСС',
              songDuration: 332
            },
            {
              songID: 1,
              audio: "Слава КПСС - Сон разума.mp3",
              cover: 'gorgorod2.jpg',
              songName: 'Сон разума',
              songArtist: 'Слава КПСС',
              songDuration: 332
            },
            {
              songID: 2,
              audio: "Слава КПСС - Девочка-милф.mp3",
              cover: 'gorgorod2.jpg',
              songName: 'Девочка-милф',
              songArtist: 'Слава КПСС',
              songDuration: 332
            }
          ]
        }
      ],
      visiblePlaylist: 0,
      audio: new Audio(),
    }
  },
  computed:
  {
    fff()
    {
      return this.$store.state.isPlaying;
    }
  },
  methods:
  {
    // selectSong(playlist,song)
    // {
    //   alert(1);
    //   if (this.currentPlaylist!=playlist)
    //   {
    //     this.playlists.forEach((p)=>{p.selectedSong=-1});
    //     this.currentPlaylist = playlist;
    //   }
    //   if (this.currentPlaylist.selectedSong===song) { this.togglePlay(); return; }
    //   this.currentPlaylist.selectedSong=song;
    //   this.playAudio();
    // },
    playAudio()
    {
      //alert(1);
      // this.audio.pause();
      // this.audio.src=require(`./assets/audio/${this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].audio}`);
      // if (this.$store.state.isPlaying)
      // this.audio.play();
    }
  }
}

</script>

<style>

#app
{
  height:100%;
  background-color: #12151d;
  display:flex;
  flex-direction: column;
  padding:10px;
  gap:10px;
  box-sizing:border-box;
}

.main
{
  height:100%;
  display:flex;
  flex-direction: row;
  gap:10px;
  overflow:hidden;
}

.playlist-menu
{
  border-radius:10px;
  display:flex;
  height:100%;
  flex-direction: column;
  overflow:hidden;

}

.playlist-menu-button-row
{
  display:flex;
  height:48px;
}

.button-switch
{
    background-color:#2c2d3c;
    color:#808080;
    font-size:16px;
    font-family: "Kanit semibold", sans-serif;
    height:100%;
    width:100%;
    cursor:pointer;
    white-space: nowrap;
    border:none;
    position:relative;
}

.button-switch i
{
    margin-right:4px;
}

.button-switch:hover
{
    color:white;
}

.button-switch.active
{
  color:white;
  background-color:#1d232f;
}

.button-switch.active::after
{
  content:"";
  position:absolute;
  width:100%;
  height:2px;
  background-color:cornflowerblue;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;
  bottom:0px;
}

.browser
{
  background-color:cornflowerblue;
  width:100%;
  border-radius:10px;
  /* overflow:hidden; */
}

.display-none
{
  display:none;
}

.player
{
    display:flex;
    width:100%;
    gap:10px;
}

.player-menu
{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}

.player-menu-button-row
{
  display:flex;
  justify-content: center;
  align-items:center;
  gap:5px;
}

.round-button
{
  font-size:30px;
  height:30px;
  width:30px;
  display:flex;
  justify-content:center;
  align-items: center;
  background:none;
  border:none;
  color: white;
  padding:0px;
  margin:0px;
  border-radius:50%;
  cursor:pointer;
}

.round-button.large
{
  font-size:42px;
  height:42px;
  width:42px;
}

.round-button.medium
{
  font-size:28px;
  height:28px;
  width:28px;
}

.round-button.small
{
  font-size:20px;
  height:20px;
  width:20px;
}

</style>
