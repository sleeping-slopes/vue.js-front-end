<template>
  <div class="column">
    <div class="row y-center">
      <span class="secondary-text font-size-big">Hear the songs you’ve played:</span>
      <div class="row gap-20 y-center right">
        <div class="row y-center gap-5">
          <span class="secondary-text font-size-medium">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button button-secondary bi bi-grid-fill"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button button-secondary bi bi-list"></button>
        </div>
        <label class="label-search">
          <input type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
        <button class="button button-secondary" @click="this.$store.dispatch('clearSongHistory');historyPlaylist.songs=[]">Clear all history</button>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="historyPlaylist"/>
      </template>
    </panel>
    <songContainer :type="'ul-grid'" :dynamicComponent="'songCard'" :playlist="historyPlaylist" v-else/>
  </div>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/containers/songContainer.vue';

export default
{
  name: 'YourHistoryView',
  components: { panel, songContainer },
  data()
  {
    return {
      historyPlaylist:
      {
        id:'[]RENAME',
        songs:JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)),
        ...(JSON.parse(JSON.stringify(this.$store.getters.getSongHistory)).length<1) && {error:{"status":404,"message":"No HISTORY songs"}}
      },
      currentViewStyle:1,
    }
  }
}

</script>