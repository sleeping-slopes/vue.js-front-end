<template>
    <div class = "playlist card">
        <div class="cover-wrapper s128x128" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
            <img class = "cover" v-if="imageAvailable" :src="this.coversrc" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note-list" v-else/>
            <div class = "shade"></div>
            <div class="cover-menu">
                <button class="round-button large" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
            </div>
            <div class="cover-menu playlist-stats h5">
                <span class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs.length)}}</span>
                </span>
                <span class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
        </div>
        <div class= "info-wrapper">
            <div class ="h5 secondary-text text-overflow">
                <template v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </template>
            </div>
            <span class ="h4 primary-text text-overflow" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
        </div>
    </div>
</template>

<script>

import playlistCard from "@/components/playlists/playlistCard.vue"


export default
{
  name: 'playlistCarouselCard',
  extends: playlistCard,
}

</script>

<style scoped>

.playlist-carousel .playlist.card
{
    width:128px;
}

</style>