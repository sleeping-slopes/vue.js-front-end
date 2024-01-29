<template>
  <div class = "card user-card">
    <div class = "user-image s180x180 shimmer"></div>
    <div class= "info-wrapper column gap-0">
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

<style scoped>

.user-card .info-wrapper
{
  align-items: center;
}

</style>