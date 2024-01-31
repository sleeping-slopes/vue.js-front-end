<template>
  <div class="user card">
    <div class="user-image s180x180 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="h3 shimmer"/>
      <skeleton class="h5 shimmer" :exactwidth="90"/>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'userCardSkeleton',
  components: { skeleton }
}

</script>