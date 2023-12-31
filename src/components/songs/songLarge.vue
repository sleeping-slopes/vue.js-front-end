
<template>

    <div class="row">
        <div class = "cover-wrapper s128x128" >
            <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
        <div class="column">
            <div class="info-wrapper">
                <div class ="h3 secondary-text text-overflow">
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
                <h2 class ="primary-text">{{this.song.name}}</h2>
            </div>
            <div class="row" style="height:min-content">    <button class="button-secondary">Like</button>
                <button class="button-secondary">Copy link</button>
                <button class="button-secondary">Add to playlist</button>
                <button class="button-secondary">Play next</button>
                <button class="button-secondary">Download</button>
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