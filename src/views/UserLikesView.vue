<template>
    <panel style="height:max-content;flex-shrink:0;">
        <template v-slot:header>Playlists liked by {{ this.user.username }}</template>
        <!-- <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template> -->
        <template v-slot:content>
          <playlistCarousel :playlists="userLikedPlaylists"/>
        </template>
      </panel>
      <panel>
        <template v-slot:header>Songs liked by {{ this.user.username }}</template>
        <template v-slot:content>
          <playlist
          :id="userLikedSongs.id"
          :songs="userLikedSongs.songs"
          :dynamicComponent="'songExtended'"
          />
        </template>
      </panel>
  </template>

    <script>

    import panel from '@/components/panel.vue';
    import playlistCarousel from '@/components/playlistCarousel.vue';
    import playlist from '@/components/playlist.vue';

    import { getUserUsername } from '@/axios/getters';
    import { getUserLikedSongs } from '@/axios/getters'
    import { getUserLikedPlaylists } from '@/axios/getters'

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
          userLikedPlaylists:[],
          userLikedSongs:
          {
            id:"[]"+this.login+' liked',
            songs:[]
          },
          user:{},
        }
      },
      async created()
      {
        this.user = await getUserUsername(this.login);
        this.userLikedSongs.songs = await getUserLikedSongs(this.login);
        this.userLikedPlaylists = await getUserLikedPlaylists(this.login);
      },
    }
    </script>

    <style>

    </style>