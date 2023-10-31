<template>
    <div class = "playlistCard">
<<<<<<< Updated upstream
        <div class="playlist-cover-wrapper" v-on:click="$router.push($route.path+'/playlist/'+this.playlistID)">
            <img class = "playlist-cover" :src="require(`../assets/covers/${playlistCover}`)"/>
            <div class = "playlist-cover-shade"></div>
            <button class="playlist-button round-button large bi bi-play-fill"></button>
        </div>
        <div class= "song-info">
            <div href="#" class ="song-info-name" v-on:click="$router.push($route.path+'/playlist/'+this.playlistID)">{{playlistName}}</div>
            <a href="#" class ="song-info-artist">{{playlistArtist}}</a>
=======
        <div v-if="loading">
            <div class="playlist-cover-wrapper">
                <div class = "playlist-cover bi bi-music-note-list"/>
            </div>
            <div class= "song-info">
                <div class ="song-info-name">loading</div>
                <div class ="song-info-artist">loading</div>
            </div>
        </div>
        <div v-else>
            <div class="playlist-cover-wrapper" v-on:click="$router.push($route.path+'/playlist/'+this.playlist.id)">
                <img class = "playlist-cover" v-if="this.playlist.coversrc" :src="require(`../assets/covers/${this.playlist.coversrc}`)"/>
                <div class = "playlist-cover bi bi-music-note-list" v-else/>
                <div class = "playlist-cover-shade"></div>
                <div class = playlist-menu>
                    <button class="playlist-button round-button large bi bi-play-fill"></button>
                        <button class="playlist-button round-button medium bi bi-plus"></button>
                        <button class="playlist-button round-button medium bi bi-check"></button>
                </div>
            </div>
            <div class= "song-info">
                <div class ="song-info-name" v-on:click="$router.push($route.path+'/playlist/'+this.playlist.id)">{{this.playlist.name}}</div>
                <div class ="song-info-artist">
                    <div v-for="(artist,index) in this.playlist.artists">

                        <router-link v-if="artist.id" class="artistlink" :to="'/discover/artist/'+artist.id" @click.stop>
                            {{artist.name}}
                        </router-link>
                        <span class="artistlink" v-else>{{ artist.name }}</span>
                        <span v-if="index+1 < this.playlist.artists.length">, </span>
                    </div>
                </div>
            </div>
>>>>>>> Stashed changes
        </div>
    </div>

</template>

<script>

<<<<<<< Updated upstream
=======
import { getPlaylistData } from "@/axios/getters.js"

>>>>>>> Stashed changes
export default {
  name: 'playlistCard',
  computed:
  {
    routePath()
    {
        return this.$route.path+"/playlist/"+this.playlistID;
    }
  },
  methods:
  {

  },
  props:
  {
<<<<<<< Updated upstream
    playlistCover: { type: String, default: 'gorgorod2.jpg' },
    playlistID: {type: String, default:'test'},
    playlistName: {type: String, default:'Unnamed'},
    playlistArtist: {type: String, default:'Unknown'},

=======
    playlistID: {type: Number, default:-1},
  },
  data()
  {
    return {
      playlist:
      {
      },
      loading:true
    }
  },
  async mounted()
  {
    this.loading=true;
    this.playlist = await getPlaylistData(this.playlistID);
    this.loading=false;
>>>>>>> Stashed changes
  }
}
</script>

<style>

.playlistCard
{
    display:flex;
    flex-direction: column;
    padding-left:5px;
    padding-right:5px;
    box-sizing: border-box;
    min-width:calc(100%/7);
}



.playlist-cover-wrapper
{
    display:flex;
    border:2px solid var(--panel-border-color);
    border-radius:10px;
    flex-shrink: 0;
    width:100%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
    overflow:hidden;
    position:relative;
    justify-content: center;
    align-items: center;
}

.playlist-cover-shade
{
    position:absolute;
    background-color: black;
    width:100%;
    height:100%;
    opacity:0.0;
    transition: 0.2s all;
}

.playlist-cover
{
    width:100%;
    height:100%;
}

.playlist-cover-wrapper:hover .playlist-cover-shade
{
    opacity:0.4;
}

.playlist-menu
{
    position:absolute;
    /* background-color:red; */
    display:flex;
    flex-direction: column;
    align-items: center;
    height:100%;
    gap:5px;
    padding-top:20px;
    transition: 0.2s all;
    opacity:0.0;
}

.playlist-button:first-child
{
    margin-top:100%;
}

.playlist-button
{
    color:white;
}

.playlist-cover-wrapper:hover .playlist-menu
{
    opacity:1.0;
    padding-top:0px;
}


</style>