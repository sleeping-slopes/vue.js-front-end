<template>
  <audio ref="audio"
    @timeupdate="this.currentTime = $event.target.currentTime"
    @ended="this.$store.dispatch('playNextSong')"
    :volume="volume"
    preload="none">
  </audio>
  <div class="player-wrapper" v-if="this.currentSongID!=null">
    <div style="background-color:var(--panel-background-color);width:100%;"></div>
    <div class="player">
      <div class="player-menu">
        <button class="button button-round small bi bi-skip-start-fill"
          v-on:click="this.$store.dispatch('shiftCurrentSong',-1)">
        </button>
        <button class="button button-round small"
          v-bind:class="this.$store.state.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'"
          v-on:click="this.$store.dispatch('togglePlayingState');">
        </button>
        <button class="button button-round small bi bi-skip-end-fill"
          v-on:click="this.$store.dispatch('shiftCurrentSong',1)">
        </button>
        <button class="button button-round small bi bi-shuffle"
          v-bind:class="{'toggled':this.$store.state.shuffle}"
          v-on:click = "this.$store.dispatch('shuffle')">
        </button>
        <button class="button button-round small" v-bind:class="{ 'bi bi-repeat': $store.state.repeatMode==0, 'bi bi-repeat toggled': $store.state.repeatMode==1,'bi bi-repeat-1 toggled': $store.state.repeatMode==2}"
            v-on:click="this.$store.dispatch('toggleRepeatMode')">
        </button>
      </div>
      <div class="player-slider">
        <span class="song-time h5"> {{ numberToTimeString(this.currentTime) }}</span>
        <input class="song-slider" ref="slider" type="range" min=0 :max="this.$refs.audio.duration" step=0.1 v-model="currentTime" @change="seek()">
        <span class="song-time h5"> {{ numberToTimeString(this.$refs.audio.duration) }}</span>
      </div>
      <div class="row gap-20">
        <div class="popup-wrapper">
          <div class="player-menu">
            <button class="button button-round small" v-bind:class="{ 'bi-volume-up-fill': volume>=0.5,'bi-volume-down-fill': volume>0 && volume<0.5,'bi-volume-mute-fill': volume==0}"
              v-on:click="this.showVolume=!this.showVolume">
            </button>
          </div>
          <panel class="popup volume-popup" v-bind:class="this.showVolume?'visible':'hidden'">
            <template v-slot:content><input v-model="volume" type="range" min=0 max=1 step=0.01 orient="vertical" /> </template>
          </panel>
        </div>
        <song ref="song" style="width:320px;" :id = "this.currentSongID" :key = "this.currentSongID"/>
        <div class="popup-wrapper">
          <div class="player-menu">
            <button class="button button-round small bi bi-suit-heart-fill"
              v-bind:class="{'toggled':this.liked}"
              @click="likeCurrentSong">
            </button>
            <button class="button button-round small bi bi-music-note-list"
              v-bind:class="{'toggled':this.showCurrentPlaylist}"
              v-on:click="this.showCurrentPlaylist=!this.showCurrentPlaylist">
            </button>
          </div>
          <panel class="popup current-playlist-popup" v-bind:class="this.showCurrentPlaylist?'visible':'hidden'">
            <template v-slot:header>Current playlist</template>
            <template v-slot:menu>
              <button class="button button-secondary h5"
                v-on:click="this.$store.dispatch('clearCurrentPlaylist')">
                Clear
              </button>
              <button class="button button-round h4 bi bi-x-lg"
                v-on:click="this.showCurrentPlaylist=!this.showCurrentPlaylist">
              </button>
            </template>
            <template v-slot:content>
              <songContainer class="ul-list hidden-scroll"
                :playlist="this.$store.state.currentPlaylist" :key="[this.$store.state.currentPlaylist.id,this.$store.state.currentPlaylist.edited].toString()"/>
            </template>
          </panel>
        </div>
      </div>
    </div>
    <div style="background-color:var(--panel-background-color);width:100%;"></div>
  </div>
</template>

<script>

import panel from "@/components/containers/panel.vue"
import songContainer from "@/components/songContainer.vue"
import song from "@/components/songs/song.vue"
import songSkeleton from "./songs/skeletons/song Skeleton.vue"

import { numberToTimeString } from "@/functions.js"

import API from "@/axios/API"

export default
{
  name: 'player',
  components:
  {
    panel,songContainer,song,songSkeleton
  },
  data()
  {
    return {
      currentSongID: null,
      currentTime:0,
      showCurrentPlaylist:false,
      showVolume:false
    }
  },
  async mounted()
  {
    this.currentSongID = this.$store.getters.getCurrentSong;
    if (this.currentSongID!=null)
    {

      this.$refs.audio.src = API.defaults.baseURL+`songs/`+this.currentSongID+`/audio`;
    }
  },
  computed:
  {
    liked(){ return this.$store.getters.getSong(this.currentSongID).liked; },
    volume:
    {
      get () { return this.$store.state.volume; },
      set (value) { this.$store.commit('setVolume', value); }
    }
  },
  watch:
  {
    '$store.getters.getCurrentPlaylistSongPos'(newPlaylistSong,oldPlaylistSong)
    {

      if (newPlaylistSong.edited && oldPlaylistSong && (newPlaylistSong.edited != oldPlaylistSong.edited) ) return;
      this.currentSongID = this.$store.getters.getCurrentSong;
      if (this.currentSongID!=null)
      {
        this.$refs.audio.src = API.defaults.baseURL+`songs/`+this.currentSongID+`/audio`;
      }
    },
    '$store.state.isPlaying'(playing)
    {
      if (playing) this.$refs.audio.play();
      else this.$refs.audio.pause();
    }
  },
  methods:
  {
    seek()
    {
      this.$refs.audio.currentTime=this.$refs.slider.value;
      this.$store.state.isPlaying=true;
    },
    likeCurrentSong()
    {
      this.$refs.song.like();
    },
    numberToTimeString:numberToTimeString
  }
}

</script>

<style scoped>

.popup-wrapper
{
  position:relative;
  display:flex;
  justify-content: center;
}

.popup
{
  position:absolute;
  top:0px;
  transition:transform 0.35s cubic-bezier(0,0,0,1.2),opacity 0.1s ease;
  max-height: calc(100vh - 140px);
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
}

.visible
{
  opacity:1.0;
  transform:translateY(-100%) translateY(-12px);
}

.hidden
{
  opacity:0.0;
}

.volume-popup
{
  z-index:-1;
}

.current-playlist-popup
{
  width:480px;
  height:640px;
  right:-10px;
  z-index:-2;
}

.player-wrapper
{
  width:100%;
  display:flex;
}

.player
{
  display:flex;
  max-width:1240px;
  width:100%;
  flex-shrink: 0;
  gap:40px;
  position:relative;
  padding: 3px 10px 3px 10px;
  box-sizing: border-box;
  background-color:var(--panel-background-color);
}

.player-menu
{
  display:flex;
  align-items: center;
  gap:20px;
  height:100%;
}

.song-time
{
  display:inline-flex;
  color: var(--text-color-primary);
  width:60px;
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