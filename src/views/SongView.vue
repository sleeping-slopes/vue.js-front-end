<template>
<errorMessage v-if="this.song.error">
  <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
  <template v-slot:status>{{ this.song.error.status }}</template>
  <template v-slot:message>{{ this.song.error.message }}</template>
</errorMessage>

<div class="content" style="padding-top:0px;" v-else>
  <div class="column" style="overflow:visible">
    <div class="sticky-top">
      <div class="column">
        <songLarge :id="this.id"></songLarge>
        <nav class="navtab">
          <div class="nav-menu">
            <router-link class="tablink h3" :to="{ name: 'SongLikes', params: { id: this.id }}">Likes</router-link>
            <router-link class="tablink h3" :to="{ name: 'SongPlaylists', params: { id: this.id }}">In playlists</router-link>
            <router-link class="tablink h3" :to="{ name: 'SongRelated', params: { id: this.id }}">Related songs</router-link>
          </div>
        </nav>
      </div>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>

import API from "@/axios/API";
  import songLarge from "@/components/songs/songLarge.vue";
  import errorMessage from "@/components/containers/errorMessage.vue";

    export default {
      name: 'SongView',
      components:{songLarge,errorMessage},
      props:
      {
        id: { default: "noid" },
      },
      data()
      {
        return {
          song:{},
        }
      },
      async created()
      {
        this.songs = await API.get('songs/'+this.id);
      }
    }
    </script>

