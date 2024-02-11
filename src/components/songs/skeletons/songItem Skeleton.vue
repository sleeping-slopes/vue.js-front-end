<template>
  <div class="song item">
    <div class="cover-wrapper s36x36 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="font-size-small shimmer"/>
      <skeleton class="font-size-medium shimmer"/>
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
