<template>

  <div class="browser">
    <div style="display:flex;flex-direction: column; width:100%; overflow: hidden; gap:10px;">
    <playlistCarousel :playlists="playlists"/>
    <div class="panel" style="height:100%;">
        <div class="panel-header">Songs</div>
        <div class="panel-content">
        <!-- <playlist
          :songs="discoverPlaylist.songs"
          :playlistID="discoverPlaylist.playlistID"
        /> -->
        </div>
      </div>
  </div>
  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue';
import playlist from '@/components/playlist.vue';
import axios from "axios";


export default {
  name: 'discover',
  components:
  {
    playlistCarousel,playlist
  },
  data()
  {
    return {
      playlists:[],
      discoverPlaylist:
      {
        playlistID:'discover',
        songs:
        [
        ]
      },
    }
  },
  created()
  {
    this.getPlaylists();
    this.getSongs();
  },
  methods:
  {
    async getPlaylists()
    {
      try
      {
        const playlistsRes = await axios.get("http://localhost:5000/playlists");
        this.playlists = playlistsRes.data;
      }
      catch(err)
      {
        console.log(err);
      }
    },
    async getSongs()
    {
      try
      {
        const songsRes = await axios.get("http://localhost:5000/songs");
        this.discoverPlaylist.songs = songsRes.data;
        for (let i = 0;i<this.discoverPlaylist.songs.length;i++)
        {
          const songArtistsRes = await axios.get("http://localhost:5000/songs/"+this.discoverPlaylist.songs[i].id+"/artists");
          this.discoverPlaylist.songs[i].artists = songArtistsRes.data;
          this.discoverPlaylist.songs[i].songPosition = i;
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }
  }
}
</script>

<style>

</style>