<template>
    <div class = "song" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
        <div class = "cover-wrapper s36x36">
            <img class = "cover" v-if="imageAvailable" :src="`http://localhost:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
            <div class = "shade"></div>
            <button class="round-button small" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div class ="wave"></div>
                <div class ="wave"></div>
                <div class ="wave"></div>
            </div>
        </div>
        <div class= "song-info-wrapper">
            <div class ="song-info h5">
                <div v-for="(artist,index) in this.song.artists">
                    <router-link class="artistlink secondary-text" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span class="secondary-text" v-else>{{artist.name}}</span>
                    <span class="secondary-text" v-if="index+1 < this.song.artists.length">, </span>
                </div>
            </div>
            <span class ="song-info primary-text h4">{{this.song.name}}</span>
        </div>
        <div class="songMenu">
            <button class="songButton bi bi-suit-heart-fill" v-bind:style="this.song.liked?{'color':'var(--accent-color)'}:{}" v-on:click.stop="this.like()"></button>
            <button id = "deleteSongButton" class="songButton bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration h5" style="float:right;">{{ numberToTimeString(this.song.duration) }}</div>
    </div>
  </template>

<script>

import { getSong } from "@/axios/getters.js"
import { numberToTimeString,abbreviateNumber } from "@/functions.js"
import { postLikeSong } from "@/axios/getters"
import { deleteLikeSong } from "@/axios/getters"

export default
{
  name: 'song',
  props:
  {
    id: { type: Number, default: 0},
    pos: { type: Number, default: 0},
    index: { type: Number, default:0},
  },
  data()
  {
    return {
        song:{},
        imageAvailable:true,
    }
  },
  async mounted()
  {
    this.song = await getSong(this.id);
  },
  computed:
  {
    current()
    {
        return this.$parent.current &&
        this.pos === this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].pos
        // && this.id === this.$store.state.currentPlaylist.songs[this.$store.state.currentSongIndex].id;
    },
    isPlaying()
    {
        if (this.current) return this.$store.state.isPlaying;
        return false;
    }
  },
  methods:
  {
    numberToTimeString:numberToTimeString,
    abbreviateNumber:abbreviateNumber,
    setCurrentSong()
    {
        if (!this.current)
            this.$emit('setCurrentSong');
        else
            this.$store.dispatch('togglePlayingState');
    },
    async like()
    {
        this.song.liked=!this.song.liked;
        if (this.song.liked)
        {
          await postLikeSong(this.id);
          this.song.likes_count++;
        }
        else
        {
          await deleteLikeSong(this.id);
          this.song.likes_count--;
        }
    }
  }
}

</script>

<style>

.song
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

.ul-list .song:hover .shade,
.ul-grid .cover-wrapper:hover .shade,
.playlist-header .cover-wrapper:hover .shade,
.song.active .shade
{
    opacity:0.5;
}

.song .wrapper-wave,
.song.active:hover .wrapper-wave
{
    visibility:hidden;
}

.song.active .wrapper-wave
{
    visibility:visible;
}

.ul-list .song:hover
{
    background-color:var(--selected-item-background-color);
}

.ul-list .song.active
{
    background-color: var(--selected-item-background-color);
}

.song .round-button
{
    position:absolute;
    visibility: hidden;
    background-color: var(--soft-black);
    color: var(--soft-white);
}

.song-container .song:hover .round-button,
.song-container .song.card.active .round-button
{
    visibility: visible;
}

.song-info-wrapper
{
    width:100%;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
    overflow:hidden;
}

.song-info
{
    display: flex;
    align-items:center;
    width:100%;
    white-space: nowrap;
    overflow:hidden;
}

.artistlink
{
    text-decoration: none;
    overflow:hidden;
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
    height:100%;
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

.songButton
{
    display:flex;
    background:none;
    border:none;
    color: var(--text-color-secondary);
    cursor:pointer;
    padding:3px;
    margin:0px;
    transition:0.2s;
    font-size:16px;
}

.songButton:hover
{
    color: var(--text-color-primary);
}

.song.active #deleteSongButton
{
    display:none;
}


</style>