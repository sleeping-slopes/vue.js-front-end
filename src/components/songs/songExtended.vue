
<template>
<Transition name="fade">
    <div class = "song item" v-on:click="setCurrentSong" v-bind:class="{'current': current}" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class = "cover-wrapper s52x52">
            <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false"/>
            <div class = "cover bi bi-music-note" v-else></div>
            <div class = "shade"></div>
            <div class="cover-menu">
                <button class="button button-round filled medium" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'"></button>
            </div>
            <div class = "wrapper-wave" v-bind:class="this.isPlaying?'playing':''">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class= "info-wrapper column gap-0">
            <div class ="h5 secondary-text">
                <template v-for="(artist,index) in this.song.artists">
                    <router-link :to="{ name: 'User', params: { login: artist.login }}" @click.stop class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                    <span v-else>{{artist.name}}</span>
                    <span v-if="index+1 < this.song.artists.length">, </span>
                </template>
            </div>
            <router-link :to="{ name: 'Song', params: { id: this.id }}" @click.stop class ="h4 primary-text hoverable">{{this.song.name}}</router-link>
            <div class="row">
                <span class="icon-text secondary-text h6">
                    <span class="bi bi-play-fill"></span>
                    <span>{{abbreviateNumber(53252)}}</span>
                </span>
                <span class="icon-text secondary-text h6">
                    <span class="bi bi-suit-heart-fill"></span>
                    <span>{{abbreviateNumber(this.song.likes_count)}}</span>
                </span>
            </div>
        </div>
        <div class="song-menu">
            <button id = "dropdownButton" class="button button-secondary bi bi-three-dots tiny" v-on:click.stop="openDropdown($event)"></button>
            <button class="button button-round tiny bi bi-suit-heart-fill" v-bind:class="{'toggled':this.song.liked}" v-on:click.stop="this.like()"></button>
            <button id = "deleteSongButton" class="button button-round tiny bi bi-x-lg" v-on:click.stop="$emit('deleteSong')"></button>
        </div>
        <div class = "song-duration h5">{{ numberToTimeString(this.song.duration) }}</div>
    </div>
    <songExtendedSkeleton v-else></songExtendedSkeleton>
</Transition>
</template>

<script>

import songInterface from '@/components/songs/song interface.vue';
import songExtendedSkeleton from '@/components/songs/skeletons/songExtended Skeleton.vue';

export default
{
  name: 'songExtended',
  extends: songInterface,
  components: { songExtendedSkeleton }
}

</script>

