<template>
  <div class="column">
    <div style="display:flex; align-items: center;">
      <span class="h3 secondary-text">Hear your own playlists and the playlists you’ve liked:</span>
      <div style="display:flex; margin-left:auto; align-items: center; gap:20px;">
        <div style="display:flex; margin-left:auto; align-items: center; gap:5px;">
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
    <playlistContainer class="column" v-if="this.currentViewStyle==0"
      :playlists="this.playlists" :dynamicComponent="'playlistExpansible'" :key="{'selected':selected}">
    </playlistContainer>
    <playlistContainer class="ul-grid" v-else
      :playlists="this.playlists" :dynamicComponent="'playlistCard'"  :key="{'selected':selected}">
    </playlistContainer>
  </div>
</template>

  <script>

  import playlistContainer from '@/components/playlistContainer.vue'

  import API from '@/axios/API'

  export default {
    name: 'YourPlaylistsView',
    components:
    {
      playlistContainer
    },
    data()
    {
      return {
        playlists:[],
        selected:'All',
        currentViewStyle:1,
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
            case "All": this.playlists = await API.get("users/"+this.login+"/playlists"); break;
            case "Created": this.playlists = await API.get("users/"+this.login+"/playlists/created"); break;
            case "Liked": this.playlists = await API.get("users/"+this.login+"/playlists/liked"); break;
          }
        },
        immediate: true
      }
    }
  }
  </script>