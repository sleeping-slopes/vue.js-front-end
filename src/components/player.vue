<template>
  <div class="player" v-if="this.currentSongID!=undefined">
    <song class="sidebar-width" :id = "this.currentSongID" :key = "this.currentSongID"/>
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
</template>

<script>

import song from "@/components/song.vue"
import { getAudio } from "@/axios/getters.js"

export default
{
  name: 'player',
  components:
  {
    song
  },
  data()
  {
    return {
      songCurrentTime: this.audio?this.audio.currentTime:0,
      currentSongID: undefined,
      audio: new Audio(),
    }
  },
  async mounted()
  {
    this.audio.onended=(()=>this.$store.dispatch('shiftCurrentSong',1));

    this.currentSongID = this.$store.getters.getCurrentSong;

    if (this.currentSongID!=undefined)
    {
      const AUDIOPATH = await getAudio(this.currentSongID);
      this.audio.src = "data:audio/mpeg;base64,"+AUDIOPATH;
      this.audio.load();
    }

  },
  watch:
  {
    '$store.getters.getCurrentSong'(id)
    {
      this.currentSongID = id;
    },

    async '$store.getters.getCurrentPlaylistSongPos'(playlistSong)
    {
      this.$store.state.isPlaying=false;

      this.currentSongID = this.$store.getters.getCurrentSong;

      if (this.currentSongID!=undefined)
      {
        const AUDIOPATH = await getAudio(this.currentSongID);
        this.audio.src = "data:audio/mpeg;base64,"+AUDIOPATH;
        this.audio.load();
      }

      this.$store.state.isPlaying=true;
    },

    '$store.state.isPlaying'(playing)
    {
      if (playing) this.audio.play();
      else this.audio.pause();
    }
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

.playlist-menu-button-row
{
  display:flex;
  height:48px;
  flex-shrink:0;
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