
<template>
    <div class = "song" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
        <div class = "cover-wrapper s52x52">
            <img class = "cover" v-if="imageAvailable" :src="`http://192.168.100.7:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
            <div class = "shade"></div>
            <button class="round-button medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div class ="wave"></div>
                <div class ="wave"></div>
                <div class ="wave"></div>
            </div>
        </div>
        <div class= "song-info-wrapper">
            <div class ="song-info h5">
                <div v-for="(artist,index) in this.song.artists">
                    <router-link class="artistlink secondary-text hoverable" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span class="secondary-text" v-else>{{artist.name}}</span>
                    <span class="secondary-text" v-if="index+1 < this.song.artists.length">, </span>
                </div>
            </div>
            <span class ="song-info primary-text h4">{{this.song.name}}</span>
            <router-link class="icon-text secondary-text hoverable h6" :to="'/song/'+this.id" @click.stop>
                <span class="bi bi-suit-heart-fill"></span>
                <span>{{abbreviateNumber(this.song.likes_count)}}</span>
            </router-link>
        </div>
        <div class="songMenu">
            <button class="round-button tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
            <button id = "deleteSongButton" class="round-button tiny bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration h5" style="float:right;">{{ numberToTimeString(this.song.duration) }}</div>
    </div>
  </template>
<script>

import song from "@/components/songs/song.vue"

export default
{
  name: 'songExtended',
  extends: song
}

</script>

<style>

</style>