<template>
    <div class = "song item">
    <div class = "cover-wrapper s52x52 shimmer"/>
    <div class= "info-wrapper column gap-0">
        <skeleton class="h5 shimmer"/>
        <skeleton class="h4 shimmer"/>
        <div class="row">
        <skeleton class="h6 shimmer" :exactwidth="50"/>
        <skeleton class="h6 shimmer" :exactwidth="50"/>
        </div>
    </div>
    </div>
</template>

<script>

import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue';

export default
{
    name: 'playlistSkeleton',
    extends: playlistCardSkeleton
}

</script>