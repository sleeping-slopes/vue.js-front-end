

<template>
  <teleport to=".app">
  <div class="modal-shade">
    <div class="modal">
      <div class="panel" style="width:600px;">
        <div class="playlist-header">
          <img class = "playlist-modal-cover" v-if="this.playlistData.coversrc" :src="require(`../assets/covers/${this.playlistData.coversrc}`)"/>
          <div class = "playlist-modal-cover bi bi-music-note-list" v-else/>
          <div class="playlist-info">
            <div class="playlist-info-name">{{this.playlistData.name}}</div>
            <div class ="song-info-artist">
                <div v-for="(artist,index) in this.playlistArtists">
                    <router-link class="artistlink" :to="'/discover/artist/'+artist.artistID" @click.stop>
                        {{artist.artistName}}
                    </router-link>
                    <span v-if="index+1 < this.playlistArtists.length">, </span>
                </div>
            </div>
            <div class="playlist-button-row">
              <button class="testbtn bi bi-plus-lg">Add to my library</button>
            </div>
          </div>
        </div>
        <div class="panel-content" style="max-height:635px">
          <playlist
            :playlistID="this.$route.params.playlistID"
            :songs="songs"
          />
        </div>
      </div>
      <button class="bi bi-x modal-close-button" v-on:click="$router.back(-1)"/>
    </div>
  </div>
</teleport>
</template>

<script>

import playlist from "@/components/playlist.vue";
import axios from "axios";

export default {
  name: 'playlistModal',
  components: {playlist},
  computed:
  {

  },
  data()
  {
    return {
      playlistData:{},
      playlistArtists: [],
      songs:[]
    }
  },
  props:
  {

  },
  created()
  {
    this.getPlaylistSongs();
  },
  methods:
  {
    async getPlaylistSongs()
    {
      try
      {
        const playlistRes = await axios.get("http://localhost:5000/playlists/"+this.$route.params.playlistID);
        this.playlistData = playlistRes.data[0];
        const playlistArtistsRes = await axios.get("http://localhost:5000/playlists/"+this.playlistData.id+"/artists");
        this.playlistArtists = playlistArtistsRes.data;
        const playlistSongsRes = await axios.get("http://localhost:5000/playlists/"+this.$route.params.playlistID+"/songs");
        // const songs = playlistSongsRes.data;
        // console.log(songs[1].coversrc===null);
        this.songs = playlistSongsRes.data;
        for (let i = 0;i<this.songs.length;i++)
        {
          const songArtistsRes = await axios.get("http://localhost:5000/songs/"+this.songs[i].songID+"/artists");
          this.songs[i].artists = songArtistsRes.data;
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

.modal-shade
{
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  display:flex;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
}

.modal
{
  top:64px;
  position:relative;
  display:flex;
  height:fit-content;
}

.modal-close-button
{
  position:absolute;
  left:100%;
  top:0;
  font-size:48px;
  padding:0px;
  margin:0px;
  background-color: transparent;
  color:white;
  border:none;
  cursor:pointer;
}

.playlist-modal-cover
{
  width:128px;
  height:128px;
  border-radius:5px;
  overflow:hidden;

  background-color:var(--panel-border-color);
  color:var(--text-color-secondary);
  align-items: center;
  display:flex;
  justify-content:center;
  font-size: 48px;
}

.testbtn
{
  background:none;
  border:none;
  font-size:18px;
  font-family: "Kanit regular", sans-serif;
  cursor:pointer;
  color:var(--text-color-secondary);
  padding:0px;
  /* background-color:blue; */
  transition:all 0.2s;
  white-space: nowrap;
}

.testbtn:hover
{
  color:var(--text-color-primary);

}

.playlist-header
{
    padding:5px;
    display:flex;
    box-sizing: border-box;
    border-bottom: 2px solid var(--panel-border-color);
}

.playlist-info
{
  padding:10px;

  display:flex;
  flex-direction: column;
  position:relative;

}

.playlist-info-name
{
  /* background-color:yellow; */
  font-size:24px;
  font-family: "Kanit semibold", sans-serif;
  color: var(--text-color-primary);
}

.playlist-info-artist
{
  /* background-color:blue; */
  font-size:16px;
  font-family: "Kanit regular", sans-serif;
  color: var(--text-color-secondary);
}

.playlist-button-row
{
  display:flex;
  height:100%;
  align-items:flex-end;
}

</style>

