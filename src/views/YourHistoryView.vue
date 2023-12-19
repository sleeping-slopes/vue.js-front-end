<template>
  <div class="column">
    <div style="display:flex; align-items: center;">
      <span class="h3 secondary-text">Hear the songs you’ve played:</span>
      <div style="display:flex; margin-left:auto; align-items: center; gap:20px;">
        <div style="display:flex; margin-left:auto; align-items: center; gap:5px;">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button-secondary bi bi-grid-fill h3" style="height:auto;padding:5px;"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button-secondary bi bi-list h3" style="height:auto;padding:5px;"></button>
        </div>
        <div class="wrapper-search h4">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
        <button class="button-secondary h5" @click="this.$store.dispatch('clearSongHistory');playlist.songs=[]">Clear all history</button>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <playlist :class="'ul-list hidden-scroll'"
          :id="playlist.id"
          :songs="playlist.songs"
          :dynamicComponent="'songExtended'"/>
      </template>
    </panel>
    <playlist :class="'ul-grid hidden-scroll'" v-else
      :id="playlist.id"
      :songs="playlist.songs"
      :dynamicComponent="'songCard'"/>
  </div>
</template>

  <script>
  import panel from '@/components/containers/panel.vue';
  import playlist from '@/components/playlist.vue';

  export default {
    name: 'YourHistoryView',
    components:
    {
      panel,playlist
    },
    data()
    {
      return {
        playlist:
        {
          id:'[]RENAME',
          songs:JSON.parse(JSON.stringify(this.$store.getters.getSongHistory))
        },
        currentViewStyle:1,
      }
    }
  }
  </script>

  <style>

  </style>