<template>
    <div class = "playlist card">
        <div class="cover-wrapper s180x180" v-on:click="$router.push($route.path+'/playlist/'+this.id)">
            <img class = "cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note-list" v-else/>
            <div class = "shade"></div>
            <div class="playlist-hover playlist-stats h4">
                <span class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs_count)}}</span>
                </span>
                <span class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
                </span>
            </div>
            <button class="playlist-hover round-button huge bi bi-play-fill"></button>
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

.playlist.card .cover-wrapper:hover .shade
{
    opacity:0.5;
}

.playlist-carousel .playlist.card
{
    width:128px;
}

.playlist-hover
{
    position:absolute;
    opacity:0.0;
    transition: 0.2s all;
    color:var(--soft-white);
}

.cover-wrapper:hover .playlist-hover
{
    opacity:1.0;
}

.playlist-stats
{
    bottom:5px;
    display:flex;
    gap:20px;
    padding:0px 5px 0px 5px;
    box-sizing: border-box;
}



</style>