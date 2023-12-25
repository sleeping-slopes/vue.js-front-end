<template>
<div class = "playlist card">
  <div class="cover-wrapper s128x128">
    <div class = "cover"></div>
  </div>
  <div class= "info-wrapper">
    <skeleton class="h5"/>
    <skeleton class="h4"/>
  </div>
</div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'playlistCarouselCardSkeleton',
  components: { skeleton }
}

</script>

<style scoped>

.playlist-carousel .playlist.card
{
    width:128px;
}

</style>