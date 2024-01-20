<template>
<div class = "playlist-expansible">
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
    <!-- <div class="load">loading</div> -->
  </div>
</div>
</template>

<script>

import playlistSkeletonInterface from '@/components/playlists/skeletons/playlistSkeleton interface.vue';

import songItemSkeleton from "@/components/songs/skeletons/songItem Skeleton.vue";

export default
{
  name: 'playlistExpansibleSkeleton',
  extends: playlistSkeletonInterface,
  components: { songItemSkeleton }
}

</script>

<style scoped>

.playlist-expansible
{
    display:flex;
    max-height:288px;
    flex-direction: row;
    height:fit-content;
    flex-shrink: 0;
    width:100%;
}

.playlist-expansible.expanded
{
    max-height:624px;
}

.left-column
{
    display:flex;
    flex-direction: column;
    height:min-content;
    padding:5px;
    box-sizing: border-box;
    gap: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
    align-items: center;
    justify-content: space-between;
}

.right-column
{
    display:flex;align-items: center;
    flex-direction: column;
    width:100%;
    gap:5px;
    padding:5px;
    box-sizing: border-box;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
    min-height:253px;
}

.empty-column-panel
{
    height:100%;
    background-color: var(--panel-background-color);
}

.empty-column-main
{
    height:100%;
    background-color: var(--main-background-color);
    border-top-right-radius: 10px;
}

</style>