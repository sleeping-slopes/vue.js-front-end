

<template>
  <teleport to=".app">
  <div class="modal-shade">
    <div class="modal">
      <panel style="width:640px;">
        <template v-slot:content v-if="this.playlist.error">
          <div class="songs-empty">
            <i class="bi bi-emoji-frown"></i>
            404
          </div>
        </template>
        <template v-slot:content v-else>
          <div class="playlist-header">
            <div class="playlist-cover-wrapper s160x160">
              <img class = "playlist-cover" v-if="imageAvailable" :src="`http://localhost:5000/api/playlists/`+this.id+`/cover`" @error="imageAvailable=false"/>
              <div class = "playlist-cover bi bi-music-note-list" v-else/>
              <div class = "playlist-cover-shade"></div>
              <button class="playlist-hover round-button huge bi bi-play-fill"></button>
            </div>

            <div class="playlist-info">
              <h2 class="primary-text">{{this.playlist.name}}</h2>

              <div class ="song-info h3">
                <span class="primary-text">by&nbsp;</span>
                  <div v-for="(artist,index) in this.playlist.artists">
                    <router-link class="artistlink primary-text" v-if="artist.login"
                        :to="'/id/'+artist.login"
                        @click.stop>
                        {{artist.name}}
                    </router-link>
                    <span class="primary-text" v-else>{{artist.name}}</span>
                    <span class="primary-text" v-if="index+1 < this.playlist.artists.length">, </span>
                  </div>
                </div>
                <div class ="song-info">
                <h4 class="secondary-text">
                  {{ abbreviateNumber(this.playlist.songs_count) }} song{{ this.playlist.songs_count!=1?'s':'' }}
                  <span class="bi bi-dot"></span>
                  {{ abbreviateNumber(this.playlist.likes_count) }} like{{ this.playlist.likes_count!=1?'s':'' }}
                </h4>
              </div>
              <div class="playlist-button-row">
                <button class="button-secondary" v-bind:class="{'toggled': this.playlist.liked}" v-on:click.stop="this.like()">
                  <div class="icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>Like{{ this.playlist.liked?'d':'' }}</span>
                  </div>
                </button>
                <button class="button-secondary">
                  <div class="icon-text">
                    <span class="bi bi-music-note-list"></span><span>Play next</span>
                  </div>
                </button>
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
import { abbreviateNumber } from "@/functions.js"

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
        if (this.playlist.liked)
        {
          await postLikePlaylist(this.id);
          this.playlist.likes_count++;
        }
        else
        {
          await deleteLikePlaylist(this.id);
          this.playlist.likes_count--;
        }
    },
    abbreviateNumber:abbreviateNumber
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
  /* background-color:red; */
}

.testbtn:hover
{
  color:var(--text-color-primary);

}

.playlist-header
{
  display:flex;
  box-sizing: border-box;
  gap:5px;
}

.playlist-info
{
  display:flex;
  flex-direction: column;
  width:100%;
  gap:0px;
  height:100%;
  box-sizing: border-box;

}

.playlist-button-row
{
  display:flex;
  margin-top:auto;
  align-items:flex-end;
  gap:5px;
}
</style>

