<template>
  <div class="column">
    <div class="row y-center">
      <span class="h3 secondary-text">Hear the songs you’ve played:</span>
      <div class="row right y-center gap-20">
        <div class="row y-center gap-5">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button button-secondary bi bi-grid-fill h3"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button button-secondary bi bi-list h3"></button>
        </div>
        <label class="label-search-input h4">
          <input type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
        <button class="button button-secondary h5" @click="this.$store.dispatch('clearSongHistory');playlist.songs=[]">Clear all history</button>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <songContainer :type="'ul-list hidden-scroll'"
          :playlist="playlist"
          :dynamicComponent="'songExtended'"/>
      </template>
    </panel>
    <songContainer :type="'ul-grid hidden-scroll'" v-else
      :playlist="playlist"
      :dynamicComponent="'songCard'"/>
  </div>
</template>

  <script>
  import panel from '@/components/containers/panel.vue';
  import songContainer from '@/components/songContainer.vue';

  export default
  {
    name: 'YourHistoryView',
    components:
    {
      panel,songContainer
    },
    data()
    {
      return {
        playlist:
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