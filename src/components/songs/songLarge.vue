
<template>
    <div class="row">
        <div class = "cover-wrapper s128x128" >
            <img class = "cover" v-if="imageAvailable" :src="`http://192.168.100.7:5000/api/songs/`+this.id+`/cover`" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
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