

<template>
  <teleport to=".app">
  <div class="modal-shade">
    <div class="modal">
      <panel style="width:600px;">
        <template v-slot:content v-if="this.playlist.error">
          <div class="songs-empty">
            <i class="bi bi-emoji-frown"></i>
            404
          </div>
        </template>
        <template v-slot:content v-else>
          <div class="playlist-header">
            <img class = "playlist-modal-cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
            <div class = "playlist-modal-cover bi bi-music-note-list" v-else/>
            <div class="playlist-info">
              <div class="primary-text">{{this.playlist.name}}</div>
              <div class ="song-info-artist">
                  <div v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink secondary-text" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span class="secondary-text" v-else>{{artist.name}}</span>
                    <span class="secondary-text" v-if="index+1 < this.playlist.artists.length">, </span>
                  </div>
              </div>
              <div class="playlist-button-row">
                <button class="testbtn bi bi-suit-heart-fill" v-bind:style="this.playlist.liked?{'color':'var(--accent-color)'}:{}" v-on:click.stop="this.like()">Like</button>
              </div>
            </div>
          </div>
          <hr/>
          <div style="max-height:635px">
            <playlist
              :id="this.id"
              :songs="this.songs"
            />
          </div>
        </template>
      </panel>
      <button class="bi bi-x modal-close-button" v-on:click="$router.back(-1)"/>
    </div>
  </div>
</teleport>
</template>

<script>

import panel from "@/components/panel.vue";
import playlist from "@/components/playlist.vue";

import { getPlaylist, getPlaylistSongs} from "@/axios/getters.js"
import { postLikePlaylist } from "@/axios/getters"
import { deleteLikePlaylist } from "@/axios/getters"

export default
{
  name: 'playlistModal',
  components:
  {
    panel,playlist
  },
  computed:
  {

  },
  props:
  {
    id:{default:"noid"}
  },
  data()
  {
    return {
      playlist:
      {
        data:{},
        artists:[]
      },
      songs: [],
      imageAvailable:true,
    }
  },
  async mounted()
  {
    this.playlist = await getPlaylist(this.id);
    this.songs = await getPlaylistSongs(this.id);
  },
  methods:
  {
    async like()
    {
        this.playlist.liked=!this.playlist.liked;
        if (this.playlist.liked) await postLikePlaylist(this.id);
        else await deleteLikePlaylist(this.id);
    }
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
  z-index:999;
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
  padding:0px;
  margin:0px;
  background-color: transparent;
  color:white;
  border:none;
  cursor:pointer;
  font-size:48px;
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
  font-size:64px;
}

.testbtn
{
  background:none;
  border:none;
  cursor:pointer;
  color:var(--text-color-secondary);
  padding:0px;
  transition:all 0.2s;
  white-space: nowrap;
  font-size:20px;

}

.testbtn:hover
{
  color:var(--text-color-primary);

}

.playlist-header
{
  display:flex;
  box-sizing: border-box;
}

.playlist-info
{
  padding:10px;
  display:flex;
  flex-direction: column;
  position:relative;
}

.playlist-button-row
{
  display:flex;
  height:100%;
  align-items:flex-end;
}
</style>

