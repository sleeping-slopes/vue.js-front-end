<template>
    <div class="user icon user-image s36x36 shimmer"></div>
</template>

<script>

import skeleton from '@/components/skeleton.vue';

export default
{
    name: 'userIconSkeleton',
    components: { skeleton }
}

</script>

<style scoped>

.user.icon
{
    border:2px solid var(--panel-background-color);
    margin-right:-10px;
    box-sizing: border-box;
}

</style>