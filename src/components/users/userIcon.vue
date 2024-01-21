<template>
    <router-link :to="{ name: 'User', params: { login: user.login }}">
        <img class = "user-image user-icon s36x36" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
        <div class = "user-image user-icon s36x36 gradient-bg" v-else></div>
    </router-link>
</template>

<script>

import userInterface from "@/components/users/user interface.vue";

export default
{
    name: 'userIcon',
    extends: userInterface
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