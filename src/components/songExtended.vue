
<template>
    <div class = "song" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
        <div class = "song-cover-wrapper s60x60">
            <img class = "song-cover" v-if="imageAvailable" :src="`http://localhost:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "song-cover bi bi-music-note" v-else/>
            <div class = "song-cover-shade"></div>
            <button class="round-button medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div class ="wave"></div>
                <div class ="wave"></div>
                <div class ="wave"></div>
            </div>
        </div>
        <div class= "song-info-wrapper h5">
            <div class ="song-info">
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
            <span class ="icon-text secondary-text h6">
                <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.song.likes_count)}}</span>
            </span>
        </div>
        <div class="songMenu">
            <button class="songButton bi bi-suit-heart-fill" v-bind:style="this.song.liked?{'color':'var(--accent-color)'}:{}" v-on:click.stop="this.like()"></button>
            <button id = "deleteSongButton" class="songButton bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration h5" style="float:right;">{{ numberToTimeString(this.song.duration) }}</div>
    </div>
  </template>
<script>


import { abbreviateNumber, numberToTimeString } from "@/functions.js"

import song  from "./song.vue"

export default
{
  name: 'songExtended',
  extends: song
}

</script>

<style>

</style>