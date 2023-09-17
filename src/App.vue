<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <div class="window">
      <navbar/>
      <div class = "main" >
        <div class = "panel sidebar-width" style="height:100%">
          <div class = "panel-header">Current playlist</div>
          <div class = "panel-content">
            <playlist
              :playlistID="this.$store.state.currentPlaylist.playlistID"
              :songs="this.$store.state.currentPlaylist.songs"
            />
          </div>
        </div>
        <router-view/>
      </div>
      <div class="player" v-if="this.$store.state.currentPlaylist.songs && this.$store.state.currentPlaylist.songs.length>0 && this.$store.state.currentSongIndex>=0">
        <div class ="song sidebar-width">
          <div class = "wrapper-song-cover">
            <img class = "song-cover" v-if="this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].coversrc" :src="require(`./assets/covers/${this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].coversrc}`)"/>
            <div class = "song-cover bi bi-music-note" v-else/>
          </div>
          <div class= "song-info">
              <div class ="song-info-name">{{this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].songName}}</div>
              <div class ="song-info-artist">
                <div v-for="(artist,index) in this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].artists">
                    <router-link class="artistlink" :to="'/discover/artist/'+artist.artistID">
                        {{artist.artistName}}
                    </router-link>
                    <span v-if="index+1 < this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].artists.length">, </span>
              </div>
            </div>
          </div>
        </div>
        <div class="player-menu">
          <div class = "player-menu-button-row">
            <button class="round-button medium bi bi-plus-lg"></button>
            <button class="round-button medium bi bi-skip-start-fill"
              v-on:click="this.$store.dispatch('shiftCurrentSong',-1)"></button>
            <button class="round-button large"
              v-bind:class="this.$store.state.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle'"
              v-on:click="this.$store.state.isPlaying=!this.$store.state.isPlaying"></button>
            <button class="round-button medium bi bi-skip-end-fill"
              v-on:click="this.$store.dispatch('shiftCurrentSong',1)"></button>
            <button class="round-button medium bi bi-repeat"></button>
          </div>
          <div class="slider-wrapper">
            <div class="song-time"> {{ secsToMins(this.audio.currentTime) }}</div>
            <input class="song-slider" type="range" min="1" max="100" value="0" @change="test()">
            <div class="song-time"> {{ secsToMins(this.audio.duration) }} </div>
          </div>
        </div>
        <div class ="sidebar-width"></div>
      </div>
    </div>
  </div>
</template>


<script>
import navbar from "@/components/navbar.vue"
import playlist from "@/components/playlist.vue"
import playlistModal from "@/components/playlistModal.vue"

export default{
  components: {navbar,playlist,playlistModal},
  name: 'app',
  data()
  {
    return {
      songCurrentTime: this.audio?this.audio.currentTime:0
    }
  },
  created()
  {
    this.audio = new Audio();
    this.audio.onended=(()=>this.$store.dispatch('shiftCurrentSong',1));
    if (this.$store.getters.getCurrentSongSrc)
    this.audio.src=require(`./assets/audio/${this.$store.getters.getCurrentSongSrc}`);
  },
  watch:
  {
    '$store.getters.getCurrentSongPlaylistPos'(playlistSong)
    {
      this.$store.state.isPlaying=false;
      this.audio.src=require(`./assets/audio/${this.$store.getters.getCurrentSongSrc}`);
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
    secsToMins(sec)
    {
      return String(Math.floor(sec/60)).padStart(2,'0')+":"+String(Math.floor(sec)%60).padStart(2,'0');
    },
    test()
    {
      alert(1);
    }
  }
}

</script>

<style>

.app
{
  height:100%;
  width:100%;
  background-color: var(--main-background-color);
  position:relative;
}

.window
{
  display:flex;
  flex-direction:column;
  gap:10px;
  width:100%;
  height:100%;
  padding:10px;
  box-sizing: border-box;
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

.panel-header
{
  display:flex;
  height:48px;
  align-items: center;
  color:var(--text-color-primary);
  white-space: nowrap;
  flex-shrink: 0;
  padding-left:5px;
  padding-right:5px;
  font-size:1.25em;
  font-weight: bold;
}

.panel-content
{
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow:hidden;
  align-items: center;
  justify-content: center;
  width:100%;
  padding:5px;
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

.slider-wrapper
{
  display:flex;
}

.song-time
{
  color: var(--text-color-primary);
  width:64px;
  overflow:hidden;
  display:flex;
  justify-content: center;
  align-items: center;
}

.song-slider
{
  width:100%;
}
</style>