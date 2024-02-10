<template>
  <div class="column">
    <div class="row y-center">
      <span class="h3 secondary-text">Hear your own playlists and the playlists you’ve liked:</span>
      <div class="row gap-20 y-center right">
        <div class="row y-center gap-5">
          <span class="secondary-text h4">View</span>
          <button v-bind:class="{'toggled': this.currentViewStyle==1}" @click="this.currentViewStyle=1" class="button button-secondary bi bi-grid-fill h3"></button>
          <button v-bind:class="{'toggled': this.currentViewStyle==0}" @click="this.currentViewStyle=0" class="button button-secondary bi bi-list h3"></button>
        </div>
        <label class="label-search">
          <input type="text" placeholder="Filter" autocomplete="off">
          <i class="fa fa-search"></i>
        </label>
        <div class="select-wrapper">
          <select v-model="selected" class="h4">
            <option>All</option>
            <option>Created</option>
            <option>Likes</option>
          </select>
        </div>
      </div>
    </div>
    <playlistContainer :key="[this.currentViewStyle,this.playlists].toString()" :type="this.currentViewStyle?'ul-grid':'column'"
      :playlists="this.playlists" :dynamicComponent="this.currentViewStyle?'playlistCard':'playlistExpansible'">
    </playlistContainer>
  </div>
</template>

<script>

import playlistContainer from '@/components/containers/playlistContainer.vue'

import API from '@/axios/API'

export default
{
  name: 'YourPlaylistsView',
  components: { playlistContainer },
  data()
  {
    return {
      playlists: undefined,
      selected:'All',
      currentViewStyle:1,
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