<template>
<div class="sticky-top">
  <div class="row">
    <router-link :to="{ name: 'Song', params: { id: this.id }}" class="cover-wrapper s100x100">
      <img class="cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false"/>
      <div class="cover bi bi-music-note" v-else></div>
    </router-link>
    <div class="info-wrapper" v-if="this.song">
      <div class="secondary-text font-size-big">
        <template v-for="(artist,index) in this.song.artists">
          <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
          <span v-else>{{artist.name}}</span>
          <span v-if="index+1 < this.song.artists.length">, </span>
        </template>
      </div>
      <router-link :to="{ name: 'Song', params: { id: this.id }}" class="primary-text hoverable font-size-large">{{this.song.name}}</router-link>
    </div>
  </div>
  <nav class="nav-tab">
    <ul>
      <li><router-link :to="{ name: 'SongLikes', params: { id: this.id }}">Likes</router-link></li>
      <li><router-link :to="{ name: 'SongPlaylists', params: { id: this.id }}">In playlists</router-link></li>
      <li><router-link :to="{ name: 'SongRelated', params: { id: this.id }}">Related songs</router-link></li>
    </ul>
  </nav>
</div>
</template>

<script>

import API from "@/axios/API";

export default
{
  name: 'songHeader',
  data()
  {
    return {
      id: this.$route.params.id,
      song: undefined,
      coversrc: API.defaults.baseURL+`songs/`+this.id+`/cover`,
      imageAvailable:true
    }
  },
  async created()
  {
    this.song = await API.get('songs/'+this.id);
    if (this.song.error) this.$router.push({ name:"Song", params: { id: this.id } });
  }
}

</script>