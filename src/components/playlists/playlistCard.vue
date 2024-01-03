<template>
    <div class = "playlist card" v-bind:class="{'active': current}">
        <div class="cover-wrapper s180x180" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
          <img class = "cover" v-if="imageAvailable" :src="this.coversrc" @error="imageAvailable=false"/>
          <div class = "cover bi bi-music-note-list" v-else/>
          <div class = "shade"></div>
          <div class="cover-menu">
            <button class="button button-round huge" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
          </div>
          <div class="cover-menu playlist-stats h4">
            <span class="icon-text">
              <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs.length)}}</span>
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

import API from "@/axios/API.js"
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
      coversrc: API.defaults.baseURL+`playlists/`+this.id+`/cover`,
      imageAvailable:true,
    }
  },
  methods:
  {
    async like()
    {
      if (!this.playlist.liked)
      {
        const response = await API.post("playlists/"+this.id+"/action/like/post");
        if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
        else
        {
          this.playlist.likes_count++;
          this.playlist.liked=true;
        }
      }
      else
      {
        const response = await API.post("playlists/"+this.id+"/action/like/delete");
        if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
        else
        {
          this.playlist.likes_count--;
          this.playlist.liked=false;
        }
      }
    },
    playPlaylist()
    {
        if (this.playlist.songs.songs?.length>0)
        {
          if (!this.current)
              this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: {id:this.id,songs:this.playlist.songs.songs}, songIndex: 0});
          else
          this.$store.dispatch('togglePlayingState');
        }
    },
    abbreviateNumber: abbreviateNumber
  },
  computed:
  {
    playlist() { return this.$store.getters.getPlaylist(this.id); },
    current() { return this.$store.state.currentPlaylist.id===this.id; },
    isPlaying() { return this.current?this.$store.state.isPlaying:false; }
  }
}
</script>