<template>
    <div class = "playlistCard">
        <div class="playlist-cover-wrapper">
            <img class = "playlist-cover" :src="require(`../assets/covers/${cover}`)"/>
            <div class = "playlist-cover-shade"></div>
        </div>

        <div class= "song-info">
            <div class ="song-info-name">{{playlistName}}</div>
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

.playlist-cover-wrapper:hover .playlist-cover-shade
{
    opacity:0.4;
}


.playlist-cover
{
    width:100%;
    height:100%;
}

</style>