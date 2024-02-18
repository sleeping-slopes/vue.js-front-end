<template>
  <div class="user card">
    <div class="user-image s180x180 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="font-size-big shimmer"></skeleton>
      <skeleton class="font-size-small shimmer" :exactwidth="90"></skeleton>
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