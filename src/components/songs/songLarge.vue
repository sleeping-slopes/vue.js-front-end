
<template>
    <div class="row">
        <div class = "cover-wrapper s128x128" >
            <img class = "cover" v-if="imageAvailable" :src="`http://localhost:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
        <div class="column">
            <div class ="h3" style="width:100%;white-space: nowrap; display:flex;">
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
            <h2 class ="primary-text">{{this.song.name}}</h2>
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

<style>

</style>