<template>
    <panel style="height:max-content;flex-shrink:0;">
        <template v-slot:header>Playlists liked by {{ this.user.username || this.login }}</template>
        <!-- <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template> -->
        <template v-slot:content>
          <playlistCarousel :playlists="userLikedPlaylists"/>
        </template>
      </panel>
      <panel>
        <template v-slot:header>Songs liked by {{ this.user.username || this.login }}</template>
        <template v-slot:content>
          <songContainer class="ul-list hidden-scroll"
          :playlist="userLikedSongs"
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
          userLikedPlaylists:[],
          userLikedSongs: {},
          user:{},
        }
      },
      async created()
      {
        this.user = await API.get('users/'+this.login+'/username');
        this.userLikedSongs = await API.get('users/'+this.login+'/songs/liked');
        this.userLikedPlaylists = await API.get('users/'+this.login+'/playlists/liked');
      },
    }
    </script>