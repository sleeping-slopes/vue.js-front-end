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
        <div class= "info-wrapper">
          <div class ="h3 secondary-text text-overflow">
            <template v-for="(artist,index) in this.song.artists">
              <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
              <span v-else>{{artist.name}}</span>
              <span v-if="index+1 < this.song.artists.length">, </span>
            </template>
          </div>
          <router-link :to="{ name: 'Song', params: { id: this.id }}" class="h2 primary-text hoverable text-overflow">{{this.song.name}}</router-link>
        </div>
      </div>
      <nav class="navtab">
        <div class="nav-menu">
          <router-link :to="{ name: 'SongLikes', params: { id: this.id }}" class="tablink h3">Likes</router-link>
          <router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}" class="tablink h3">In playlists</router-link>
          <router-link :to="{ name: 'SongRelated', params: { id: this.id }}" class="tablink h3">Related songs</router-link>
        </div>
      </nav>
    </div>
    <ul class="ul-grid" v-if="this.users.length>0">
      <li v-for="users in this.users">
        <userCard :login="users.login"></userCard>
      </li>
    </ul>
    <errorMessage  v-else>
      <template v-slot:errorIcon><span class="bi bi-person-fill"></span></template>
      <template v-slot:message>No one liked this song yet</template>
    </errorMessage>
  </div>
</template>

<script>

import errorMessage from "@/components/containers/errorMessage.vue";
import userCard from "@/components/userCard.vue";
import API from "@/axios/API";

  export default {
    name: 'SongLikesView',
    components:{userCard,errorMessage},
    props:
    {
      id: { default: "noid" },
    },
    data()
    {
      return {
        song:{},
        users:[]
      }
    },
    async created()
    {
      this.song = await API.get('songs/'+this.id);
      this.users = await API.get('songs/'+this.id+'/likes');
    }
  }
  </script>

