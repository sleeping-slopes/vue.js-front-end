<template>
    <div class="row gap-20" style="overflow: hidden; width:1200px;">
        <div class="banner-bg" :style="this.gradient" />
        <div class="column w-100" style="overflow:hidden;">
            <div class="row">
                <button class="button button-round huge toggled" v-bind:class="this.isPlaying?'bi bi-pause-circle-fill':'bi bi-play-circle-fill'" v-on:click="setCurrentSong"></button>
                <div class="info-wrapper column gap-10">
                    <h3 class="banner-info banner-info-secondary">
                        <template v-for="(artist,index) in this.song.artists">
                            <router-link :to="{ name: 'User', params: { login: artist.login }}" class="artistlink" v-if="artist.login">{{artist.name}}</router-link>
                            <span v-else>{{artist.name}}</span>
                            <span v-if="index+1 < this.song.artists.length">, </span>
                        </template>
                    </h3>
                    <h2 class="banner-info banner-info-primary">{{ this.song.name }}</h2>
                    <span class="h5 banner-info banner-info-secondary">
                    {{ abbreviateNumber(53252) }} play{{ 53252!=1?'s':'' }}
                    <span class="bi bi-dot"></span>
                    {{ abbreviateNumber(this.song.likes_count) }} like{{ this.song.likes_count!=1?'s':'' }}
                    </span>
                </div>
                <ul class="tag-container right">
                    <li v-for="tag in this.song.tags"><router-link class="button-tag h6" :to="{ name: 'Tag', params: { tag: tag.tag } }">{{tag.tag}}</router-link></li>
                </ul>
            </div>

            <div class="row bottom gap-5 y-center">
                <button class="button button-banner h5 icon-text" style="width:75px;">
                    <span class="bi bi-suit-heart-fill"></span><span>Like</span>
                </button>
                <button class="button button-banner h5 icon-text" style="width:135px;">
                    <span class="bi bi-music-note-list"></span><span>Add to playlist</span>
                </button>
                <button class="button button-banner h5 icon-text" style="width:100px;">
                    <span class="bi bi-music-note-list"></span><span>Play next</span>
                </button>
                <button class="button button-banner h5 icon-text" style="width:100px;">
                    <span class="bi bi-link"></span><span>Copy link</span>
                </button>
                <button class="button button-banner h5 icon-text" style="width:105px;">
                    <span class="bi bi-download"></span><span>Download</span>
                </button>

            </div>
        </div>
        <div class = "cover-wrapper s320x320 right">
            <img id="songCover" class = "cover" v-if="imageAvailable" :src="coversrc" @error="imageAvailable=false" />
            <div class = "cover bi bi-music-note" v-else/>
        </div>
    </div>
</template>

<script>

import song from "@/components/songs/song.vue"
import ColorThief from 'colorthief/dist/color-thief.mjs'

export default
{
  name: 'songBanner',
  extends: song,
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
        const colorThief = new ColorThief();
        const img = document.getElementById('songCover');
        const colors = colorThief.getPalette(img,2).map(color=>{ return "rgb("+color.join(',')+")"});
        [this.colorA,this.colorB] = colors;
    }
  },
  mounted()
  {

    const img = document.getElementById('songCover');
    img.crossOrigin = 'Anonymous';
    if (img.complete)
    {
        this.setColors();
    }
    else
    {
        img.addEventListener('load', this.setColors);
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