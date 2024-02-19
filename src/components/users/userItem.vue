<template>
<Transition name="skeletonFade">
  <div class="user item" v-if="(this.$parent.loaded??true) && this.loaded">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class="user-image s160x160" :src="picturesrc"  v-if="this.user.profile_picture"/>
      <div class="user-image s160x160 gradient-bg" v-else></div>
    </router-link>
    <div class="info-wrapper gap-10">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable font-size-big">
        {{this.user.username}}
      </router-link>
      <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class="icon-text secondary-text hoverable font-size-small" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </router-link>
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
  </div>
  <userItemSkeleton v-else></userItemSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/interfaces/userInterface.vue";

import userItemSkeleton from "@/components/users/skeletons/userItem Skeleton.vue";

export default
{
  name: 'userItem',
  extends: userInterface,
  components: { userItemSkeleton }
}

</script>