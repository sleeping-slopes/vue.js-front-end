<template>
    <div class = "playlist-expansible" v-bind:class="{'expanded': this.expanded}">
        <div class="column gap-0">
            <div class="left-column">
                <div class="cover-wrapper s160x160" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
                    <img class = "cover" v-if="imageAvailable" :src="this.coversrc" @error="imageAvailable=false"/>
                    <div class = "cover bi bi-music-note-list" v-else></div>
                </div>
                <button class="button button-secondary h6" style="width:90px;" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
                    <div class="icon-text">
                        <span class="bi bi-suit-heart-fill"></span><span>Like{{ this.playlist.liked?'d':'' }}</span>
                    </div>
                </button>
            </div>
            <div class="empty-column-panel">
                <div class="empty-column-main"></div>
            </div>
        </div>
        <div class="right-column" style="overflow:hidden">
            <div class="row gap-10 w-100 y-center">
                <button class="button button-round medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click.stop="playPlaylist()"></button>
                <div class= "info-wrapper column gap-0">
                    <div class ="h4 secondary-text">
                        <template v-for="(artist,index) in this.playlist.artists">
                            <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                            <span v-else>{{artist.name}}</span>
                            <span v-if="index+1 < this.playlist.artists.length">, </span>
                        </template>
                    </div>
                    <span class ="h3 primary-text hoverable" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
                </div>
            </div>
            <hr>
            <songContainer :type="'ul-list'" :dynamicComponent="'songItem'" :playlist="this.playlist.songList"/>
            <button class="button button-secondary h6" style="width:90px;" v-on:click="this.expanded=!this.expanded" v-if="this.playlist.songList.songs?.length>4">{{this.expanded?"Hide":"Expand"}}</button>
        </div>
    </div>
</template>

<script>

import playlistCard from "@/components/playlists/playlistCard.vue"
import songContainer from "@/components/songContainer.vue"

export default
{
  name: 'playlistExpansible',
  components: {songContainer},
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
    width:100%;
    position: relative;
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
    gap: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
    align-items: center;
    justify-content: space-between;
}

.right-column
{
    display:flex;align-items: center;
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