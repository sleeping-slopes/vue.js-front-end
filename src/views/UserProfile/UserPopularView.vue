<template>
    <panel>
      <template v-slot:header>Popular playlists by {{ this.user.username }}</template>
      <template v-slot:content>
        <playlistCarousel :playlists="userPopularPlaylists"/>
      </template>
    </panel>
    <panel>
      <template v-slot:header>Popular songs by {{ this.user.username }}</template>
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="userPopularSongs"/>
      </template>
    </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import playlistCarousel from '@/components/playlistCarousel.vue';
import songContainer from '@/components/containers/songContainer.vue';

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
      userPopularPlaylists: undefined,
      userPopularSongs: undefined,
      user: {}
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