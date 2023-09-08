<template>
    <div class = "playlistCard">
        <a href="#" class="playlist-cover-wrapper">
            <img class = "playlist-cover" :src="require(`../assets/covers/${cover}`)"/>
            <div class = "playlist-cover-shade"></div>
            <button class="playlist-button round-button large bi bi-play-fill"></button>
        </a>

        <div class= "song-info">
            <a href="#" class ="song-info-name">{{playlistName}}</a>
            <a href="#" class ="song-info-artist">{{playlistArtist}}</a>
        </div>
    </div>
</template>

<script>

export default {
  name: 'playlistCard',
  computed:
  {

  },
  methods:
  {

  },
  props:
  {
    cover: { type: String, default: 'gorgorod2.jpg' },
    playlistID: {type: String, default:'test'},
    playlistName: {type: String, default:'Unnamed'},
    playlistArtist: {type: String, default:'Unknown'},
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
    border:2px solid var(--text-color-primary);
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