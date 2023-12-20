<template>
  <panel>
    <template v-slot:header>Songs by {{ this.user.username || this.login }}</template>
    <template v-slot:content>
      <playlist class="ul-list hidden-scroll"
        :id="this.userSongs.id"
        :songs="this.userSongs.songs"
        :dynamicComponent="'songExtended'"
      />
    </template>
  </panel>
</template>

  <script>

  import panel from '@/components/containers/panel.vue';
  import playlist from '@/components/playlist.vue';

  import { getUserUsername } from '@/axios/getters';
  import { getUserCreatedSongs } from '@/axios/getters'

  export default {
    name: 'UserSongsView',
    components:
    {
      panel,playlist
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
        userSongs:
        {
          id:"[]"+this.login+' songs',
          songs:[]
        },
        user:{}
      }
    },
    async created()
    {
      this.user = await getUserUsername(this.login);
      this.userSongs.songs = await getUserCreatedSongs(this.login);
    },
  }
  </script>

  <style>

  </style>