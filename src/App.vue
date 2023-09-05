<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
  <navbar/>
  <div class = "main" >
    <div class = "panel sidebar-width" style="height:100%">
      <div class = "playlist-menu-button-row">
        <button class="button-switch" v-bind:class="{'active': visiblePlaylist===0}" v-on:click="visiblePlaylist=0"><i class="bi bi-music-note-list"></i>Playlist</button>
        <button class="button-switch" v-bind:class="{'active': visiblePlaylist===1}" v-on:click="visiblePlaylist=1"><i class="bi bi-clock-history"></i>Recently played</button>
      </div>
      <playlist
        :playlistID="this.$store.state.currentPlaylist.playlistID"
        :songs="this.$store.state.currentPlaylist.songs"
      />
    </div>
    <div class="browser">
      <router-view/>
    </div>
    <div class = "panel sidebar-width" style="height:100%"></div>
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
              v-bind:class="this.$store.state.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"
              v-on:click="this.$store.state.isPlaying=!this.$store.state.isPlaying"></button>
            <button class="round-button medium bi bi-skip-end-fill"
              v-on:click="this.$store.dispatch('shiftCurrentSong',1)"></button>
            <button class="round-button medium bi bi-repeat"></button>
        </div>
      <input class="song-slider" type="range" min="1" max="100" value="0">
    </div>
    <div class ="sidebar-width"></div>
  </div>
</div>
</template>


<script>
import navbar from "@/components/navbar.vue"
import playlist from "@/components/playlist.vue"
import { storeKey } from "vuex"

export default{
  components: {navbar,playlist},
  name: 'app',
  data()
  {
    return {
      playlists:
      [
        this.$store.state.currentPlaylist,
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
        }
      ],
      visiblePlaylist: 0,
    }
  },
  created()
  {
    this.audio = new Audio()
  },
  watch:
  {
    '$store.getters.getCurrentSongPlaylistPos'(playlistSong)
    {
      // this.$store.state.isPlaying=false;
      this.audio.src=require(`./assets/audio/${this.$store.getters.getCurrentSongSrc}`);
      this.$store.state.isPlaying=false;
      this.audio.load();
      setTimeout(()=>{this.$store.state.isPlaying=true}, 500);
    },
    '$store.state.isPlaying'(playing)
    {
      if (playing) this.audio.play();
      else this.audio.pause();
    }
  },
  computed:
  {
  },
  methods:
  {
  }
}

</script>

<style>

.app
{
  height:100%;
  background-color: var(--main-background-color);
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

.panel
{
  border: 2px solid var(--panel-border-color);
  background-color: var(--panel-background-color);
  border-radius:10px;
  display:flex;
  flex-direction: column;
  overflow:hidden;
  box-sizing: border-box;
}

.playlist-menu-button-row
{
  display:flex;
  height:48px;
  flex-shrink:0;
}

.button-switch
{
    background-color:var(--panel-border-color);
    color: var(--text-color-secondary);
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
  color: var(--text-color-primary);
}

.button-switch.active
{
  color: var(--text-color-primary);
  background-color:transparent;
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
  width:100%;
  gap:10px;
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow:hidden;
  justify-content: center;
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
  display:flex;
  justify-content:center;
  align-items: center;
  background:none;
  border:none;
  color: var(--text-color-primary);
  padding:0px;
  margin:0px;
  border-radius:50%;
  cursor:pointer;
}

.round-button.large
{
  font-size:44px;
  height:42px;
  width:42px;
}

.round-button.medium
{
  font-size:30px;
  height:28px;
  width:28px;
}

.round-button.small
{
  font-size:22px;
  height:20px;
  width:20px;
}

</style>