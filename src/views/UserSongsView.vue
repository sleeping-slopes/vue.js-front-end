<template>
  <panel>
    <template v-slot:header>Songs by {{ this.user.username || this.login }}</template>
    <template v-slot:content>
      <songContainer class="ul-list hidden-scroll"
        :playlist="this.userSongs"
        :dynamicComponent="'songExtended'"
      />
    </template>
  </panel>
</template>

  <script>

  import panel from '@/components/containers/panel.vue';
  import songContainer from '@/components/songContainer.vue';

import API from '@/axios/API';

  export default {
    name: 'UserSongsView',
    components:
    {
      panel,songContainer
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
        userSongs: {},
        user:{}
      }
    },
    async created()
    {
      this.user = await API.get('users/'+this.login+'/username');
      this.userSongs = await API.get('users/'+this.login+'/songs/created');
    },
  }
  </script>