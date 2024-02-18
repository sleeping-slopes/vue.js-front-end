<template>
  <div class="column">
    <div class="row y-center">
      <span class="secondary-text font-size-big">Hear your own songs and the songs you’ve liked:</span>
      <div class="row gap-20 right">
        <div class="row gap-5 y-center">
          <span class="secondary-text font-size-medium">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button button-secondary bi bi-grid-fill"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button button-secondary bi bi-list"></button>
        </div>
        <label class="label-search">
          <input type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
        <contextMenuSelect style="min-width:120px;">
          <template v-slot:header>
            <button type = "button" class="button">
              {{ this.contextMenuParams.options[this.contextMenuParams.selected] }} <span class="bi bi-chevron-down right"></span>
            </button>
          </template>
          <template v-slot:options>
            <li v-for="(option,index) in this.contextMenuParams.options">
              <button class="button" v-bind:class="{'toggled':this.contextMenuParams.selected==index}" v-on:click="this.contextMenuParams.selected=index">{{option}}</button>
            </li>
          </template>
        </contextMenuSelect>
      </div>
    </div>
    <panel v-if="this.currentViewStyle==0">
      <template v-slot:content>
        <songContainer :type="'ul-list'" :dynamicComponent="'songExtended'" :playlist="playlist" :key="playlist?.id"></songContainer>
      </template>
    </panel>
    <songContainer :type="'ul-grid'" :dynamicComponent="'songCard'" :playlist="playlist" :key="playlist?.id" v-else></songContainer>
  </div>
</template>

<script>

import API from '@/axios/API';

import panel from '@/components/containers/panel.vue';
import songContainer from '@/components/containers/songContainer.vue';
import contextMenuSelect from '@/components/containers/contextMenu/contextMenuSelect.vue';

export default
{
  name: 'YourSongsView',
  components: { panel, songContainer, contextMenuSelect },
  data()
  {
    return {
      login: this.$store.getters.getCurrentUser.login,
      playlist: undefined,
      currentViewStyle:1,
      contextMenuParams: {options:["All","Created","Likes"], selected:0}
    }
  },
  watch:
  {
    'contextMenuParams.selected':
    {
      handler: async function(value)
      {
        switch (this.contextMenuParams.options[value])
        {
          case "All": this.playlist = undefined; this.playlist = (await API.get("users/"+this.login+"/songs")).songList; break;
          case "Created": this.playlist = undefined; this.playlist = (await API.get("users/"+this.login+"/songs/created")).songList; break;
          case "Likes": this.playlist = undefined; this.playlist = (await API.get("users/"+this.login+"/songs/likes")).songList; break;
        }
      },
      immediate: true
    }
  }
}

</script>