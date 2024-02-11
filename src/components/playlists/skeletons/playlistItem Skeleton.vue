<template>
    <div class="song item">
        <div class="cover-wrapper s52x52 shimmer"></div>
        <div class="info-wrapper">
            <skeleton class="font-size-small shimmer"/>
            <skeleton class="font-size-medium shimmer"/>
            <div class="row">
                <skeleton class="font-size-tiny shimmer" :exactwidth="30"/>
                <skeleton class="font-size-tiny shimmer" :exactwidth="30"/>
            </div>
        </div>
    </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'playlistItemSkeleton',
    components: { skeleton }
}

</script>