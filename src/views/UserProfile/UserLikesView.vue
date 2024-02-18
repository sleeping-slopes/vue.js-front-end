<template>
  <panel>
    <template v-slot:header>Playlists liked by {{ this.user.username }}</template>
    <template v-slot:content>
      <carousel>
        <template v-slot:content>
          <playlistContainer :type="'row gap-10'"
            :playlists="userPlaylistLikes"
            :dynamicComponent="'playlistCarouselCard'">
          </playlistContainer>
        </template>
      </carousel>
    </template>
  </panel>
  <panel>
    <template v-slot:header>Songs liked by {{ this.user.username }}</template>
    <template v-slot:content>
      <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="userSongLikes"></songContainer>
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
    login: { default: "route_param_login" }
  },
  data()
  {
    return{
      userPlaylistLikes: undefined,
      userSongLikes: undefined
    }
  },
  computed:
  {
    user() { return this.$store.getters.getUser(this.login) }
  },
  async created()
  {
    this.userSongLikes = (await API.get('users/'+this.login+'/songs/likes')).songList;
    this.userPlaylistLikes = await API.get('users/'+this.login+'/playlists/likes');
  },
}

</script>