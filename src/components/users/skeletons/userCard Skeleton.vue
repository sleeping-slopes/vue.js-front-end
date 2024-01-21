<template>
    <div class = "card user-card">
      <div class = "user-image s180x180 shimmer"></div>
      <div class= "info-wrapper column gap-0">
        <skeleton class="h3 shimmer"/>
        <skeleton class="h5 shimmer"/>
      </div>
    </div>
</template>

<script>

import userSkeletonInterface from '@/components/users/skeletons/userSkeleton interface.vue';

export default
{
    name: 'userCardSkeleton',
    extends: userSkeletonInterface
}

</script>