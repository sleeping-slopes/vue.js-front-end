<template>
    <div class = "song"
    v-on:click="setCurrentSong"
    v-bind:class="{'active': current}" >
        <div class = "wrapper-song-cover">
            <img class = "song-cover" v-if="this.songData.coversrc" :src="require(`../assets/covers/${this.songData.coversrc}`)"/>
            <div class = "song-cover bi bi-music-note" v-else/>
            <div class = "song-cover-shade"></div>
            <button class="round-button medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div class ="wave"></div>
                <div class ="wave"></div>
                <div class ="wave"></div>
            </div>
        </div>
        <div class= "song-info">
            <div class ="song-info-name">{{this.songData.songName}}</div>
            <div class ="song-info-artist">
                <div v-for="(artist,index) in this.songArtists">
                    <router-link class="artistlink" :to="'/discover/artist/'+artist.artistID" @click.stop>
                        {{artist.artistName}}
                    </router-link>
                    <span v-if="index+1 < this.songArtists.length">, </span>
                </div>
            </div>
        </div>
        <div class="songMenu">
            <button class="songButton bi bi-plus"></button>
            <button id ="deleteSongButton" class="songButton bi bi-x" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration" style="float:right;">{{ this.songDurationToMins }}</div>
    </div>
  </template>

<script>

import axios from "axios";

export default {
  name: 'playlistSong',
  props:
  {
    index: {type:Number, default: 0},
    songID: { type: Number, default: 0},
    songPosition: { type: Number, default: 0},
  },
  data()
  {
    return{
        songData:{},
        songArtists:{}
    }
  },
  computed:
  {
    current()
    {
        return this.$parent.current && this.songPosition === this.$store.getters.getCurrentSongPos;
    },
    isPlaying()
    {
        if (this.current) return this.$store.state.isPlaying;
        return false;
    },
    songDurationToMins()
    {
      return String(Math.floor(this.songDuration/60)).padStart(2,'0')+":"+String(this.songDuration%60).padStart(2,'0');
    }
  },
  created()
  {
    this.getSongData();
    this.getSongArtists();
  },
  methods:
  {
    setCurrentSong()
    {
        if (!this.current) this.$emit('setCurrentSong');
        else this.$store.state.isPlaying=!this.$store.state.isPlaying;
    },
    async getSongData()
    {
        const songDataRes = await axios.get("http://localhost:5000/songs/"+this.songID);
        this.songData = songDataRes.data[0];
    },
    async getSongArtists()
    {
        const songArtistsRes = await axios.get("http://localhost:5000/songs/"+this.songID+"/artists");
        this.songArtists = songArtistsRes.data;
        for (let i = 0;i<this.songArtists.length;i++)
        {
            if (!this.songArtists[i].artistName && this.songArtists[i].artistID)
            {
                const artistRes = await axios.get("http://localhost:5000/artists/"+this.songArtists[i].artistID);
                this.songArtists[i].artistName = artistRes.data[0].name;
            }
            if (!this.songArtists[i].artistName && !this.songArtists[i].artistID)
            {
                this.songArtists[i].artistName="unknown";
            }
        }
    }
  }
}



</script>

<style>

.song
{
    display:flex;
    width:100%;
    gap:5px;
    border-radius:10px;
    padding:5px;
    box-sizing: border-box;
    align-items: center;
    height:58px;
}

.player .song
{
    height:64px;
    padding:0px;
    font-size:1.25rem;
}

.wrapper-song-cover
{
    position:relative;
    border-radius: 20%;
    overflow:hidden;
    margin:auto;
    display:flex;
    justify-content: center;
    align-items: center;
}

.wrapper-song-cover
{
    min-width:48px;
    min-height:48px;
    max-width:48px;
    max-height:48px;
}

.player .wrapper-song-cover
{
    min-width:64px;
    min-height:64px;
    max-width:64px;
    max-height:64px;
}

.playlist .song
{
    cursor:pointer;
}

.wrapper-wave
{
    display:flex;
    width: 25px;
    height:25px;
    flex-shrink: 0;
    justify-content: space-between;
    align-items:flex-end;
    margin-top:auto;
    margin-bottom:auto;
    position: relative;
}

.wave
{
    width:5px;
    height:5px;
    border-radius: 5px;
    background:cornflowerblue;

}

.wrapper-wave.playing .wave
{
    animation: wave 0.6s linear infinite;
}

.wrapper-wave.playing .wave:nth-child(2)
{
    animation-delay: -0.2s;
}

.wrapper-wave.playing .wave:nth-child(3)
{
    animation-delay: -0.4s;
}

@keyframes wave
{
    0%   {height:50%;}
    50%  {height:100%;}
    100% {height:50%;}
}

.song-cover
{
    position: absolute;
    height:100%;
    width:100%;
    background-color:var(--panel-border-color);
    color:var(--text-color-secondary);
    align-items: center;
    display:flex;
    justify-content:center;
    font-size:2em;
}

.song .song-cover-shade
{
    visibility:hidden;
}

.song.active .song-cover-shade
{
    visibility:visible;
}

.song.active #deleteSongButton
{
    display:none;
}

.song:hover .song-cover-shade
{
    visibility:visible;
}

.song-cover-shade
{
    position:absolute;
    background-color: black;
    width:100%;
    height:100%;
}

.song .round-button
{
    position:absolute;
    visibility: hidden;
    background-color: var(--panel-background-color);
    color: var(--text-color-primary);
}

.song-info
{
    width:100%;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    justify-content: center;
    height:100%;
    overflow:hidden;
}

.song-info-name
{
    display: flex;
    align-items:center;
    width:100%;
    height:50%;
    white-space: nowrap;
    color: var(--text-color-primary);
    overflow:hidden;

}

.song-info-artist
{
    display: flex;
    align-items:center;
    width:100%;
    height:50%;
    white-space: nowrap;
    color: var(--text-color-secondary);
    overflow:hidden;

}

.artistlink
{
    text-decoration: none;
    overflow:hidden;

    color:inherit;
}

.artistlink:hover
{
    text-decoration: underline;
}


.song .songMenu
{
    display:none;
    gap:5px;
    height:100%;
}

.song:hover .song-duration
{
    display:none;
}

.song:hover .songMenu
{
    display:flex;
    align-items: center;
}

.songMenu .songButton
{
    display:inline;
    background:none;
    border:none;
    color: var(--text-color-secondary);
    cursor:pointer;
    padding:0px;
    margin:0px;
    transition:0.2s;
    font-size:1.5em;
}

.songMenu .songButton:hover
{
    color: var(--text-color-primary);
}

.song-duration
{
    margin: auto;
    text-align: center;
    color: var(--text-color-secondary);
}

.song .wrapper-wave
{
    visibility:hidden;
}

.song.active .wrapper-wave
{
    visibility:visible;
}

.song.active:hover .wrapper-wave
{
    visibility: hidden;
}

.playlist .song:hover
{
    background-color:var(--selected-item-background-color);
}

.song:hover .round-button
{
    visibility: visible;
}

.song .song-cover-shade
{
    opacity:0.4;
}

.song.active
{
    background-color: var(--selected-item-background-color);
}

</style>