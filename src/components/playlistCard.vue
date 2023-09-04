<template>
    <div class = "playlistCard">
        <img class = "playlist-cover" :src="require(`../assets/covers/${cover}`)"/>
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
}

.playlist-cover
{
    display:flex;
    width:128px;
    height:128px;
    border-radius:10px;
    flex-shrink: 0;
}

</style>