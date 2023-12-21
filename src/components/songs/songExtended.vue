
<template>
    <div class = "song item" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
        <div class = "cover-wrapper s52x52">
            <img class = "cover" v-if="imageAvailable" :src="`http://192.168.100.7:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
            <div class = "shade"></div>
            <div class="cover-menu">
                <button class="round-button filled medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
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
                    <router-link class="artistlink" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.song.artists.length">, </span>
                </template>
            </div>
            <span class ="h4 primary-text text-overflow">{{this.song.name}}</span>
            <div class="row">
            <router-link class="icon-text secondary-text hoverable h6" :to="'/song/'+this.id" @click.stop>
                <span class="bi bi-suit-heart-fill"></span>
                <span>{{abbreviateNumber(this.song.likes_count)}}</span>
            </router-link>
            <router-link class="icon-text secondary-text hoverable h6" :to="'/song/'+this.id" @click.stop>
                <span class="bi bi-music-note-list"></span>
                <span>Play next</span>
            </router-link>
            </div>
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