<template>
  <modal :width="'600px'">
    <template v-slot:content>
      <template v-if="this.loaded">
        <errorMessage v-if="this.playlist.error">
          <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
          <template v-slot:status>{{ this.playlist.error.status }}</template>
          <template v-slot:message>{{ this.playlist.error.message }}</template>
        </errorMessage>
        <template v-else>
          <div class="row gap-5">
            <div class="cover-wrapper s160x160">
              <img class="cover" :src="this.playlist.coversrc" v-if="this.playlist.cover"/>
              <div class="cover bi bi-music-note-list" v-else></div>
              <div class="shade"></div>
              <div class="cover-menu">
                <button class="button button-default button-large" v-bind:class="this.isPlaying?'bi bi-pause-fill':'bi bi-play-fill'" v-on:click.stop="playPlaylist()"></button>
              </div>
            </div>
            <div class="info-wrapper gap-5" >
              <h1 class="primary-text font-size-large">{{this.playlist.name}}</h1>
              <div class="primary-text font-size-big">
                <span>by&nbsp;</span>
                <template v-for="(artist,index) in this.playlist.artists">
                  <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
                  <span v-else>{{artist.name}}</span>
                  <span v-if="index+1 < this.playlist.artists.length">, </span>
                </template>
              </div>
              <span class="secondary-text font-size-small" style="margin-top:10px;">
                {{ abbreviateNumber(this.playlist.songList.songs?.length) }} song{{ this.playlist.songList.songs?.length==1?'':'s' }}
                <span class="bi bi-dot"></span>
                {{ abbreviateNumber(this.playlist.likes_count) }} like{{ this.playlist.likes_count==1?'':'s' }}
              </span>
              <span class="secondary-text font-size-small" style="margin-top:10px;">
                Created by <router-link :to="{ name: 'User', params: { login: this.playlist.created_by }}" class="alink">{{this.playlist.created_by_username}}</router-link>
              </span>
              <div class="row gap-5 bottom">
                <button class="button button-secondary icon-text" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
                    <span class="bi bi-suit-heart-fill"></span><span>Like{{ this.playlist.liked?'d':'' }}</span>
                </button>
                <button class="button button-secondary icon-text">
                  <span class="bi bi-music-note-list"></span><span>Play next</span>
                </button>
              </div>
            </div>
          </div>
          <hr>
          <songContainer :type="'ul-list scroll-hidden'" :playlist="this.playlist.songList"></songContainer>
        </template>
      </template>
      <div class="loader-wrapper" v-else>
        <div class="loader"></div>
      </div>
    </template>
  </modal>
</template>

<script>

import playlistInterface from "@/components/interfaces/playlistInterface.vue";

import modal from "@/components/containers/modal.vue"
import songContainer from "@/components/containers/songContainer.vue";
import errorMessage from "@/components/containers/errorMessage.vue"

export default
{
  name: 'playlistModal',
  extends: playlistInterface,
  components: { modal, songContainer, errorMessage }
}

</script>

<style scoped>

.cover-wrapper:hover .shade
{
  opacity:0.5;
}
.cover-wrapper:hover .cover-menu
{
  opacity:1.0;
}

</style>

