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
            <button class="playlist-hover round-button huge" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
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

import { getPlaylistSongs } from "@/axios/getters.js"
import { abbreviateNumber } from "@/functions.js"
import { postLikePlaylist } from "@/axios/getters"
import { deleteLikePlaylist } from "@/axios/getters"

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
        this.$store.state.playlists[this.id].liked=!this.$store.state.playlists[this.id].liked;
        if (this.playlist.liked)
        {
          await postLikePlaylist(this.id);
          this.playlist.likes_count++; //need fix?
        }
        else
        {
          await deleteLikePlaylist(this.id);
          this.playlist.likes_count--;
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
  async mounted()
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