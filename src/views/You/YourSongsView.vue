<template>
  <div class="column">
    <div class="row y-center">
      <span class="h3 secondary-text">Hear your own songs and the songs you’ve liked:</span>
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
        <songContainer :type="'ul-list hidden-scroll'" :dynamicComponent="'songExtended'" :playlist="playlist"/>
      </template>
    </panel>
    <songContainer :type="'ul-grid hidden-scroll'" :dynamicComponent="'songCard'" :playlist="playlist" v-else/>
  </div>
</template>

<script>

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/songContainer.vue';

import API from '@/axios/API';

export default
{
  name: 'YourSongsView',
  components: { panel, songContainer },
  data()
  {
    return {
      playlist: undefined,
      currentViewStyle:1,
      selected:'All',
    }
  },
  props:
  {
    login: { default: "nologin" }
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