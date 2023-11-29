<template>
  <audio ref="audio"
    @timeupdate="this.currentTime = $event.target.currentTime"
    @ended="this.$store.dispatch('shiftCurrentSong',1)"
    preload="none">
  </audio>
  <div class="player" v-if="this.currentSongID!=undefined">

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
        v-bind:style="this.$store.state.shuffle?{'color':'cornflowerblue'}:{}"
        v-on:click = "this.$store.dispatch('shuffle')">
      </button>
      <button class="round-button small bi bi-repeat">

      </button>
    </div>

    <div class="player-slider">
      <span class="song-time"> {{ secsToMins(this.currentTime) }}</span>
      <input class="song-slider" ref="slider" type="range" min=0 :max="this.$refs.audio.duration" step="0.1" v-model="currentTime" @change="test()">
      <span class="song-time"> {{ secsToMins(this.$refs.audio.duration) }}</span>
    </div>
    <div class="player-menu">
      <button class="round-button small bi bi-volume-up-fill">

      </button>
    </div>
    <div style="float:right;display:flex; gap:10px;">
    <song class="sidebar-width" :id = "this.currentSongID" :key = "this.currentSongID"/>
    <div class="player-menu">
      <button class="round-button small bi bi-heart-fill">

      </button>
      <button class="round-button small bi bi-music-note-list"
        v-on:click="this.show=!this.show">
      </button>
    </div>
  </div>

      <panel class = "sidebar-width" style="position:absolute; height:640px;bottom:100%; right:0px" v-if="this.show">
        <template v-slot:header>Current playlist</template>
        <template v-slot:content>
          <playlist
            :id="this.$store.state.currentPlaylist.id"
            :songs="this.$store.state.currentPlaylist.songs"
          />
        </template>
      </panel>

  </div>
</template>

<script>

import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"
import song from "@/components/song.vue"

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
    secsToMins(sec)
    {
      return String(Math.floor(sec/60)).padStart(2,'0')+":"+String(Math.floor(sec)%60).padStart(2,'0');
    },
    test()
    {
      this.$refs.audio.currentTime=this.$refs.slider.value;
    }
  }
}

</script>

<style>

.player
{
    display:flex;
    width:100%;
    gap:40px;
    position:relative;

    padding-left:10px;
    padding-right:10px;
    box-sizing: border-box;
}

.player-menu
{
  display:flex;
  align-items: center;
  gap:20px;
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
  width:100%;
}

.player-slider
{
  display:flex;
  width:100%;
}

</style>