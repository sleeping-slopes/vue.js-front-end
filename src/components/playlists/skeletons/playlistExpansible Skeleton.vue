<template>
<div class="playlist playlist-expansible">
  <div class="column gap-0">
    <div class="left-column">
      <div class="cover-wrapper s160x160 shimmer"></div>
      <skeleton class="button button-secondary shimmer" :exactwidth="90"></skeleton>
    </div>
    <div class="empty-column-bg-panel">
      <div class="empty-column-bg-main"></div>
    </div>
  </div>
  <div class="right-column">
    <div class="row gap-10 y-center w-100">
      <button class="button button-default button-round button-medium toggled bi bi-play-circle-fill"></button>
      <div class="info-wrapper">
        <skeleton class="font-size-medium shimmer"></skeleton>
        <skeleton class="font-size-big shimmer"></skeleton>
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