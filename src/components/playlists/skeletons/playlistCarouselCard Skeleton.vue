<template>
<div class = "playlist card">
  <div class="cover-wrapper s128x128 shimmer"></div>
  <div class= "info-wrapper">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
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