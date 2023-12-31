<template>
<div class = "song item" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
  <div class = "cover-wrapper s36x36">
    <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
    <div class = "cover bi bi-music-note" v-else/>
    <div class = "shade"></div>
    <div class="cover-menu">
      <button class="round-button filled small" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
    </div>
    <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
      <div class ="wave"></div>
      <div class ="wave"></div>
      <div class ="wave"></div>
    </div>
  </div>
  <div class= "info-wrapper">
    <div class ="h5 secondary-text text-overflow">
      <template v-for="(artist,index) in this.song.artists">
        <router-link class="artistlink" v-if="artist.login" :to="'/id/'+artist.login" @click.stop>{{artist.name}}</router-link>
        <span v-else>{{artist.name}}</span>
        <span v-if="index+1 < this.song.artists.length">, </span>
      </template>
    </div>
    <span class ="h4 primary-text text-overflow">{{this.song.name}}</span>
  </div>
  <div class="songMenu">
    <button class="round-button tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
    <button id = "deleteSongButton" class="round-button tiny bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
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
    },
    addToCurrentPlaylistEnd()
    {
      this.$store.dispatch('addSongToCurrentPlaylistEnd',this.id);
    },
    addToCurrentPlaylistNext()
    {
      this.$store.dispatch('addSongToCurrentPlaylistNext',this.id);
    }
  }
}

</script>

<style>

.song.item
{
  display:flex;
  width:100%;
  gap:5px;
  border-radius:10px;
  padding:3px;
  box-sizing: border-box;
  align-items: center;
}

.wrapper-wave
{
  display:flex;
  width: 60%;
  height:60%;
  flex-shrink: 0;
  justify-content: space-between;
  align-items:flex-end;
  margin-top:auto;
  margin-bottom:auto;
  position: relative;
}

.song .wrapper-wave
{
  visibility:hidden;
}

.song.active:not(:hover) .wrapper-wave
{
  visibility:visible;
}

.song-container .song.item:hover,
.song-container .song.item.active
{
  background-color:var(--selected-item-background-color);
}

.song-container .song:hover .shade,
.song-container .song.active .shade
{
  opacity:0.5;
}

.song-container .song:hover .cover-menu,
.song-container .song.card.active .cover-menu
{
  opacity:1.0;
}

div:not(.song-container) > .song .cover-menu
{
  display:none;
}

.artistlink
{
  text-decoration: none;
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
  margin: auto;
  text-align: center;
  color: var(--text-color-secondary);
}

.song-container .song .song-duration
{
  display:inline;
}

.song:hover .song-duration
{
  display:none;
}

.song-container .song:hover .songMenu
{
  display:flex;
}

.songMenu .round-button
{
  color: var(--text-color-secondary);
}

.songMenu .round-button:not(.toggled):hover
{
  color: var(--text-color-primary);
}

.song.active #deleteSongButton
{
  display:none;
}

.cover-menu
{
  position:absolute;
  opacity:0.0;
  transition: 0.2s all;
  color:var(--soft-white);
  display:flex;
  padding:10px;
  gap:20px;
  box-sizing: border-box;
}



.cover-menu.playlist-stats
{
  bottom:0px;
}

.cover-menu.song-options
{
  gap:10px;
  bottom:0px;
  right:0px;
}

.song.item .cover-menu
{
    transition:none;
}

.cover-menu > .round-button.filled
{
  background-color:var(--soft-black);
}

.cover-menu > .round-button
{
    color:var(--soft-white);
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