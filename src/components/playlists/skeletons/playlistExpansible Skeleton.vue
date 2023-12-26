<template>
<div class = "playlist-expansible">
  <div style="display:flex;flex-direction: column;">
    <div class="left-column">
      <div class="cover-wrapper s160x160">
        <div class = "cover"/>
      </div>
      <skeleton class="button-secondary h6" style="margin:auto" :exactwidth="100"/>
    </div>
    <div class="empty-column-panel">
      <div class="empty-column-main"></div>
    </div>
  </div>
  <div class="right-column">
    <div style="display:flex;flex-direction: row; gap:10px; align-items: center;">
      <div class= "info-wrapper">
        <skeleton class="h4"/>
        <skeleton class="h3"/>
      </div>
    </div>
    <hr>
    <div class="ul-list" style="overflow-y:auto">
      <songSkeleton/>
      <songSkeleton/>
      <songSkeleton/>
      <songSkeleton/>
    </div>
  </div>
</div>
</template>

<script>

import songSkeleton from "@/components/songs/skeletons/song Skeleton.vue";

import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue';

export default
{
  name: 'playlistCarouselCardSkeleton',
  components: { songSkeleton },
  extends: playlistCardSkeleton
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
    transition: 0.5s all;
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
    gap:5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: var(--panel-background-color);
}

.right-column
{
    display:flex;
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