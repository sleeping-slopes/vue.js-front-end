<template>
<Transition name="skeletonFade">
  <div class="row" v-if="(this.$parent.loaded??true) && this.loaded">
    <router-link :to="{ name: 'Song', params: { id: this.id }}" class="cover-wrapper s100x100">
      <img class="cover" :src="this.song.coversrc" v-if="this.song.cover"/>
      <div class="cover bi bi-music-note" v-else></div>
    </router-link>
    <div class="info-wrapper">
      <div class="secondary-text font-size-big">
        <template v-for="(artist,index) in this.song.artists">
          <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
          <span v-else>{{artist.name}}</span>
          <span v-if="index+1 < this.song.artists.length">, </span>
        </template>
      </div>
      <h1><router-link :to="{ name: 'Song', params: { id: this.id }}" class="primary-text hoverable font-size-large">{{this.song.name}}</router-link></h1>
    </div>
  </div>
  <songHeaderSkeleton v-else></songHeaderSkeleton>
</Transition>
</template>

<script>

import songInterface from '@/components/interfaces/songInterface.vue';

import songHeaderSkeleton from '@/components/songs/skeletons/songHeader Skeleton.vue';

export default
{
  name: 'songHeader',
  extends: songInterface,
  components: { songHeaderSkeleton }
}

</script>