<template>
<div class="song item">
  <div class="cover-wrapper s52x52 shimmer"></div>
  <div class="info-wrapper">
    <skeleton class="h5 shimmer"/>
    <skeleton class="h4 shimmer"/>
    <div class="row bottom">
      <skeleton class="h6 shimmer" :exactwidth="30"/>
      <skeleton class="h6 shimmer" :exactwidth="30"/>
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