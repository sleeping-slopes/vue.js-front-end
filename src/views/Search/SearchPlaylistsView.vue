<template>
    <span class="secondary-text font-size-medium" v-if="this.playlists?.length">Found {{ abbreviateNumber(this.playlists?.length) }} playlist{{this.playlists?.length==1?'':'s'}}</span>
    <playlistContainer :type="'ul-list'" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"></playlistContainer>
</template>

<script>

import playlistContainer from '@/components/containers/playlistContainer.vue';
import API from '@/axios/API';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchPlaylistsView',
  components: { playlistContainer },
  data()
  {
    return {
        playlists: undefined
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.playlists = await API.get('search/'+this.$route.query.q.trim()+'/playlists');
  }
}

</script>