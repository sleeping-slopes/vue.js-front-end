<template>
    <span class="secondary-text h4" v-if="this.playlist?.songs">Found {{ abbreviateNumber(this.playlist?.songs.length) }} song{{this.playlist?.songs.length==1?'':'s'}}</span>
    <panel>
        <template v-slot:content>
            <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="playlist"/>
        </template>
    </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/songContainer.vue';
import API from '@/axios/API';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchPlaylistView',
  components: { panel, songContainer },
  data()
  {
    return {
        playlist: undefined
    }
  },
  methods: { abbreviateNumber:abbreviateNumber },
  async created()
  {
    this.playlist = await API.get('search/'+this.$route.query.q.trim()+'/songs');
  }
}

</script>