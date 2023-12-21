<template>
  <panel style="height:max-content;flex-shrink:0;">
      <template v-slot:header>Popular playlists by {{ this.user.username || this.login }}</template>
      <!-- <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template> -->
      <template v-slot:content>
        <playlistCarousel :playlists="userPopularPlaylists"/>
      </template>
    </panel>
    <panel>
      <template v-slot:header>Popular songs by {{ this.user.username || this.login }}</template>
      <template v-slot:content>
        <playlist class="ul-list hidden-scroll"
        :id="userPopularSongs.id"
        :songs="userPopularSongs.songs"
        :dynamicComponent="'songExtended'"
        />
      </template>
    </panel>
</template>

  <script>

  import panel from '@/components/containers/panel.vue';
  import playlistCarousel from '@/components/playlistCarousel.vue';
  import playlist from '@/components/playlist.vue';

  import { getUserUsername, getUserCreatedPopularSongs, getUserCreatedPopularPlaylists } from '@/axios/getters'

  export default {
    name: 'UserLikesView',
    components:
    {
      panel,playlistCarousel,playlist
    },
    props:
    {
      login:
      {
        default: -1,
      },
    },
    data()
    {
      return{
        userPopularPlaylists:[],
        userPopularSongs:
        {
          id:"[]"+this.login+' popular',
          songs:[]
        },
        user:{}
      }
    },
    async created()
    {
      this.user = await getUserUsername(this.login);
      this.userPopularSongs.songs = await getUserCreatedPopularSongs(this.login);
      this.userPopularPlaylists = await getUserCreatedPopularPlaylists(this.login);
    },
  }
  </script>