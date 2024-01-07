<template>
  <div class="content column">
    <panel>
      <template v-slot:header>Playlists</template>
      <template v-slot:content>
        <playlistCarousel :playlists="this.playlists"/>
      </template>
    </panel>
    <panel>
      <template v-slot:header>Songs</template>
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'"
        :playlist="playlist"
        :dynamicComponent="'songExtended'"
        />
      </template>
    </panel>
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
      playlist: {},
    }
  },
  async created()
  {
    this.playlists = await API.get('playlists');
    this.playlist = await API.get('songs');
  }
}
</script>