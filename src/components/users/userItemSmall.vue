<template>
  <Transition name="fade">
    <div class="user item" v-if="(this.$parent.loaded??true) && this.loaded">
      <router-link :to="{ name: 'User', params: { login: this.login }}">
        <img class="user-image s52x52" :src="picturesrc"  v-if="this.user.profile_picture"/>
        <div class="user-image s52x52 gradient-bg" v-else></div>
      </router-link>
      <div class="info-wrapper gap-10">
        <router-link :to="{ name: 'User', params: { login: this.login }}" class="primary-text hoverable font-size-medium">
          {{this.user.username}}
        </router-link>
        <div class="row">
        <router-link :to="{ name: 'UserFollowers', params: { login: this.login }}" class="icon-text secondary-text hoverable font-size-small">
          <span class="bi bi-people-fill"></span>
          <span>{{abbreviateNumber(this.user.followers_count)}}</span>
        </router-link>
        <router-link :to="{ name: 'UserSongs', params: { login: this.login }}" class="icon-text secondary-text hoverable font-size-small">
          <span class="bi bi-soundwave"></span>
          <span>{{abbreviateNumber(this.user.songs_count)}}</span>
        </router-link>
        </div>
      </div>
      <button class="button button-secondary button-size-compact button-compact icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
        <span class="bi bi-person-plus"></span><span>Follow</span>
      </button>
      <button class="button button-secondary button-size-compact icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
        <span class="bi bi-person-plus"></span><span>Follow back</span>
      </button>
      <button class="button button-secondary button-size-compact toggled icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
        <span class="bi bi bi-person-check-fill"></span><span>Following</span>
      </button>
    </div>
    <userItemSmallSkeleton v-else></userItemSmallSkeleton>
  </Transition>
</template>

<script>

import userInterface from "@/components/interfaces/userInterface.vue";

import userItemSmallSkeleton from "@/components/users/skeletons/userItemSmall Skeleton.vue";

export default
{
  name: 'userItemSmall',
  extends: userInterface,
  components: { userItemSmallSkeleton }
}

</script>