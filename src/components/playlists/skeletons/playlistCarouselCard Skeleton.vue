<template>
<div class = "playlist card">
  <div class="cover-wrapper s128x128 shimmer"/>
  <div class= "info-wrapper column gap-0">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
  </div>
</div>
</template>

<script>


import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue';

export default
{
  name: 'playlistCarouselCardSkeleton',
  extends: playlistCardSkeleton
}

</script>

<style scoped>

.playlist-carousel .playlist.card
{
    width:128px;
}

</style>