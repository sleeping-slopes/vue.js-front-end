<template>
  <errorMessage v-if="this.song.error">
    <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
    <template v-slot:status>{{ this.song.error.status }}</template>
    <template v-slot:message>{{ this.song.error.message }}</template>
  </errorMessage>
  <div class="content column" style="padding-top:0px;" v-else>
    <div class="sticky-top">
      <div class="row">
        <router-link :to="{ name: 'Song', params: { id: this.id }}" class = "cover-wrapper s100x100">
          <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
          <div class = "cover bi bi-music-note" v-else/>
        </router-link>
        <div class= "info-wrapper column gap-0">
          <div class ="h3 secondary-text">
            <template v-for="(artist,index) in this.song.artists">
              <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
              <span v-else>{{artist.name}}</span>
              <span v-if="index+1 < this.song.artists.length">, </span>
            </template>
          </div>
          <router-link :to="{ name: 'Song', params: { id: this.id }}" class="h2 primary-text hoverable">{{this.song.name}}</router-link>
        </div>
      </div>
      <nav class="navtab">
        <ul class="h3">
          <li><router-link :to="{ name: 'SongLikes', params: { id: this.id }}">Likes</router-link></li>
          <li><router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}">In playlists</router-link></li>
          <li><router-link :to="{ name: 'SongRelated', params: { id: this.id }}">Related songs</router-link></li>
        </ul>
      </nav>
    </div>
    <songContainer class="ul-list hidden-scroll"
        :playlist="playlist"
        :dynamicComponent="'songExtended'"
        />
  </div>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";
import songContainer from "@/components/songContainer.vue";
import API from "@/axios/API";

  export default {
    name: 'SongRelatedView',
    components:{errorMessage,songContainer},
    props:
    {
      id: { default: "noid" },
    },
    data()
    {
      return {
        song:{},
        playlist:{}
      }
    },
    async created()
    {
      this.song = await API.get('/songs/'+this.id);
      this.playlist = await API.get('/songs/'+this.id+"/related");
    }
  }
  </script>