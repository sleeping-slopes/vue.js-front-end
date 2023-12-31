<template>
    <div class="banner sticky-top">
        <div class="banner-bg gradient-bg-reverse"/>
        <div class = "cover-wrapper s200x200" >
            <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
        <div class="column">
            <div class="row">
                <button class="round-button huge" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
                <div class="banner-info-wrapper">
                    <h3 class="banner-info-secondary">
                        <template v-for="(artist,index) in this.song.artists">
                            <router-link class="artistlink" v-if="artist.login"
                                :to="'/id/'+artist.login"
                                @click.stop>
                                {{artist.name}}
                            </router-link>
                            <span v-else>{{artist.name}}</span>
                            <span v-if="index+1 < this.song.artists.length">, </span>
                        </template>
                    </h3>
                    <h2 class="banner-info-primary">
                        <span>{{ this.song.name }}</span>
                    </h2>
                </div>
            </div>
            <div class="row" style="margin-top:auto">
                <button class="button-secondary h5">Like</button>
                <button class="button-secondary h5">Copy link</button>
                <button class="button-secondary h5">Add to playlist</button>
                <button class="button-secondary h5">Play next</button>
                <button class="button-secondary h5">Download</button>
            </div>
        </div>
    </div>
  </template>
<script>

import song from "@/components/songs/song.vue"

export default
{
  name: 'songLarge',
  extends: song
}

</script>