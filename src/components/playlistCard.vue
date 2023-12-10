<template>
    <div class = "playlistCard">
        <div class="playlist-cover-wrapper s128x128" v-on:click="$router.push($route.path+'/playlist/'+this.id)">
            <img class = "playlist-cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
            <div class = "playlist-cover bi bi-music-note-list" v-else/>
            <div class = "playlist-cover-shade"></div>
            <div class="playlist-hover playlist-stats">
                <div class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs_count)}}</span>
                </div>
                <div class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </div>
            </div>
            <button class="playlist-hover round-button large bi bi-play-fill"></button>
        </div>
        <div class= "song-info-wrapper">
            <div class ="song-info primary-text" v-on:click="$router.push($route.path+'/playlist/'+this.id)">{{this.playlist.name}}</div>
            <div class ="song-info">
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
        </div>
    </div>

</template>

<script>

import { getPlaylist } from "@/axios/getters.js"
import { abbreviateNumber } from "@/functions.js"

export default
{
  name: 'playlistCard',
  props:
  {
    id: { default:"noid"},
  },
  data()
  {
    return {
      playlist:
      {
      },
      imageAvailable:true
    }
  },
  methods:
  {
    abbreviateNumber: abbreviateNumber
  },
  async mounted()
  {
    this.playlist = await getPlaylist(this.id);
  }
}
</script>

<style>

.playlistCard
{
    display:flex;
    flex-direction: column;
    width:128px;
    flex-shrink: 0;
}

.playlist-cover-shade
{
    position:absolute;
    background-color: black;
    width:100%;
    height:100%;
    opacity:0.0;
    transition: 0.2s all;
}

.playlist-cover
{
    width:100%;
    height:100%;
    background-color:var(--panel-border-color);
    color:var(--text-color-secondary);
    align-items: center;
    display:flex;
    justify-content:center;

}



.playlist-cover-wrapper:hover .playlist-cover-shade
{
    opacity:0.5;
}

.playlist-hover
{
    position:absolute;
    opacity:0.0;
    transition: 0.2s all;
    color:var(--soft-white);
}

.playlist-cover-wrapper:hover .playlist-hover
{
    opacity:1.0;
}

.playlist-stats
{
    bottom:5px;
    font-size:14px;
    display:flex;
    gap:20px;
    padding:0px 5px 0px 5px;
    box-sizing: border-box;
    cursor:default;
}

</style>