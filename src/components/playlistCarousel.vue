<template>
  <div class="playlist-carousel">
    <ul id="carousel-content" ref="carousel" v-if="playlists.length>0">
      <li v-for="(playlist) in playlists">
        <playlistCard :id="playlist.id"/>
      </li>
            <li v-for="(playlist) in playlists">
        <playlistCard :id="playlist.id"/>
      </li>
      <button class="carousel-button round-button medium bi bi-arrow-left-circle-fill" ref="leftScrollButton" style="left:-40px" v-on:click="shift(-1)"></button>
      <button class="carousel-button round-button medium bi bi-arrow-right-circle-fill" ref="rightScrollButton" style="right:10px" v-on:click="shift(1)"></button>
    </ul>
    <div class="songs-empty" v-else>
      <i class="bi bi-music-note-list"></i>
        No playlists here yet
    </div>
  </div>
  <router-view></router-view>
</template>

<script>

import playlistCard from '@/components/playlistCard.vue'

export default
{
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
      this.scrollPosition += i*Math.floor(this.$refs.carousel.offsetWidth/133)/2*133;
      // Math.floor(this.$refs.carousel.offsetWidth/128)/2;
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
  },
}
</script>

<style>

.playlist-carousel
{
  display:flex;
  position:relative;
  box-sizing: border-box;
  width:100%;
}

#carousel-content
{
  display:flex;
  width:100%;
  gap:5px;
  box-sizing: border-box;
  overflow-x:scroll;
  scroll-behavior: smooth;
  align-items: center;
  list-style: none;
  padding:0px;
  margin:0px;
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