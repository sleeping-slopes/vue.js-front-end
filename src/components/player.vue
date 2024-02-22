<template>
  <audio ref="audio"
    @timeupdate="this.currentTime = $event.target.currentTime"
    @ended="this.$store.dispatch('playNextSong')"
    :volume="this.$store.state.volume"
    preload="none">
  </audio>
  <div class="player" v-if="this.currentSongID!=null">
    <div class="player-menu">
      <button class="button button-default button-small bi bi-skip-start-fill"
        v-on:click="this.$store.dispatch('shiftCurrentSong',-1)">
      </button>
      <button class="button button-default button-small"
        v-bind:class="this.$store.state.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'"
        v-on:click="this.$store.dispatch('togglePlayingState');">
      </button>
      <button class="button button-default button-small bi bi-skip-end-fill"
        v-on:click="this.$store.dispatch('shiftCurrentSong',1)">
      </button>
      <button class="button button-default button-small bi bi-shuffle"
        v-bind:class="{'toggled':this.$store.state.shuffle}"
        v-on:click = "this.$store.dispatch('shuffle')">
      </button>
      <button class="button button-default button-small" v-bind:class="{ 'bi bi-repeat': this.$store.state.repeatMode==0, 'bi bi-repeat toggled': this.$store.state.repeatMode==1,'bi bi-repeat-1 toggled': this.$store.state.repeatMode==2}"
          v-on:click="this.$store.dispatch('toggleRepeatMode')">
      </button>
    </div>
    <div class="player-slider">
      <span class="song-time font-size-small"> {{ numberToTimeString(this.currentTime) }}</span>
      <slider style="width:100%"
        :min-value="0"
        :value="currentTime"
        :max-value="this.$refs.audio.duration || this.$store.getters.getSong(this.currentSongID).duration"
        @changeProgress="setProgress">
      </slider>
      <span class="song-time font-size-small"> {{ numberToTimeString(this.$refs.audio.duration || this.$store.getters.getSong(this.currentSongID).duration) }}</span>
    </div>
    <div class="row gap-20">
      <div class="popup-wrapper">
        <div class="player-menu">
          <button class="button button-default button-small" v-bind:class="{ 'bi bi-volume-up-fill': this.$store.state.volume>=0.5,'bi bi-volume-down-fill': this.$store.state.volume>0 && this.$store.state.volume<0.5,'bi bi-volume-mute-fill': this.$store.state.volume==0,'toggled':this.showVolume }"
            v-on:click="this.showVolume=!this.showVolume">
          </button>
        </div>
        <panel class="popup volume-popup" v-bind:class="this.showVolume?'visible':'hidden'" style="padding-bottom:10px;padding-top:10px;">
          <template v-slot:content>
            <slider style="height:100px;"
              :vertical="true"
              :min-value="0"
              :value="this.$store.state.volume"
              :max-value="1"
              @changeProgress="setVolume">
            </slider>
          </template>
        </panel>
      </div>
      <div style="width:320px;position:relative;">
        <songItem ref="song" :id = "this.currentSongID" :key = "this.currentSongID"></songItem>
      </div>
      <div class="popup-wrapper">
        <div class="player-menu">
          <button class="button button-default button-small bi bi-suit-heart-fill"
            v-bind:class="{'toggled':this.liked}"
            @click="likeCurrentSong">
          </button>
          <button class="button button-default button-small bi bi-music-note-list"
            v-bind:class="{'toggled':this.showCurrentPlaylist}"
            v-on:click="this.showCurrentPlaylist=!this.showCurrentPlaylist">
          </button>
        </div>
        <panel class="popup current-playlist-popup" v-bind:class="this.showCurrentPlaylist?'visible':'hidden'">
          <template v-slot:header>Current playlist</template>
          <template v-slot:menu>
            <button class="button button-secondary"
              v-on:click="this.$store.dispatch('clearCurrentPlaylist')">
              Clear
            </button>
            <button class="button button-default button-small bi bi-x-lg"
              v-on:click="this.showCurrentPlaylist=!this.showCurrentPlaylist">
            </button>
          </template>
          <template v-slot:content>
            <songContainer :type="'ul-list scroll-hidden'" :playlist="this.$store.state.currentPlaylist"
              :key="[this.$store.state.currentPlaylist.id,this.$store.state.currentPlaylist.edited].toString()">
            </songContainer>
          </template>
        </panel>
      </div>
    </div>
  </div>
</template>

<script>

import API from "@/axios/API"

import panel from "@/components/containers/panel.vue"
import slider from "@/components/slider.vue"
import songContainer from "@/components/containers/songContainer.vue"
import songItem from "@/components/songs/songItem.vue"

import { numberToTimeString } from "@/functions.js"

export default
{
  name: 'player',
  components: { panel, slider, songContainer, songItem },
  data()
  {
    return {
      currentSongID: null,
      currentTime:0,
      showCurrentPlaylist:false,
      showVolume:false
    }
  },
  computed:
  {
    liked(){ return this.$store.getters.getSong(this.currentSongID).liked; },
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
    setProgress(value)
    {
      this.$refs.audio.currentTime=value;
      this.$store.state.isPlaying=true;
    },
    setVolume(value)
    {
      this.$store.commit('setVolume', value);
    },
    likeCurrentSong()
    {
      this.$refs.song.like();
    },
    numberToTimeString:numberToTimeString
  },
  async mounted()
  {
    this.currentSongID = this.$store.getters.getCurrentSong;
    if (this.currentSongID!=null)
    {
      this.$refs.audio.src = API.defaults.baseURL+`songs/`+this.currentSongID+`/audio`;
    }
  },
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

.popup.visible
{
  opacity:1.0;
  transform:translateY(-100%) translateY(-12px);
}

.popup.hidden
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


.player-slider
{
  min-width:250px;
  display:flex;
  width:100%;
  align-items:center;
}

</style>