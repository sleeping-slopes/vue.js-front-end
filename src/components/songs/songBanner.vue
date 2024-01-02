<template>
    <div class="banner sticky-top dark">
        <div class="banner-bg gradient-bg"/>
        <div class="column" style="width:100%; overflow:hidden;" >
            <div class="row">
                <div class="row" style="overflow:hidden;">
                    <button class="round-button huge toggled" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
                    <div class="banner-info-wrapper">
                        <h3 class="banner-info-secondary">
                            <template v-for="(artist,index) in this.song.artists">
                                <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                                <span v-else>{{artist.name}}</span>
                                <span v-if="index+1 < this.song.artists.length">, </span>
                            </template>
                        </h3>
                        <h2 class="banner-info-primary">
                            <span>{{ this.song.name }}</span>
                        </h2>
                    </div>
                 </div>
                <div class="tag-container right">
                    <router-link class="button-tag h6" :to="'/discover'">YUNGRUSSIA</router-link>
                    <router-link class="button-tag h6" :to="'/discover'">YUNGRUSSIA</router-link>
                    <router-link class="button-tag h6" :to="'/discover'">YUNGRUSSIA</router-link>
                </div>
            </div>

            <div class="row bottom" style="gap:5px; align-items: center;">
                <button class="button-secondary h5 icon-text">
                    <span class="bi bi-suit-heart-fill"></span><span>Like</span>
                </button>
                <button class="button-secondary h5 icon-text">
                    <span class="bi bi-music-note-list"></span><span>Add to playlist</span>
                </button>
                <button class="button-secondary h5 icon-text">
                    <span class="bi bi-music-note-list"></span><span>Play next</span>
                </button>
                <button class="button-secondary h5 icon-text">
                    <span class="bi bi-link"></span><span>Copy link</span>
                </button>
                <button class="button-secondary h5 icon-text">
                    <span class="bi bi-download"></span><span>Download</span>
                </button>
                <span class="h5 secondary-text" style="margin-left:auto">
                    {{ abbreviateNumber(53252) }} play{{ 53252!=1?'s':'' }}
                    <span class="bi bi-dot"></span>
                    {{ abbreviateNumber(this.song.likes_count) }} like{{ this.song.likes_count!=1?'s':'' }}
                </span>
            </div>
        </div>
        <div class = "cover-wrapper s320x320 right">
            <img class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
    </div>
  </template>
<script>

import song from "@/components/songs/song.vue"

export default
{
  name: 'songBanner',
  extends: song
}

</script>

<style scoped>

.tag-container
{
    display:flex;
    flex-wrap:wrap;
    flex-direction: row-reverse;
    gap:10px;
    min-width:min-content;
    width:min-content;
    max-width:320px;
    height:fit-content;

    flex-shrink: 0;
}
.button-tag
{
    background-color:var(--light-gray);
    color: var(--soft-white);
    padding:3px 7px 3px 7px;
    border-radius: 50vh;
    width:fit-content;
    height:fit-content;
    white-space: nowrap;
}

.button-tag::before
{
    content:"# "
}

.button-tag:hover
{
    background-color:var(--dark-gray);
}

</style>