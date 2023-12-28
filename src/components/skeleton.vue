<template>
    <span class="skeleton" v-bind:style="{'width':this.width+'px'}"></span>
</template>

<script>

export default
{
  name: 'skeleton',
  props:
  {
      minwidth: {default: 80},
      maxwidth: {default: 150},
      exactwidth: {default: 0}
  },
  computed:
  {
      width() { return this.exactwidth || this.minwidth+Math.random()*(this.maxwidth-this.minwidth) }
  }
}

</script>

<style>

.skeleton
{
    background-color: var(--panel-border-color);
    color: var(--panel-border-color);
    height:1.0em;
    border-radius: 5px;
    max-width:100%;
}

.skeleton.button-secondary
{
    background-color: var(--panel-border-color);
    border:none;
}

.info-wrapper:has(.skeleton)
{
    justify-content: space-between;
}

.song .row
{
    height:min-content;
}

.card .info-wrapper:has(.skeleton), .playlist-expansible .right-column .info-wrapper:has(.skeleton)
{
    gap:7px;
}

.shimmer::before
{
  content:'';
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
  position:absolute;
  background-image: repeating-linear-gradient(45deg,
    rgba(0,0,0,0) 0px,
    rgba(255,255,255,0.1) 10px,
    rgba(0,0,0,0) 40px,
    rgba(0,0,0,0) 600px);
  background-attachment: fixed;
  background-size: 848px 848px;
  animation: shimmer linear infinite 1s;
}

.shimmer
{
  position:relative;
  background-color: var(--panel-border-color);
  overflow: hidden;
}


@keyframes shimmer
{
  0% { background-position: 0px 0px; }
  100% { background-position: -848px 0px; }
}

</style>