
<template>
<div class = "song card" v-bind:class="{'active': current}">
    <div class = "cover-wrapper s180x180" >
        <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
        <div class = "cover bi bi-music-note" v-else/>
        <div class = "shade"></div>
        <div class="cover-menu">
            <button class="round-button filled huge" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
        </div>
        <div class="cover-menu song-options">
            <button class="round-button tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
            <button class="round-button tiny bi bi-three-dots"></button>
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
    </div>
</div>
</template>
<script>

import song from "@/components/songs/song.vue"
import store from '@/store';

export default
{
  name: 'songExtended',
  extends: song,
  async setup(props)
  {
    await store.dispatch('loadSong',props.id);
  },
}

</script>

<style>

.card .cover-wrapper:hover .shade
{
    opacity:0.5;
}

.card .cover-wrapper:hover .cover-menu
{
    opacity:1.0;
}

</style>