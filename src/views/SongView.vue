<template>
<errorMessage v-if="this.song.error">
  <template v-slot:errorIcon><span class="bi bi-emoji-frown"></span></template>
  <template v-slot:status>{{ this.song.error.status }}</template>
  <template v-slot:message>{{ this.song.error.message }}</template>
</errorMessage>

<div class="content column" style="padding-top:0px; overflow:visible" v-else>
    <div class="sticky-top">
      <div class="column">
        <songBanner :id="this.id"></songBanner>
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
</template>

<script>

import API from "@/axios/API";
  import songBanner from "@/components/songs/songBanner.vue";
  import errorMessage from "@/components/containers/errorMessage.vue";

    export default {
      name: 'SongView',
      components:{songBanner,errorMessage},
      props:
      {
        id: { default: "noid" },
      },
      data()
      {
        return {
          song:{},
        }
      }
    }
    </script>

