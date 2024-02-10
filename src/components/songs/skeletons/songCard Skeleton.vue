<template>
  <div class="song card">
    <div class="cover-wrapper s180x180 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="h5 shimmer"/>
      <skeleton class="h4 shimmer"/>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'songCardSkeleton',
  components: { skeleton }
}

</script>
