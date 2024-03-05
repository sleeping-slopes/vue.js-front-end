<template>
    <span class="secondary-text font-size-medium" v-if="this.playlist?.songs">Found {{ abbreviateNumber(this.playlist?.songs.length) }} song{{this.playlist?.songs.length==1?'':'s'}}</span>
    <panel>
        <template v-slot:content>
            <songContainer :type="'ul-list scroll-hidden'" :dynamicComponent="'songExtended'" :playlist="playlist"></songContainer>
        </template>
    </panel>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/containers/songContainer.vue';
import API from '@/axios/API';
import { abbreviateNumber } from '@/functions';

export default
{
  name: 'searchSongsView',
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
    this.playlist = (await API.get('search/'+this.$route.query.q.trim()+'/songs')).songList;
  }
}

</script>