

<template>
  <teleport to=".app">
  <div class="modal-shade">
    <div class="modal">
      <div class="panel" style="width:600px;">
        <div class="playlist-header">
<<<<<<< Updated upstream
          <img src='@/assets/covers/WARLORD.jpg' style="width:128px;height:128px;border-radius:10px; overflow:hidden">
          <div class="playlist-info">
            <div class="playlist-info-name">Warlord</div>
            <div class="playlist-info-artist">Yung Lean</div>
=======
          <img class = "playlist-modal-cover bi bi-music-note-list" v-if="this.playlist.coversrc" :src="require(`../assets/covers/${this.playlist.coversrc}`)"/>
          <div class = "playlist-modal-cover bi bi-music-note-list" v-else/>
          <div class="playlist-info">
            <div class="playlist-info-name">{{this.playlist.name}}</div>
            <div class ="song-info-artist">
                <div v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink" :to="'/discover/artist/'+artist.id" @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span v-if="index+1 < this.playlist.artists.length">, </span>
                </div>
            </div>
>>>>>>> Stashed changes
            <div class="playlist-button-row">
              <button class="testbtn bi bi-plus-lg">Add to my library</button>
            </div>
          </div>
        </div>
        <div class="panel-content" style="max-height:635px">
          <playlist
<<<<<<< Updated upstream
            :playlistID="this.$store.state.currentPlaylist.playlistID"
            :songs="this.$store.state.currentPlaylist.songs"
=======
            :playlistID="this.playlist.id+''"
            :songs="this.songs"
>>>>>>> Stashed changes
          />
        </div>
      </div>
      <button class="bi bi-x modal-close-button" v-on:click="$router.back(-1)"/>
    </div>
  </div>
</teleport>
</template>

<script>

<<<<<<< Updated upstream
import playlist from "@/components/playlist.vue"
=======
import playlist from "@/components/playlist.vue";
import { getPlaylistData, getPlaylistSongs} from "@/axios/getters.js"
>>>>>>> Stashed changes

export default {
  name: 'playlistModal',
  components: {playlist},
  computed:
  {

  },
  methods:
  {

  },
<<<<<<< Updated upstream
  props:
  {

=======
  async mounted()
  {
    this.playlist = await getPlaylistData(this.playlistID);
    this.songs = await getPlaylistSongs(this.playlistID);
>>>>>>> Stashed changes
  }
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

