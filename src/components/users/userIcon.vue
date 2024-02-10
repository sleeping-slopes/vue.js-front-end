<template>
<Transition name="fade">
    <router-link :to="{ name: 'User', params: { login: user.login }}" v-if="(this.$parent.loaded??true) && this.loaded">
        <img class="user icon user-image s36x36" :src="picturesrc"  v-if="this.user.profile_picture"/>
        <div class="user icon user-image s36x36 gradient-bg" v-else></div>
    </router-link>
    <userIconSkeleton v-else></userIconSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/interfaces/userInterface.vue";

import userIconSkeleton from "@/components/users/skeletons/userIcon Skeleton.vue";

export default
{
    name: 'userIcon',
    extends: userInterface,
    components: { userIconSkeleton }
}
</script>