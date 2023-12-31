<template>
  <div class="column">
    <div class="row" style="align-items: center;">
      <span class="h3 secondary-text">Hear your own songs and the songs you’ve liked:</span>
      <div class="row" style="margin-left:auto; align-items: center; gap:20px;">
        <div class="row" style="margin-left:auto; align-items: center; gap:5px;">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button-secondary bi bi-grid-fill h3" style="padding:5px;"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button-secondary bi bi-list h3" style="padding:5px;"></button>
        </div>
        <div class="wrapper-search h4">
          <div class="search-panel">
            <input class="search" type="text" placeholder="Filter" autocomplete="off">
            <i class="fa fa-search"></i>
          </div>
        </div>
        <div class="select-wrapper">
          <select v-model="selected" class="h4">
            <option>All</option>
            <option>Created</option>
            <option>Liked</option>
          </select>
        </div>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <songContainer :class="'ul-list hidden-scroll'"
          :playlist="playlist"
          :dynamicComponent="'songExtended'"/>
      </template>
    </panel>
    <songContainer :class="'ul-grid hidden-scroll'" v-else
      :playlist="playlist"
      :dynamicComponent="'songCard'"/>
  </div>
</template>

  <script>

  import panel from '@/components/containers/panel.vue';
  import songContainer from '@/components/songContainer.vue';

import API from '@/axios/API';

  export default {
    name: 'YourSongsView',
    components:
    {
      panel,songContainer
    },
    data()
    {
      return {
        playlist: {},
        currentViewStyle:1,
        selected:'All',
      }
    },
    props:
    {
      login:{default:"nologin"}
    },
    watch:
    {
      'selected':
      {
        handler: async function(value)
        {
          switch (value)
          {
            case "All": this.playlist = await API.get("users/"+this.login+"/songs"); break;
            case "Created": this.playlist = await API.get("users/"+this.login+"/songs/created"); break;
            case "Liked": this.playlist = await API.get("users/"+this.login+"/songs/liked"); break;
          }
        },
        immediate: true
      }
    }
  }
  </script>