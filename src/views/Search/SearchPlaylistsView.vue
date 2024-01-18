<template>
    <span class="secondary-text h4" v-if="this.playlists.length">Found {{ abbreviateNumber(this.playlists.length) }} playlist{{this.playlists.length==1?'':'s'}}</span>
    <playlistContainer class="ul-list" :playlists="this.playlists" :dynamicComponent="'playlistExpansible'"/>
</template>

<script>

import playlistContainer from '@/components/playlistContainer.vue';
import API from '@/axios/API';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchPlaylistView',
  components: { playlistContainer },
  data()
  {
    return {
        playlists:[],
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.playlists = await API.get('search/'+this.$route.query.q.trim()+'/playlists');
  }
}

</script>