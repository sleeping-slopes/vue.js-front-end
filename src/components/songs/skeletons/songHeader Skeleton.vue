<template>
  <div class="row">
    <div class="cover-wrapper s100x100 shimmer"></div>
    <div class="info-wrapper">
      <skeleton class="font-size-big shimmer" :minwidth="150" :maxwidth="300"></skeleton>
      <skeleton class="font-size-large shimmer" :minwidth="200" :maxwidth="400"></skeleton>
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