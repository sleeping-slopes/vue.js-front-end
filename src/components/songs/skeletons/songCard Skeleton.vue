<template>
  <div class = "song card">
    <div class = "cover-wrapper s180x180 shimmer"></div>
    <div class= "info-wrapper column gap-0">
      <skeleton class="h5 shimmer"/>
      <skeleton class="h4 shimmer"/>
    </div>
  </div>
</template>

<script>

import songSkeletonInterface from '@/components/songs/skeletons/songSkeleton interface.vue';

export default
{
  name: 'songCardSkeleton',
  extends: songSkeletonInterface
}

</script>
