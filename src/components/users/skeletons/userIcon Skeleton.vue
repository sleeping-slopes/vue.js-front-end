<template>
    <div class = "user-image user-icon s36x36 shimmer"></div>
</template>

<script>

import userSkeletonInterface from '@/components/users/skeletons/userSkeleton interface.vue';

export default
{
    name: 'userIconSkeleton',
    extends: userSkeletonInterface
}

</script>

<style scoped>

.user-icon
{
    border:2px solid var(--panel-background-color);
    margin-right:-10px;
    box-sizing: border-box;
}

</style>