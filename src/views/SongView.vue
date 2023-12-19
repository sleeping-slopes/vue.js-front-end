<template>
<errorMessage v-if="this.song.error">
  <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
  <template v-slot:status>{{ this.song.error.status }}</template>
  <template v-slot:message>{{ this.song.error.message }}</template>
</errorMessage>
<div class="main" style="padding:0px;gap:5px" v-else>
  <div class="fixed-top">
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
  <div class="scr" style="padding:10px 0px 10px 0px">
    <router-view></router-view>
  </div>
</div>
</template>

<script>

  import { getSong } from "@/axios/getters";
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
        this.song = await getSong(this.id);
      }
    }
    </script>

    <style>

    </style>

