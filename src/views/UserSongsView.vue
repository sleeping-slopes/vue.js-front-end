<template>
  <panel>
    <template v-slot:header>Songs by {{ this.user.username }}</template>
    <template v-slot:content>
      <playlist
        :id="this.userSongs.id"
        :songs="this.userSongs.songs"
      />
    </template>
  </panel>
</template>

  <script>

  import panel from '@/components/panel.vue';
  import playlist from '@/components/playlist.vue';

  import { getUserByLogin } from '@/axios/getters';
  import { getUserSongs } from '@/axios/getters'

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
      this.user = await getUserByLogin(this.login);
      this.userSongs.songs = await getUserSongs(this.login);
    },
  }
  </script>

  <style>

  </style>