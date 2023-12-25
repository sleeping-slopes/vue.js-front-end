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

import API from '@/axios/API';

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
        default: "nologin",
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
      this.user = await API.get('users/'+this.login+'/username');
      this.userSongs.songs = await API.get('users/'+this.login+'/songs/created');
    },
  }
  </script>