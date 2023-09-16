<template>
    <div class = "playlistCard">
        <div class="playlist-cover-wrapper" v-on:click="$router.push($route.path+'/playlist/'+this.playlistID)">
            <!-- <img class = "playlist-cover" :src="require(`../assets/covers/${playlistCover}`)"/> -->
            <img class = "playlist-cover" v-if="playlistCover" :src="require(`../assets/covers/${playlistCover}`)"/>
            <div class = "playlist-cover bi bi-music-note-list" v-else/>
            <div class = "playlist-cover-shade"></div>
            <button class="playlist-button round-button large bi bi-play-fill"></button>
        </div>
        <div class= "song-info">
            <div href="#" class ="song-info-name" v-on:click="$router.push($route.path+'/playlist/'+this.playlistID)">{{playlistName}}</div>
            <div class ="song-info-artist">
                <div v-for="(artist,index) in this.playlistArtists">
                    <router-link class="artistlink" :to="'/discover/artist/'+artist.artistID" @click.stop>
                        {{artist.artistName}}
                    </router-link>
                    <span v-if="index+1 < this.playlistArtists.length">, </span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

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
    playlistCover: { type: String },
    playlistID: {type: Number, default:-1},
    playlistName: {type: String, default:'Unnamed'},
    playlistArtists: { type: Array, default: [[{"artistID":-1,"artistName":"Unknown artist"}]] },
  },
  created()
  {
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
    background-color:var(--panel-border-color);
    color:var(--text-color-secondary);
    align-items: center;
    display:flex;
    justify-content:center;
    font-size: 60px;
}

.playlist-cover-wrapper:hover .playlist-cover-shade
{
    opacity:0.4;
}

.playlist-button
{
    position:absolute;
    opacity:0.0;
    padding-top:20px;
    transition: 0.2s all;
    color:white;
}

.playlist-cover-wrapper:hover .playlist-button
{
    opacity:1.0;
    padding-top:0px;
}


</style>