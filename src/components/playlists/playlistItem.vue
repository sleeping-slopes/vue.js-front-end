<template>
<Transition name="skeletonFade">
    <div class="playlist item" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="cover-wrapper s52x52" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
            <img class="cover" :src="this.playlist.coversrc" v-if="this.playlist.cover"/>
            <div class="cover bi bi-music-note-list" v-else></div>
            <div class="shade"></div>
            <div class="cover-menu">
                <button class="button button-default button-round button-medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click.stop="playPlaylist()"></button>
            </div>
        </div>
        <div class="info-wrapper">
            <div class="secondary-text font-size-small">
                <template v-for="(artist,index) in this.playlist.artists">
                    <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </template>
            </div>
            <span class="primary-text hoverable font-size-medium" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
            <div class="row">
                <span class="icon-text secondary-text font-size-tiny">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songList.songs?.length)}}</span>
                </span>
                <span class="icon-text secondary-text font-size-tiny">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
        </div>
    </div>
    <playlistItemSkeleton v-else></playlistItemSkeleton>
</Transition>
</template>

<script>

import playlistInterface from "@/components/interfaces/playlistInterface.vue";

import playlistItemSkeleton from "@/components/playlists/skeletons/playlistItem Skeleton.vue";

export default
{
  name: 'playlistItem',
  extends: playlistInterface,
  components: { playlistItemSkeleton }
}

</script>

