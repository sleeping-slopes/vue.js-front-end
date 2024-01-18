<template>
<div class = "playlist card">
  <div class="cover-wrapper s180x180 shimmer"></div>
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
  name: 'playlistCardSkeleton',
  extends: playlistSkeletonInterface
}

</script>