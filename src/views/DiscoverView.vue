<template>
  <div class="content column">
    <panel>
      <template v-slot:header>Playlists</template>
      <template v-slot:content>
        <carousel>
        <template v-slot:content>
          <playlistContainer :type="'row gap-10'"
            :playlists="this.playlists"
            :dynamicComponent="'playlistCarouselCard'">
          </playlistContainer>
        </template>
        </carousel>
      </template>
    </panel>
    <panel>
      <template v-slot:header>Songs</template>
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="playlist"/>
      </template>
    </panel>
  </div>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import carousel from '@/components/carousel.vue';
import songContainer from '@/components/containers/songContainer.vue';
import playlistContainer from '@/components/containers/playlistContainer.vue';
import API from '@/axios/API';

export default {
  name: 'DiscoverView',
  components: { panel, carousel, songContainer, playlistContainer },
  data()
  {
    return {
      playlists: undefined,
      playlist: undefined,
    }
  },
  async created()
  {
    this.playlists = await API.get('playlists');
    this.playlist = await API.get('songs');
  }
}
</script>