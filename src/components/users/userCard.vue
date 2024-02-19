<template>
<Transition name="skeletonFade">
  <div class="user card" v-if="(this.$parent.loaded??true) && this.loaded">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class="user-image s180x180" :src="picturesrc"  v-if="this.user.profile_picture"/>
      <div class="user-image s180x180 gradient-bg" v-else></div>
    </router-link>
    <div class="info-wrapper">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable font-size-big">
        {{this.user.username}}
      </router-link>
      <span class="icon-text secondary-text font-size-small" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </span>
    </div>
    <button class="button button-secondary icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow</span>
    </button>
    <button class="button button-secondary icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow back</span>
    </button>
    <button class="button button-secondary toggled icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
      <span class="bi bi bi-person-check-fill"></span><span>Following</span>
    </button>
  </div>
  <userCardSkeleton v-else></userCardSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/interfaces/userInterface.vue";

import userCardSkeleton from "@/components/users/skeletons/userCard Skeleton.vue";

export default
{
  name: 'userCard',
  extends: userInterface,
  components: { userCardSkeleton }
}
</script>