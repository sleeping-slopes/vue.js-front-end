<template>
    <div class="playlist-carousel">
      <button class="carousel-button round-button medium bi bi-arrow-left-circle-fill" ref="leftScrollButton" style="left:-40px" v-on:click="shift(-1)"></button>
      <button class="carousel-button round-button medium bi bi-arrow-right-circle-fill" ref="rightScrollButton" style="right:10px" v-on:click="shift(1)"></button>
      <div id="carousel-content" ref="carousel">
      <playlistCard v-for="(playlist) in playlists"
        :playlistID="playlist.playlistID"
        :cover="playlist.cover"
        :playlistName="playlist.playlistName"
        :playlistArtist="playlist.playlistArtist"
      />
      </div>
    </div>
</template>

<script>

import playlistCard from '@/components/playlistCard.vue'

export default {
  name: 'carousel',
  components:
  {
    playlistCard
  },
  data()
  {
    return {
      scrollPosition:0
    }
  },
  methods:
  {
    shift(i)
    {
      this.scrollPosition += i*this.$refs.carousel.offsetWidth/7*3;
      if (this.scrollPosition<=0)
      {
        this.scrollPosition=0;
        this.$refs.leftScrollButton.style.left="-40px";
      }
      else
      {
        this.$refs.leftScrollButton.style.left="10px";
      }
      if (this.scrollPosition>=this.$refs.carousel.scrollWidth-this.$refs.carousel.offsetWidth)
      {
        this.scrollPosition=this.$refs.carousel.scrollWidth-this.$refs.carousel.offsetWidth;
        this.$refs.rightScrollButton.style.right="-40px";
      }
      else
      {
        this.$refs.rightScrollButton.style.right="10px";
      }
      this.$refs.carousel.scroll(this.scrollPosition,0);
    }
  },
  props:
  {
    playlists: {type:Array,default:[]}
  }
}
</script>

<style>

.playlist-carousel
{
  display:flex;
  position:relative;
  align-items: center;
}

#carousel-content
{
  display:flex;
  align-items: center;
  box-sizing: border-box;
  overflow-x:scroll;
  scroll-behavior: smooth;
}

#carousel-content::-webkit-scrollbar
{
    display: none;
}

#carousel-content
{
-ms-overflow-style: none;
scrollbar-width: none;
}



.carousel-button
{
  position:absolute;
  color: var(--panel-border-color);
  background-color: var(--text-color-secondary);
  opacity:0.0;
  transition: all 0.2s;
}

.playlist-carousel:hover .carousel-button
{
  opacity:0.8;
}

.carousel-button:hover
{
  background-color: var(--text-color-primary);
}
</style>