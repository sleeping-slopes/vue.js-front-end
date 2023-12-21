<template>
    <div class = "playlist card" v-bind:class="{'active': current}">
        <div class="cover-wrapper s180x180" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">
          <img class = "cover" v-if="imageAvailable" :src="`http://192.168.100.7:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
          <div class = "cover bi bi-music-note-list" v-else/>
          <div class = "shade"></div>
          <div class="cover-menu">
            <button class="round-button huge" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
          </div>
          <div class="cover-menu playlist-stats h4">
            <span class="icon-text">
              <span class="bi bi-music-note-list"></span><span>{{abbreviateNumber(this.playlist.songs_count)}}</span>
            </span>
            <span class="icon-text">
              <span class="bi bi-suit-heart-fill"></span><span>{{abbreviateNumber(this.playlist.likes_count)}}</span>
            </span>
          </div>
        </div>
        <div class= "info-wrapper">
            <div class ="h5 secondary-text text-overflow">
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
            <span class ="h4 primary-text text-overflow" v-on:click="$router.push({path: $route.fullPath,query:{playlist:this.id}})">{{this.playlist.name}}</span>
        </div>
    </div>
</template>

<script>

import { getPlaylistSongs,postLikePlaylist,deleteLikePlaylist } from "@/axios/getters.js"
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
      songs: [],
      imageAvailable:true,
    }
  },
  methods:
  {
    async like()
    {
      if (!this.playlist.liked)
      {
        const response = await postLikePlaylist(this.id);
        if (response.error?.status==401) { this.$router.push({path: this.$route.fullPath,query:{action:'login'}}) }
        else
        {
          this.playlist.likes_count++;
          this.playlist.liked=true;
        }
      }
      else
      {
        const response = await deleteLikePlaylist(this.id);
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
        if (this.songs.length>0)
        {
          if (!this.current)
              this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: {id:this.id,songs:this.songs}, songIndex: 0}));
          else
          this.$store.dispatch('togglePlayingState');
        }
    },
    abbreviateNumber: abbreviateNumber
  },
  async created()
  {
    await this.$store.dispatch('loadPlaylist',this.id);
    this.songs = await getPlaylistSongs(this.id);
  },
  computed:
  {
    playlist(){ return this.$store.getters.getPlaylist(this.id); },
    current()
    {
      return this.$store.state.currentPlaylist.id===this.id;
    },
    isPlaying()
    {
      if (this.current) return this.$store.state.isPlaying;
      return false;
    }
  }
}
</script>