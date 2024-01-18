<template>
<div class = "song item">
  <div class = "cover-wrapper s52x52 shimmer"></div>
  <div class= "info-wrapper column gap-0">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
    <div class="row">
      <skeleton class="h6 shimmer" :exactwidth="50"/>
      <skeleton class="h6 shimmer" :exactwidth="50"/>
    </div>
  </div>
</div>
</template>

<script>

import songSkeletonInterface from '@/components/songs/skeletons/songSkeleton interface.vue';

export default
{
  name: 'songExtendedSkeleton',
  extends: songSkeletonInterface
}

</script>