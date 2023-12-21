<template>
    <div class = "playlist-expansible" v-bind:class="{'expanded': this.expanded}">
        <div style="display:flex;flex-direction: column;">
            <div class="left-column">
                <div class="cover-wrapper s160x160" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
                    <img class = "cover" v-if="imageAvailable" :src="`http://192.168.100.7:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
                    <div class = "cover bi bi-music-note-list" v-else/>
                </div>
                <button class="button-secondary h6" style="margin:auto" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
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
            <div style="display:flex;flex-direction: row; gap:10px; align-items: center;">
                <button class="round-button medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click.stop="playPlaylist()"></button>
                <div class= "info-wrapper">
                    <div class ="h4 secondary-text text-overflow">
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
                    <span class ="h3 primary-text text-overflow" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
                </div>
            </div>
            <hr>
            <playlist class="ul-list" style="overflow-y:auto"
            :id="this.id"
            :songs="this.songs"
            :dynamicComponent="'song'"/>
            <div v-if="this.songs.length>4">
                <button class="button-secondary h6" style="margin:auto" v-on:click="this.expanded=!this.expanded">{{this.expanded?"Hide":"Expand"}}</button>
            </div>
        </div>
    </div>
</template>

<script>

import playlistCard from "@/components/playlists/playlistCard.vue"
import playlist from "@/components/playlist.vue"

export default
{
  name: 'playlistExpansible',
  components: {playlist},
  extends: playlistCard,
  data()
  {
    return {
        expanded:false
    }
  },
}
</script>

<style scoped>

.playlist-expansible
{
    display:flex;
    max-height:288px;
    flex-direction: row;
    height:fit-content;
    flex-shrink: 0;
    transition: 0.5s all;
}

.playlist-expansible.expanded
{
    max-height:624px;
}

.left-column
{
    display:flex;
    flex-direction: column;
    height:min-content;
    padding:5px;
    box-sizing: border-box;
    gap:5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
}

.right-column
{
    display:flex;
    flex-direction: column;
    width:100%;
    gap:5px;
    padding:5px;
    box-sizing: border-box;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
    min-height:253px;
}

.empty-column-panel
{
    height:100%;
    background-color: var(--panel-background-color);
}

.empty-column-main
{
    height:100%;
    background-color: var(--main-background-color);
    border-top-right-radius: 10px;
}


</style>