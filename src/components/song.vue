<template>
    <div class = "song"
    v-on:click="$emit('setCurrentSong')"
    v-bind:class="{'active': current}" >
        <div class = "wrapper-song-cover">
            <img class = "song-cover" :src="require(`../assets/covers/${cover}`)"/>
            <div class = "song-cover-shade"></div>
            <button class="round-button" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div class ="wave"></div>
                <div class ="wave"></div>
                <div class ="wave"></div>
            </div>
        </div>
        <div class= "song-info">
            <div class ="song-info-name">{{songName}}</div>
            <a href="#" class ="song-info-artist">{{songArtist}}</a>
        </div>
        <div class="songMenu">
            <button class="songButton bi bi-plus"></button>
            <button id ="deleteSongButton" class="songButton bi bi-x" v-on:click.stop="$emit('deleteSong')" ></button>
        </div>
        <div class = "song-duration" style="float:right;">{{ this.songDurationToMins }}</div>
    </div>
  </template>

<script>

export default {
  name: 'playlistSong',
  props:
  {
    index: {type:Number, default: 0},
    songID: { type: Number },
    audio: { type: String, default: 'no-cover.png' },
    cover: { type: String, default: 'gorgorod2.jpg' },
    songName: { type: String, default: 'Без названия' },
    songArtist: { type: String, default: 'Неизвестный' },
    songDuration: { type: Number, default: 0 }
  },
  computed:
  {
    current()
    {
        return this.$parent.current && this.index === this.$store.state.currentSongIndex;
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
}

.wrapper-song-cover
{
    position:relative;
    border-radius: 20%;
    overflow:hidden;
    margin:auto;
    display:flex;
    justify-content: center;
    user-select: none;
    align-items: center;
}

.playlist .wrapper-song-cover
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
    user-select: none;
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
    background-color: var(--panel-background-color);
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
}

.song-info-name
{
    width:100%;
    height:50%;
    font-family: "Kanit regular", sans-serif;
    font-size:16px;
    white-space: nowrap;
    position:relative;
    color: var(--text-color-primary);
    display: flex;
    align-items:center;
}

.song-info-artist
{
    width:100%;
    height:50%;
    font-family: "Kanit regular", sans-serif;
    font-size:16px;
    white-space: nowrap;
    position:relative;
    color: var(--text-color-secondary);
    text-decoration: none;
    display: flex;
    align-items:center;
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
    font-size:24px;
    padding:0px;
    margin:0px;
    transition:0.2s;
}

.songMenu .songButton:hover
{
    color: var(--text-color-primary);
}

.song-info-artist:hover
{
    text-decoration: underline;
}

.song-duration
{
    font-size:14px;
    font-family: "Kanit regular", sans-serif;
    margin: auto;
    text-align: center;
    color: var(--text-color-secondary);
    user-select:none;
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
    opacity:0.5;
}

.song.active
{
    background-color: var(--selected-item-background-color);
}

</style>
