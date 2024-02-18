<template>
    <div class="user item">
        <div class="user-image s160x160 shimmer"></div>
        <div class="info-wrapper gap-10">
            <skeleton class="font-size-big shimmer"></skeleton>
            <skeleton class="font-size-small shimmer"></skeleton>
            <skeleton class="button button-secondary shimmer" :exactwidth="90"></skeleton>
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