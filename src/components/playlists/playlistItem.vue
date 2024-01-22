<template>
<Transition name="fade">
    <div class = "playlist item" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="cover-wrapper s52x52" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
            <img class = "cover" v-if="imageAvailable" :src="this.coversrc" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note-list" v-else></div>
            <div class = "shade"></div>
            <div class="cover-menu">
                <button class="button button-round filled medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click.stop="playPlaylist()"></button>
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
            <div class="row">
                <span class="icon-text secondary-text h6">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songList.songs?.length)}}</span>
                </span>
                <span class="icon-text secondary-text h6">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
        </div>
    </div>
    <playlistItemSkeleton v-else></playlistItemSkeleton>
</Transition>
</template>

<script>

import playlistInterface from "@/components/playlists/playlist interface.vue"

import playlistItemSkeleton from "@/components/playlists/skeletons/playlistItem Skeleton.vue";

export default
{
  name: 'playlistItem',
  extends: playlistInterface,
  components: { playlistItemSkeleton }
}

</script>

