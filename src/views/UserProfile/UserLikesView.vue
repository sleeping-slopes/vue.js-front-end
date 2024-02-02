<template>
  <panel>
    <template v-slot:header>Playlists liked by {{ this.user.username }}</template>
    <template v-slot:content>
      <carousel>
        <template v-slot:content>
          <playlistContainer :type="'row gap-10'"
            :playlists="userLikedPlaylists"
            :dynamicComponent="'playlistCarouselCard'">
          </playlistContainer>
        </template>
      </carousel>
    </template>
  </panel>
  <panel>
    <template v-slot:header>Songs liked by {{ this.user.username }}</template>
    <template v-slot:content>
      <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="userLikedSongs"/>
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
  name: 'UserLikesView',
  components: { panel, carousel, songContainer, playlistContainer },
  props:
  {
    login: { default: "nologin" }
  },
  data()
  {
    return{
      userLikedPlaylists: undefined,
      userLikedSongs: undefined
    }
  },
  computed:
  {
    user() { return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    this.userLikedSongs = await API.get('users/'+this.login+'/songs/liked');
    this.userLikedPlaylists = await API.get('users/'+this.login+'/playlists/liked');
  },
}

</script>