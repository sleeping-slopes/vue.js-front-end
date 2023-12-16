<template>
    <div class = "playlist card">
        <div class="cover-wrapper s128x128" v-on:click="$router.push($route.path+'/playlist/'+this.id)">
            <img class = "cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note-list" v-else/>
            <div class = "shade"></div>
            <div class="playlist-hover playlist-stats h5">
                <span class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs_count)}}</span>
                </span>
                <span class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
            <button class="playlist-hover round-button large" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
        </div>
        <div class= "song-info-wrapper">
            <div class ="song-info h5">
                <div v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink secondary-text" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span class="secondary-text" v-else>{{artist.name}}</span>
                    <span class="secondary-text" v-if="index+1 < this.playlist.artists.length">, </span>
                </div>
            </div>
            <span class ="song-info primary-text h4" v-on:click="$router.push($route.path+'/playlist/'+this.id)">{{this.playlist.name}}</span>
        </div>
    </div>
</template>

<script>

import playlistCard from "@/components/playlists/playlistCard.vue"

export default
{
  name: 'playlistCarouselCard',
  extends: playlistCard
}
</script>

<style>

</style>