<template>
<Transition name = "fade">
  <div class = "card user-card" v-if="(this.$parent.loaded??true) && this.loaded">
    <router-link :to="{ name: 'User', params: { login: this.login }}">
      <img class = "user-image s180x180" :src="picturesrc"  v-if="imageAvailable" @error="imageAvailable=false"/>
      <div class = "user-image s180x180 gradient-bg" v-else></div>
    </router-link>
    <div class= "info-wrapper column gap-0">
      <router-link :to="{ name: 'User', params: { login: this.login }}" class ="h3 primary-text hoverable">
        {{this.user.username}}
      </router-link>
      <span class ="h5 icon-text secondary-text" v-if="this.user.followers_count>0">
        <span class="bi bi-people-fill"></span>
        <span>{{abbreviateNumber(this.user.followers_count)}} follower{{ this.user.followers_count>1?'s':'' }}</span>
      </span>
    </div>
    <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && !this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow</span>
    </button>
    <button class="button button-secondary h6 icon-text" v-if="!this.user.youFollow && this.user.followsYou && !this.user.me" v-on:click.stop="this.follow()">
      <span class="bi bi-person-plus"></span><span>Follow back</span>
    </button>
    <button class="button button-secondary toggled h6 icon-text" v-if="this.user.youFollow && !this.user.me" v-on:click.stop="this.unfollow()">
      <span class="bi bi bi-person-check-fill"></span><span>Following</span>
    </button>
  </div>
  <userCardSkeleton v-else></userCardSkeleton>
</Transition>
</template>

<script>

import userInterface from "@/components/users/user interface.vue";
import userCardSkeleton from "@/components/users/skeletons/userCard Skeleton.vue";

export default
{
  name: 'userCard',
  extends: userInterface,
  components: { userCardSkeleton }
}
</script>

<style scoped>

.user-card:not(:hover) .button-secondary
{
  visibility: hidden;
}

.user-card .info-wrapper
{
  align-items: center;
}

</style>