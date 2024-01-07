
<template>
<div class = "song card" v-bind:class="{'active': current}">
    <div class = "cover-wrapper s180x180" >
        <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
        <div class = "cover bi bi-music-note" v-else/>
        <div class = "shade"></div>
        <div class="cover-menu">
            <button class="button button-round filled huge" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
        </div>
        <div class="cover-menu song-options">
            <button class="button button-round tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
            <button class="button button-round tiny bi bi-three-dots" v-on:click.stop="openDropdown($event)"></button>
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