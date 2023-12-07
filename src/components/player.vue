<template>
  <audio ref="audio"
    @timeupdate="this.currentTime = $event.target.currentTime"
    @ended="this.$store.dispatch('shiftCurrentSong',1)"
    preload="none">
  </audio>
  <div class="player-wrapper" v-if="this.currentSongID!=undefined">
    <div class="player" >

      <div class="player-menu">
        <button class="round-button small bi bi-skip-start-fill"
          v-on:click="this.$store.dispatch('shiftCurrentSong',-1)">
        </button>
        <button class="round-button small"
          v-bind:class="this.$store.state.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'"
          v-on:click="this.$store.state.isPlaying=!this.$store.state.isPlaying">
        </button>
        <button class="round-button small bi bi-skip-end-fill"
          v-on:click="this.$store.dispatch('shiftCurrentSong',1)">
        </button>
        <button class="round-button small bi bi-shuffle"
          v-bind:style="this.$store.state.shuffle?{'color':'var(--accent-color)'}:{}"
          v-on:click = "this.$store.dispatch('shuffle')">
        </button>
        <button class="round-button small bi bi-repeat">

        </button>
      </div>

      <div class="player-slider">
        <span class="song-time"> {{ numberToTimeString(this.currentTime) }}</span>
        <input class="song-slider" ref="slider" type="range" min=0 :max="this.$refs.audio.duration" step="0.1" v-model="currentTime" @change="seek()">
        <span class="song-time"> {{ numberToTimeString(this.$refs.audio.duration) }}</span>
      </div>
      <div class="player-menu">
        <button class="round-button small bi bi-volume-up-fill">

        </button>
      </div>
      <div style="display:flex; gap:10px;">
        <song ref="song" style="width:360px;" :id = "this.currentSongID" :key = "this.currentSongID"/>
        <div class="player-menu">
          <button class="round-button small bi bi-suit-heart-fill">

          </button>
          <button class="round-button small bi bi-music-note-list"
            v-bind:style="this.show?{'color':'var(--accent-color)'}:{}"
            v-on:click="this.show=!this.show">
          </button>
        </div>
      </div>
      <panel class="current-playlist-popup" v-bind:class="this.show?'visible':'hidden'">
        <template v-slot:header>Current playlist</template>
        <template v-slot:menu>
          <button class="button-secondary">Clear</button>
          <button class="panel-header-button bi bi-x-lg"
            v-on:click="this.show=!this.show">
          </button>
        </template>
        <template v-slot:content>
          <playlist
            :id="this.$store.state.currentPlaylist.id"
            :songs="this.$store.state.currentPlaylist.songs"
          />
        </template>
      </panel>

    </div>
  </div>
</template>

<script>

import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"
import song from "@/components/song.vue"

import { numberToTimeString } from "@/functions.js"

export default
{
  name: 'player',
  components:
  {
    panel,playlist,song
  },
  data()
  {
    return {
      currentSongID: undefined,
      currentTime:0,
      show:false
    }
  },
  async mounted()
  {
    this.currentSongID = this.$store.getters.getCurrentSong;
    if (this.currentSongID!=undefined)
    {
      this.$refs.audio.src = "http://localhost:5000/api/songs/"+this.currentSongID+"/audio";
    }
  },
  watch:
  {
    '$store.getters.getCurrentSong'(id)
    {
      this.currentSongID = id;
    },

    '$store.getters.getCurrentPlaylistSongPos'(playlistSong)
    {
      this.$store.state.isPlaying=false;

      this.currentSongID = this.$store.getters.getCurrentSong;
      if (this.currentSongID!=undefined)
      {
        this.$refs.audio.src = "http://localhost:5000/api/songs/"+this.currentSongID+"/audio";

        setTimeout(()=>{this.$store.state.isPlaying=true}, 0);
      }
    },

    '$store.state.isPlaying'(playing)
    {
      if (playing)
      {
        this.$refs.audio.play();
      }
      else
      {
        this.$refs.audio.pause();
      }
    }
  },
  methods:
  {
    seek()
    {
      this.$refs.audio.currentTime=this.$refs.slider.value;
      this.$store.state.isPlaying=true;
    },
    numberToTimeString:numberToTimeString
  }
}

</script>

<style>

.visible
{
  opacity:1.0;
  transform:translateY(-100%) translateY(-12px);
}

.hidden
{
  transform:translateY(0%);
  opacity:0.0;
}

.current-playlist-popup
{
  position:absolute;
  width:480px;
  height:640px;
  max-height: calc(100vh - 140px);
  right:0px;
  transition:transform 0.35s cubic-bezier(0,0,0,1.2),opacity 0.1s ease;
  box-shadow: 0 0 20px 5px rgba(0,0,0,.2);
  z-index:-1;
}

.player-wrapper
{
  background-color:var(--panel-background-color);
  width:100%;
  display:flex;
  justify-content: center;
  border-top:2px solid var(--panel-border-color);
  /* box-shadow: 0 -6px 14px 0 rgba(0,0,0,.2); */
  z-index:1;
  margin-top:auto;
}

.player
{
  display:flex;
  width:1240px;
  gap:40px;
  position:relative;
  padding-left:10px;
  padding-right:10px;
  box-sizing: border-box;
  background-color:var(--panel-background-color);
}

.player-menu
{
  display:flex;
  align-items: center;
  gap:20px;
}

.song-time
{
  display:inline-flex;
  color: var(--text-color-primary);
  width:80px;
  align-items: center;
  justify-content: center;
}

.song-slider
{
  min-width:250px;
  width:100%;
}

.player-slider
{
  display:flex;
  width:100%;
}

</style>