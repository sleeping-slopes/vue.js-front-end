<template>
<div class = "playlist card">
  <div class="cover-wrapper s128x128 shimmer"></div>
  <div class= "info-wrapper column gap-0">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
  </div>
</div>
</template>

<script>

import playlistSkeletonInterface from '@/components/playlists/skeletons/playlistSkeleton interface.vue';

export default
{
  name: 'playlistCarouselCardSkeleton',
  extends: playlistSkeletonInterface
}

</script>

<style scoped>

.playlist-carousel .playlist.card
{
    width:128px;
}

</style>