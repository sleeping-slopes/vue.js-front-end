<template>
  <div class="carousel">
    <div class="carousel-content scroll-hidden" ref="carousel" @scroll="this.scroll">
      <slot name="content"></slot>
    </div>
    <button class="button button-default button-round button-medium bi bi-arrow-left-circle-fill" ref="leftScrollButton" v-bind:style="{'left':this.leftVisible?'10px':'-40px'}"  v-on:click="shift(-1)"></button>
    <button class="button button-default button-round button-medium bi bi-arrow-right-circle-fill" ref="rightScrollButton" v-bind:style="{'right':this.rightVisible?'10px':'-40px'}" v-on:click="shift(1)"></button>
  </div>
</template>

<script>

import playlistContainer from '@/components/containers/playlistContainer.vue'

export default
{
  name: 'carousel',
  components: { playlistContainer },
  data()
  {
    return {
      scrollPosition:0,
      maxScroll: undefined,
      resizeObserver: undefined
    }
  },
  computed:
  {
    leftVisible() { return this.scrollPosition>0 },
    rightVisible() { return this.scrollPosition<this.maxScroll }
  },
  mounted()
  {
    this.resizeObserver = new ResizeObserver(this.sizeChanged);
    this.resizeObserver.observe(this.$refs.carousel);
  },
  beforeUnmount()
  {
    this.resizeObserver.disconnect();
  },
  methods:
  {
    sizeChanged()
    {
      this.maxScroll = this.$refs.carousel.scrollWidth - this.$refs.carousel.offsetWidth;
    },
    scroll(e)
    {
      this.scrollPosition = e.target.scrollLeft;
    },
    shift(i)
    {
      this.scrollPosition += i*(128+10)*2;
      this.scrollPosition = Math.max(0,this.scrollPosition);
      this.scrollPosition = Math.min(this.scrollPosition,this.maxScroll);
      this.$refs.carousel.scroll(this.scrollPosition,0);
    }
  },
}
</script>

<style scoped>

.carousel
{
  position:relative;
  width:100%;
}

.carousel > .button
{
  position:absolute;
  background-color:var(--text-color-primary);
  color: var(--text-color-secondary);
  opacity:0.0;
  transition: all 0.2s;
  top:50%;
  transform: translate(0,-50%);
}

.carousel:hover > .button
{
  opacity:0.75;
}

.carousel > .button:hover
{
  opacity:0.9;
}

.carousel-content
{
  overflow-x:scroll;
  scroll-behavior: smooth;
  width:100%;
}

</style>