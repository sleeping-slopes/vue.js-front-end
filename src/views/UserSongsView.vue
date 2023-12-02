<template>
  <panel>
    <template v-slot:header>Songs</template>
    <template v-slot:menu>
      <button class="button-secondary">View all</button>
    </template>
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
          id:this.login+' songs',
          songs:[]
        },
      }
    },
    async created()
    {
      // const r = await getUserByLogin(this.login);
      // if (r.status===200) this.user=r.values;
      // else this.user=undefined;

      this.userSongs.songs = await getUserSongs(this.login);
    },
  }
  </script>

  <style>

  </style>