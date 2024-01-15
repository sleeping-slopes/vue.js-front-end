<template>
    <span class="secondary-text h4">Found {{ abbreviateNumber(this.playlists.length) }} playlists</span>
    <playlistContainer class="ul-list" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"/>
    <!-- Sorry we didn't find any results for “fgdgsdgh”. -->
    <!-- Check the spelling, or try a different search. -->
</template>

<script>

import playlistContainer from '@/components/playlistContainer.vue';
import API from '@/axios/API';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchPlaylistView',
  components: {playlistContainer},
  data()
  {
    return {
        playlists:[],
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.playlists = await API.get('playlists');
  }
}

</script>