<template>
<div class = "song item" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
  <div class = "cover-wrapper s36x36">
    <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
    <div class = "cover bi bi-music-note" v-else/>
    <div class = "shade"></div>
    <div class="cover-menu">
      <button class="button button-round filled small" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
    </div>
    <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
      <div class ="wave"></div>
      <div class ="wave"></div>
      <div class ="wave"></div>
    </div>
  </div>
  <div class= "info-wrapper column gap-0">
    <div class ="h5 secondary-text">
      <template v-for="(artist,index) in this.song.artists">
        <router-link :to="{ name: 'User', params: { login: artist.login }}" @click.stop class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
        <span v-else>{{artist.name}}</span>
        <span v-if="index+1 < this.song.artists.length">, </span>
      </template>
    </div>
    <router-link :to="{ name: 'Song', params: { id: this.id }}" @click.stop class ="h4 primary-text hoverable">{{this.song.name}}</router-link>
  </div>
  <div class="songMenu">
    <button id = "dropdownButton" class="button button-secondary bi bi-three-dots tiny" v-on:click.stop="openDropdown($event)"></button>
    <button class="button button-round tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
    <button id = "deleteSongButton" class="button button-round tiny bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
  </div>
  <div class = "song-duration h5">{{ numberToTimeString(this.song.duration) }}</div>
</div>
</template>

<script>

import API from '@/axios/API';
import { numberToTimeString,abbreviateNumber } from "@/functions.js"

export default
{
  name: 'song',
  props:
  {
    id: { default: "noid"},
    pos: { type: Number, default: -1}
  },
  data()
  {
    return {
      coversrc: API.defaults.baseURL+`songs/`+this.id+`/cover`,
      imageAvailable:true
    }
  },
  computed:
  {
    song(){ return this.$store.getters.getSong(this.id) },
    current()
    {
        return this.id == this.$store.getters.getCurrentSong && this.pos!=-1;
        // this.pos == this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].pos
        // parent?
    },
    isPlaying()
    {
      return this.current?this.$store.state.isPlaying:false;
    }
  },
  methods:
  {
    numberToTimeString:numberToTimeString,
    abbreviateNumber:abbreviateNumber,
    setCurrentSong()
    {
        if (!this.current) this.$emit('setCurrentSong');
        else this.$store.dispatch('togglePlayingState');
    },
    openDropdown(event)
    {
      this.$emit('openSongDropdown',event,{id:this.id,pos:this.pos});
    },
    async like()
    {
      if (!this.song.liked)
      {
        const response = await API.post("songs/"+this.id+"/action/like/post");
        if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
        else
        {
          this.song.likes_count++;
          this.song.liked=true;
        }
      }
      else
      {
        const response = await API.post("songs/"+this.id+"/action/like/delete");
        if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
        else
        {
          this.song.likes_count--;
          this.song.liked=false;
        }
      }
    }
  }
}

</script>

<style>

.wrapper-wave
{
  display:flex;
  width: 60%;
  height:60%;
  justify-content: space-between;
  align-items:flex-end;
  position: relative;
}

.song .wrapper-wave
{
  visibility:hidden;
}

.song.active:not(.active2):not(:hover) .wrapper-wave
{
  visibility:visible;
}

.artistlink
{
  color:inherit;
}

.artistlink:hover
{
  text-decoration: underline;
}

.songMenu
{
  display:none;
  gap:10px;
  padding-right:10px;
  align-items: center;
}

.song-duration
{
  display:none;
  text-align: center;
  color: var(--text-color-secondary);
}

.song-container .song .song-duration
{
  display:inline;
}

.song:hover .song-duration,
.song.active2 .song-duration
{
  display:none;
}

.song-container .song:hover .songMenu,
.song-container .song.active2 .songMenu
{
  display:flex;
}

.songMenu .button-round:not(.toggled)
{
  color: var(--text-color-secondary);
}

.songMenu .button-round:not(.toggled):hover
{
  color: var(--text-color-primary);
}

.song.active #deleteSongButton
{
  display:none;
}

.wave
{
  width:20%;
  height:20%;
  border-radius: 50vh;
  background:var(--accent-color);
}

.wrapper-wave.playing .wave
{
  animation: wave 0.6s linear infinite;
}

.wrapper-wave.playing .wave:nth-child(2)
{
  animation-delay: -0.2s;
}

.wrapper-wave.playing .wave:nth-child(3)
{
  animation-delay: -0.4s;
}

@keyframes wave
{
  0%   {height:50%;}
  50%  {height:100%;}
  100% {height:50%;}
}

</style>