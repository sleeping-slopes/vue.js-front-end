<template>
  <panel>
    <template v-slot:header>Popular playlists by {{ this.user.username }}</template>
    <template v-slot:content>
      <carousel>
        <template v-slot:content>
          <playlistContainer :type="'row gap-10'"
            :playlists="userPopularPlaylists"
            :dynamicComponent="'playlistCarouselCard'">
          </playlistContainer>
        </template>
      </carousel>
    </template>
  </panel>
  <panel>
    <template v-slot:header>Popular songs by {{ this.user.username }}</template>
    <template v-slot:content>
      <songContainer :type="'ul-list scroll-hidden'" :dynamicComponent="'songExtended'" :playlist="userPopularSongs"></songContainer>
    </template>
  </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import carousel from '@/components/containers/carousel.vue';
import songContainer from '@/components/containers/songContainer.vue';
import playlistContainer from '@/components/containers/playlistContainer.vue';

import API from '@/axios/API';

export default
{
  name: 'UserPopularView',
  components: { panel, carousel, songContainer, playlistContainer },
  props:
  {
    login: { default: "route_param_login" }
  },
  data()
  {
    return{
      userPopularPlaylists: undefined,
      userPopularSongs: undefined
    }
  },
  computed:
  {
    user() { return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    this.userPopularSongs = (await API.get('users/'+this.login+'/songs/created?popular')).songList;
    this.userPopularPlaylists = await API.get('users/'+this.login+'/playlists/created?popular');
  },
}

</script>