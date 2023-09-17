<template>
  <div class="browser">
      <div class="panel" style="flex-shrink:0; width:100%; height:max-content">
        <div class="panel-header">Playlists</div>
        <div class="panel-content">
          <playlistCarousel :playlists="playlists"/>
        </div>

      </div>

  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue';
import axios from "axios";


export default {
  name: 'discover',
  components:
  {
    playlistCarousel
  },
  data()
  {
    return {
      playlists:[]
    }
  },
  created()
  {
    this.getPlaylists();
  },
  methods:
  {
    async getPlaylists()
    {
      try
      {
        const playlistsRes = await axios.get("http://localhost:5000/playlists");
        this.playlists = playlistsRes.data;
        for (let i = 0;i<this.playlists.length;i++)
        {
          const playlistArtistsRes = await axios.get("http://localhost:5000/playlists/"+this.playlists[i].id+"/artists");
          this.playlists[i].artists = playlistArtistsRes.data;
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }
  },
}
</script>

<style>

</style>