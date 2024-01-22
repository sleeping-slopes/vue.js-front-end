<template>
  <div class = "song item">
    <div class = "cover-wrapper s36x36 shimmer"></div>
    <div class= "info-wrapper column gap-0">
      <skeleton class="h5 shimmer"/>
      <skeleton class="h4 shimmer"/>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'songItemSkeleton',
  components: { skeleton }
}

</script>
