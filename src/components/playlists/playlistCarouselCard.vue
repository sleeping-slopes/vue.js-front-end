<template>
<Transition name="fade">
    <div class="playlist card" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="cover-wrapper s128x128" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
            <img class="cover" :src="coversrc" v-if="this.playlist.cover"/>
            <div class="cover bi bi-music-note-list" v-else></div>
            <div class="shade"></div>
            <div class="cover-menu">
                <button class="button button-default button-large" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
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
        <div class="info-wrapper">
            <div class="h5 secondary-text">
                <template v-for="(artist,index) in this.playlist.artists">
                    <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </template>
            </div>
            <span class="h4 primary-text hoverable" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
        </div>
    </div>
    <playlistCarouselCardSkeleton v-else></playlistCarouselCardSkeleton>
</Transition>
</template>

<script>

import playlistInterface from "@/components/interfaces/playlistInterface.vue";

import playlistCarouselCardSkeleton from "@/components/playlists/skeletons/playlistCarouselCard Skeleton.vue";

export default
{
  name: 'playlistCarouselCard',
  extends: playlistInterface,
  components: { playlistCarouselCardSkeleton }
}

</script>