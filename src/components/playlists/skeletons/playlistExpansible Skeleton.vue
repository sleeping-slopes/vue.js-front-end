<template>
<div class = "playlist playlist-expansible">
  <div class="column gap-0">
    <div class="left-column">
      <div class="cover-wrapper s160x160 shimmer"></div>
      <skeleton class="button button-secondary h2 shimmer" :exactwidth="90"/>
    </div>
    <div class="empty-column-panel">
      <div class="empty-column-main"></div>
    </div>
  </div>
  <div class="right-column">
    <div class="row gap-10 y-center w-100">
      <div class= "info-wrapper column gap-0">
        <skeleton class="h4 shimmer"/>
        <skeleton class="h3 shimmer"/>
      </div>
    </div>
    <hr>
    <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
  </div>
</div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'playlistExpansibleSkeleton',
    components: { skeleton }
}

</script>