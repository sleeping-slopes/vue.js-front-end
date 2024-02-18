<template>
<div class="song item">
  <div class="cover-wrapper s52x52 shimmer"></div>
  <div class="info-wrapper">
    <skeleton class="font-size-small shimmer"></skeleton>
    <skeleton class="font-size-medium shimmer"></skeleton>
    <div class="row bottom">
      <skeleton class="font-size-tiny shimmer" :exactwidth="30"></skeleton>
      <skeleton class="font-size-tiny shimmer" :exactwidth="30"></skeleton>
    </div>
  </div>
</div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'songExtendedSkeleton',
  components: { skeleton }
}

</script>