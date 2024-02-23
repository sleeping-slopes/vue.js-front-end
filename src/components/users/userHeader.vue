<template>
<Transition name="skeletonFade">
  <div class="row" v-if="(this.$parent.loaded??true) && this.loaded">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class="user-image s100x100" :src="picturesrc"  v-if="this.user.profile_picture"/>
      <div class="user-image s100x100 gradient-bg" v-else></div>
    </router-link>
    <div class="info-wrapper">
      <h1>
        <router-link :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable font-size-large">
          <slot name="caption"></slot> {{this.user.username}}
        </router-link>
      </h1>
    </div>
  </div>
  <userHeaderSkeleton v-else></userHeaderSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/interfaces/userInterface.vue";

import userHeaderSkeleton from "@/components/users/skeletons/userHeader Skeleton.vue";

export default
{
  name: 'userHeader',
  extends: userInterface,
  components: { userHeaderSkeleton }
}

</script>