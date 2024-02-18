<template>
<Transition name="fade">
    <div class="playlist playlist-expansible" v-bind:class="{'expanded': this.expanded}" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="column gap-0">
            <div class="left-column">
                <div class="cover-wrapper s160x160" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
                    <img class="cover" :src="coversrc" v-if="this.playlist.cover"/>
                    <div class="cover bi bi-music-note-list" v-else></div>
                </div>
                <button class="button button-secondary" style="width:90px;" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
                    <div class="icon-text">
                        <span class="bi bi-suit-heart-fill"></span><span>Like{{ this.playlist.liked?'d':'' }}</span>
                    </div>
                </button>
            </div>
            <div class="empty-column-panel">
                <div class="empty-column-main"></div>
            </div>
        </div>
        <div class="right-column">
            <div class="row gap-10 w-100 y-center">
                <button class="button button-default button-round button-medium toggled" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click.stop="playPlaylist()"></button>
                <div class="info-wrapper">
                    <div class="secondary-text font-size-medium">
                        <template v-for="(artist,index) in this.playlist.artists">
                            <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
                            <span v-else>{{artist.name}}</span>
                            <span v-if="index+1 < this.playlist.artists.length">, </span>
                        </template>
                    </div>
                    <span class="primary-text hoverable font-size-big" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
                </div>
            </div>
            <hr>
            <songContainer :type="'ul-list scroll'" :dynamicComponent="'songItem'" :playlist="this.playlist.songList"></songContainer>
            <button class="button button-secondary" style="width:90px;" v-on:click="this.expanded=!this.expanded" v-if="this.playlist.songList.songs?.length>4">{{this.expanded?"Hide":"Expand"}}</button>
        </div>
    </div>
    <playlistExpansibleSkeleton v-else></playlistExpansibleSkeleton>
</Transition>
</template>

<script>

import playlistInterface from "@/components/interfaces/playlistInterface.vue";

import playlistExpansibleSkeleton from "@/components/playlists/skeletons/playlistExpansible Skeleton.vue";
import songContainer from "@/components/containers/songContainer.vue"

export default
{
  name: 'playlistExpansible',
  components: { playlistExpansibleSkeleton,songContainer },
  extends: playlistInterface,
  data()
  {
    return {
        expanded:false
    }
  }
}

</script>