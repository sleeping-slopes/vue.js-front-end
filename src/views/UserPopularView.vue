<template>
  <panel>
      <template v-slot:header>Popular playlists by {{ this.user.username || this.login }}</template>
      <template v-slot:content>
        <playlistCarousel :playlists="userPopularPlaylists"/>
      </template>
    </panel>
    <panel>
      <template v-slot:header>Popular songs by {{ this.user.username || this.login }}</template>
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'"
        :playlist="userPopularSongs"
        :dynamicComponent="'songExtended'"
        />
      </template>
    </panel>
</template>

  <script>

  import panel from '@/components/containers/panel.vue';
  import playlistCarousel from '@/components/playlistCarousel.vue';
  import songContainer from '@/components/songContainer.vue';

  import API from '@/axios/API';

  export default {
    name: 'UserLikesView',
    components:
    {
      panel,playlistCarousel,songContainer
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
        userPopularSongs: {},
        user:{}
      }
    },
    async created()
    {
      this.user = await API.get('users/'+this.login+'/username');
        this.userPopularSongs = await API.get('users/'+this.login+'/songs/created/popular');
        this.userPopularPlaylists = await API.get('users/'+this.login+'/playlists/created/popular');

    },
  }
  </script>