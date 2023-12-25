<template>
  <div class = "song item">
    <div class = "cover-wrapper s36x36">
      <div class = "cover"/>
    </div>
    <div class= "info-wrapper">
      <skeleton class="h5"/>
      <skeleton class="h4"/>
    </div>
  </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
  name: 'songSkeleton',
  components: { skeleton }
}

</script>
