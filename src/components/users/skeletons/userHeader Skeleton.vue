<template>
<div class="row">
    <div class="user-image s100x100 shimmer"></div>
    <div class="info-wrapper">
        <skeleton class="font-size-large shimmer" :minwidth="200" :maxwidth="400"></skeleton>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'userHeaderSkeleton',
  components: { skeleton }
}

</script>