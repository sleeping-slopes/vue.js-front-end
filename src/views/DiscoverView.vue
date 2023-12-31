<template>
  <div class="content">
    <div class="column">
      <panel>
        <template v-slot:header>Playlists</template>
        <!-- <template v-slot:menu><router-link to="playlists" class="panel-header-button">Show all</router-link></template> -->
        <template v-slot:content>
          <playlistCarousel :playlists="this.playlists"/>
        </template>
      </panel>
      <panel>
        <template v-slot:header>Songs</template>
        <template v-slot:content>
          <songContainer class="ul-list hidden-scroll"
          :playlist="discoverPlaylist"
          :dynamicComponent="'songExtended'"
          />
        </template>
      </panel>
    </div>
  </div>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import playlistCarousel from '@/components/playlistCarousel.vue';
import songContainer from '@/components/songContainer.vue';
import API from '@/axios/API';

export default {
  name: 'DiscoverView',
  components:
  {
    panel, playlistCarousel, songContainer
  },
  data()
  {
    return {
      playlists:[],
      discoverPlaylist: {},
    }
  },
  async created()
  {
    this.playlists = await API.get('playlists');
    this.discoverPlaylist = await API.get('songs');
  }
}
</script>