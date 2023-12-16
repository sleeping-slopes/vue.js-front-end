

<template>
  <modal :width="'600px'">
    <template v-slot:content v-if="this.playlist.error">
      <errorMessage>
        <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
        <template v-slot:status>{{ this.playlist.error.status }}</template>
        <template v-slot:message>{{ this.playlist.error.message }}</template>
      </errorMessage>
    </template>
    <template v-slot:content v-else>
      <div class="playlist-header">
        <div class="cover-wrapper s160x160">
          <img class = "cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
          <div class = "cover bi bi-music-note-list" v-else/>
          <div class = "shade"></div>
          <button class="playlist-hover round-button huge" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
        </div>

        <div class="playlist-info">
          <h2 class="primary-text">{{this.playlist.name}}</h2>

          <div class ="song-info h3">
            <span class="primary-text">by&nbsp;</span>
              <div v-for="(artist,index) in this.playlist.artists">
                <router-link class="artistlink primary-text" v-if="artist.login"
                    :to="'/id/'+artist.login"
                    @click.stop>
                    {{artist.name}}
                </router-link>
                <span class="primary-text" v-else>{{artist.name}}</span>
                <span class="primary-text" v-if="index+1 < this.playlist.artists.length">, </span>
              </div>
            </div>
            <div class ="song-info">
            <h4 class="secondary-text">
              {{ abbreviateNumber(this.playlist.songs_count) }} song{{ this.playlist.songs_count!=1?'s':'' }}
              <span class="bi bi-dot"></span>
              {{ abbreviateNumber(this.playlist.likes_count) }} like{{ this.playlist.likes_count!=1?'s':'' }}
            </h4>
          </div>
          <div class="playlist-button-row">
            <button class="button-secondary h5" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
              <div class="icon-text">
                <span class="bi bi-suit-heart-fill"></span><span>Like{{ this.playlist.liked?'d':'' }}</span>
              </div>
            </button>
            <button class="button-secondary h5">
              <div class="icon-text">
                <span class="bi bi-music-note-list"></span><span>Play next</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr/>
      <div style="max-height:635px">
        <playlist class="ul-list hidden-scroll"
          :id="this.id"
          :songs="this.songs"
        />
      </div>
    </template>
  </modal>
</template>

<script>

import modal from "@/components/modal.vue"
import playlist from "@/components/playlist.vue";
import errorMessage from "@/components/errorMessage.vue"

import playlistCard from "@/components/playlist/playlistCard.vue";

export default
{
  name: 'playlistModal',
  components:
  {
    modal,playlist,errorMessage
  },
  extends: playlistCard
}
</script>

<style>

.playlist-header
{
  display:flex;
  gap:5px;
}

.playlist-info
{
  display:flex;
  flex-direction: column;
  width:100%;
  height:100%;
  gap:10px;
}

.playlist-button-row
{
  display:flex;
  margin-top:auto;
  align-items:flex-end;
  gap:5px;
}
</style>

