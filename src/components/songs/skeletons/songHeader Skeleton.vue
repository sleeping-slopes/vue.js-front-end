<template>
  <div class="row">
    <div class="cover-wrapper s100x100 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="font-size-big shimmer"></skeleton>
      <skeleton class="font-size-large shimmer"></skeleton>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'songHeaderSkeleton',
  components: { skeleton }
}

</script>