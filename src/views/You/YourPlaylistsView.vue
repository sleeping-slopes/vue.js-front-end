<template>
  <div class="column">
    <div class="row y-center">
      <span class="secondary-text font-size-big">Hear your own playlists and the playlists you’ve liked:</span>
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
              <button class="button" v-on:click="this.contextMenuParams.selected=index">{{option}}</button>
            </li>
          </template>
        </contextMenuSelect>
      </div>
    </div>
    <playlistContainer :key="[this.currentViewStyle,this.playlists].toString()" :type="this.currentViewStyle?'ul-grid':'column'"
      :playlists="this.playlists" :dynamicComponent="this.currentViewStyle?'playlistCard':'playlistExpansible'">
    </playlistContainer>
  </div>
</template>

<script>

import API from '@/axios/API'

import playlistContainer from '@/components/containers/playlistContainer.vue'
import contextMenuSelect from '@/components/containers/contextMenuSelect.vue';

export default
{
  name: 'YourPlaylistsView',
  components: { playlistContainer, contextMenuSelect },
  data()
  {
    return {
      playlists: undefined,
      currentViewStyle:1,
      contextMenuParams: {options:["All","Created","Likes"], selected:0}
    }
  },
  props:
  {
    login: { default: "nologin" }
  },
  watch:
  {
    'contextMenuParams.selected':
    {
      handler: async function(value)
      {
        switch (this.contextMenuParams.options[value])
        {
          case "All": this.playlists = await API.get("users/"+this.login+"/playlists"); break;
          case "Created": this.playlists = await API.get("users/"+this.login+"/playlists/created"); break;
          case "Likes": this.playlists = await API.get("users/"+this.login+"/playlists/likes"); break;
        }
      },
      immediate: true
    }
  }
}

</script>