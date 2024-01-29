<template>
<Transition name = "fade">
    <router-link :to="{ name: 'User', params: { login: user.login }}" v-if="(this.$parent.loaded??true) && this.loaded">
        <img class = "user icon user-image s36x36" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
        <div class = "user icon user-image s36x36 gradient-bg" v-else></div>
    </router-link>
    <userIconSkeleton v-else></userIconSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/users/user interface.vue";
import userIconSkeleton from "@/components/users/skeletons/userIcon Skeleton.vue";

export default
{
    name: 'userIcon',
    extends: userInterface,
    components: { userIconSkeleton }
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