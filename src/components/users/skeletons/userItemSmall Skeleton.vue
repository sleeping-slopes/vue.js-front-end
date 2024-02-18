<template>
  <div class="user item">
    <div class="user-image s52x52 shimmer"></div>
    <div class="info-wrapper gap-10">
      <skeleton class="font-size-big shimmer"></skeleton>
      <div class="row">
        <skeleton class="font-size-small shimmer" :exactwidth="30"></skeleton>
        <skeleton class="font-size-small shimmer" :exactwidth="30"></skeleton>
      </div>
    </div>
    <skeleton class="button button-secondary shimmer" :exactwidth="90"></skeleton>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'userItemSmallSkeleton',
  components: { skeleton }
}

</script>