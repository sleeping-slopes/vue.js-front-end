
<template>
<Transition name="skeletonFade">
    <div class="song card" v-bind:class="{'current': current}" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="cover-wrapper s180x180">
            <img class="cover" :src="this.song.coversrc" v-if="this.song.cover"/>
            <div class="cover bi bi-music-note" v-else></div>
            <div class="shade"></div>
            <div class="cover-menu">
                <button class="button button-default button-round button-large" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
            </div>
            <div class="cover-menu song-options">
                <button class="button button-default button-tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
                <button id = "dropdownButton" class="button button-default button-tiny bi bi-three-dots" v-on:click.stop="openDropdown($event)"></button>
            </div>
        </div>
        <div class="info-wrapper">
            <div class="secondary-text font-size-small">
                <template v-for="(artist,index) in this.song.artists">
                    <router-link :to="{ name: 'User', params: { login: artist.login }}" @click.stop class="alink" v-if="artist.login">{{artist.name}}</router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.song.artists.length">, </span>
                </template>
            </div>
            <router-link :to="{ name: 'Song', params: { id: this.id }}" @click.stop class="primary-text hoverable font-size-medium">{{this.song.name}}</router-link>
        </div>
    </div>
    <songCardSkeleton v-else></songCardSkeleton>
</Transition>
</template>

<script>

import songInterface from '@/components/interfaces/songInterface.vue';

import songCardSkeleton from '@/components/songs/skeletons/songCard Skeleton.vue';

export default
{
  name: 'songCard',
  extends: songInterface,
  components: { songCardSkeleton }
}

</script>