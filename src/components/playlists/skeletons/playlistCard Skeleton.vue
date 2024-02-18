<template>
<div class="playlist card">
  <div class="cover-wrapper s180x180 shimmer"></div>
  <div class="info-wrapper">
    <skeleton class="font-size-small shimmer"></skeleton>
    <skeleton class="font-size-medium shimmer"></skeleton>
  </div>
</div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'playlistCardSkeleton',
    components: { skeleton }
}

</script>