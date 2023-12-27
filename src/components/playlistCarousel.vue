<template>
  <div class="playlist-carousel">
    <playlistContainer class="carousel-content hidden-scroll" ref="carousel"
      :playlists="this.playlists"
      :dynamicComponent="'playlistCarouselCard'">
    </playlistContainer>
    <button class="carousel-button round-button medium bi bi-arrow-left-circle-fill" ref="leftScrollButton" style="left:-40px" v-on:click="shift(-1)"></button>
    <button class="carousel-button round-button medium bi bi-arrow-right-circle-fill" ref="rightScrollButton" style="right:10px" v-on:click="shift(1)"></button>
  </div>
</template>

<script>

import playlistContainer from '@/components/playlistContainer.vue'

export default
{
  name: 'carousel',
  components:
  {
    playlistContainer
  },
  props:
  {
    playlists:{default: []}
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

.carousel-content
{
  display:flex;
  width:100%;
  gap:10px;
  box-sizing: border-box;
  overflow-x:scroll;
  scroll-behavior: smooth;
  align-items: center;
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
  opacity:0.9;
}

.carousel-button:hover
{
  background-color: var(--text-color-primary);
}
</style>