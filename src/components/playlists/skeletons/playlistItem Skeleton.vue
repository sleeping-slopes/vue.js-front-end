<template>
    <div class = "song item">
        <div class = "cover-wrapper s52x52 shimmer"></div>
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

import playlistSkeletonInterface from '@/components/playlists/skeletons/playlistSkeleton interface.vue';

export default
{
    name: 'playlistItemSkeleton',
    extends: playlistSkeletonInterface
}

</script>