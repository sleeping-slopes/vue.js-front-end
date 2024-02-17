<template>
<Transition name="fade">
    <div class="song banner" v-if="(this.$parent.loaded??true) && this.loaded">
        <div class="banner-bg" :style="this.gradient"></div>
        <div class="column w-100" style="overflow:hidden;">
            <div class="row">
                <button class="button button-default button-round button-large toggled" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
                <div class="info-wrapper gap-10">
                    <span class="banner-info banner-info-secondary font-size-big">
                        <template v-for="(artist,index) in this.song.artists">
                            <router-link :to="{ name: 'User', params: { login: artist.login }}" class="alink" v-if="artist.login">{{artist.name}}</router-link>
                            <span v-else>{{artist.name}}</span>
                            <span v-if="index+1 < this.song.artists.length">, </span>
                        </template>
                    </span>
                    <h1 class="banner-info banner-info-primary font-size-large">{{ this.song.name }}</h1>
                    <span class="banner-info banner-info-secondary font-size-small">
                    {{ abbreviateNumber(53252) }} play{{ 53252==1?'':'s' }}
                    <span class="bi bi-dot"></span>
                    {{ abbreviateNumber(this.song.likes_count) }} like{{ this.song.likes_count==1?'':'s' }}
                    </span>
                </div>
                <ul class="tag-container right">
                    <li v-for="tag in this.song.tags"><router-link :to="{ name: 'Tag', params: { tag: tag.tag } }" class="button button-tag" >{{tag.tag}}</router-link></li>
                </ul>
            </div>
            <div class="row bottom gap-5 y-center">
                <button class="button button-banner icon-text" style="width:75px;" v-bind:class="{'toggled':this.song.liked}" v-on:click="this.like()">
                    <span class="bi bi-suit-heart-fill"></span><span>{{this.song.liked?"Liked":"Like"}}</span>
                </button>
                <button class="button button-banner icon-text" style="width:135px;" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistEnd',this.song.id)">
                    <span class="bi bi-music-note-list"></span><span>Add to playlist</span>
                </button>
                <button class="button button-banner icon-text" style="width:100px;" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistNext',this.song.id)">
                    <span class="bi bi-music-note-list"></span><span>Play next</span>
                </button>
                <button class="button button-banner icon-text" style="width:100px;">
                    <span class="bi bi-link"></span><span>Copy link</span>
                </button>
                <button class="button button-banner icon-text" style="width:105px;">
                    <span class="bi bi-download"></span><span>Download</span>
                </button>
            </div>
        </div>
        <div class="cover-wrapper s320x320 right">
            <img id="songCover" class="cover" :src="coversrc" v-if="this.song.cover"
                crossorigin="anonymous"
                @load="setColors"/>
            <div class="cover bi bi-music-note" v-else></div>
        </div>
    </div>
    <songBannerSkeleton v-else></songBannerSkeleton>
</Transition>
</template>

<script>

import songInterface from '@/components/interfaces/songInterface.vue';

import songBannerSkeleton from '@/components/songs/skeletons/songBanner Skeleton.vue';

import ColorThief from 'colorthief/dist/color-thief.mjs'

export default
{
  name: 'songBanner',
  extends: songInterface,
  components: { songBannerSkeleton },
  data()
  {
    return {
        colorA:'var(--panel-border-color)',
        colorB:'var(--main-background-color)'
    }
  },
  computed:
  {
    gradient()
    {
        return "background: linear-gradient(135deg, "+this.colorA+" 0%, "+this.colorB+" 100%)";
    }
  },
  methods:
  {
    setColors()
    {
        const img = document.getElementById('songCover');
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img,2).map(color=>{ return "rgb("+color.join(',')+")"});
        [this.colorA,this.colorB] = colors;
    }
  }
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

</style>