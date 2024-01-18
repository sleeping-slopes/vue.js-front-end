<template>
    <panel>
        <template v-slot:header>Playlists liked by {{ this.user.username || this.login }}</template>
        <template v-slot:content>
          <playlistCarousel :playlists="userLikedPlaylists"/>
        </template>
      </panel>
      <panel>
        <template v-slot:header>Songs liked by {{ this.user.username || this.login }}</template>
        <template v-slot:content>
          <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="userLikedSongs"/>
        </template>
      </panel>
  </template>

<script>

import panel from '@/components/containers/panel.vue';
import playlistCarousel from '@/components/playlistCarousel.vue';
import songContainer from '@/components/songContainer.vue';
import API from '@/axios/API';

export default
{
  name: 'UserLikesView',
  components: { panel, playlistCarousel, songContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return{
      userLikedPlaylists: undefined,
      userLikedSongs: undefined,
      user: {}
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