<template>
    <div class = "playlist card">
        <div class="cover-wrapper s128x128" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
            <img class = "cover" v-if="imageAvailable" :src="this.coversrc" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note-list" v-else/>
            <div class = "shade"></div>
            <div class="cover-menu">
                <button class="button button-round large" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
            </div>
            <div class="cover-menu playlist-stats h5">
                <span class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songList.songs?.length)}}</span>
                </span>
                <span class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
        </div>
        <div class= "info-wrapper column gap-0">
            <div class ="h5 secondary-text">
                <template v-for="(artist,index) in this.playlist.artists">
                    <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </template>
            </div>
            <span class ="h4 primary-text hoverable" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
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