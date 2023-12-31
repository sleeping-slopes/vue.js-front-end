
<template>
    <div class = "song item" v-on:click="setCurrentSong" v-bind:class="{'active': current}">
        <div class = "cover-wrapper s52x52">
            <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
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
                <span class="icon-text secondary-text h6">
                    <span class="bi bi-play-fill"></span>
                    <span>{{abbreviateNumber(53252)}}</span>
                </span>
                <router-link class="icon-text secondary-text hoverable h6" :to="'/song/'+this.id" @click.stop>
                    <span class="bi bi-suit-heart-fill"></span>
                    <span>{{abbreviateNumber(this.song.likes_count)}}</span>
                </router-link>
            </div>
        </div>
        <div class="songMenu">
            <dropdown>
                <template v-slot:label class="bi bi-suit-heart-fill">
                    <button class="button-secondary bi bi-three-dots tiny" style="height:auto;padding:5px;"></button>
                    </template>
                <template v-slot:dropdown>
                    <button class="icon-text hoverable h5" v-on:click.stop="this.addToCurrentPlaylistNext()">
                        <span class="bi bi-music-note-list"></span>
                        <span>Play next</span>
                    </button>
                    <button class="icon-text hoverable h5" v-on:click.stop="this.addToCurrentPlaylistEnd()">
                        <span class="bi bi-music-note-list"></span>
                        <span>Add to current playlist</span>
                    </button>
                    <button class="icon-text hoverable h5" v-on:click.stop="this.addToCurrentPlaylistEnd()">
                        <span class="bi bi-link"></span>
                        <span>Copy link</span>
                    </button>
                </template>
            </dropdown>
            <button class="round-button tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
            <button id = "deleteSongButton" class="round-button tiny bi bi-x-lg" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration h5">{{ numberToTimeString(this.song.duration) }}</div>
    </div>
  </template>
<script>

import song from "@/components/songs/song.vue"
import dropdown from "../containers/dropdown.vue";

export default
{
  name: 'songExtended',
  extends: song,
  components: { dropdown }
}

</script>