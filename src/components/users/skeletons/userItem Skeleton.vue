<template>
    <div class="user item">
        <div class="user-image s160x160 shimmer"></div>
        <div class="info-wrapper gap-10">
            <skeleton class="h3 shimmer"></skeleton>
            <skeleton class="h5 shimmer"></skeleton>
            <skeleton class="button button-secondary h2 shimmer" :exactwidth="90"/>
        </div>
    </div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'userItemSkeleton',
    components: { skeleton }
}

</script>