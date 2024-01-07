<template>
    <errorMessage  v-if="this.playlist.error">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>{{ this.playlist.error.message }}</template>
  </errorMessage>
  <ul class = "song-container" :class="type" v-else>
    <songDropdown v-show="true" :songID="this.contextMenuSongID" :y="this.contextMenuY" :x="this.contextMenuX"/>
    <li v-for="(song,index) in getShortList">
      <Transition name="fade">
        <component :is = "this.loaded?this.dynamicComponent:(this.dynamicComponent+'Skeleton')"
        :id = "song.id" :pos = "song.pos" :key = "song.id"
          @setCurrentSong="setCurrentPlaylistAndSong(index)"
          @openSongDropdown="openSongDropdown"
          @loaded="this.counter++"/>
      </Transition>
    </li>
  </ul>
</template>

<script>

import song from '@/components/songs/song.vue';
import songExtended from '@/components/songs/songExtended.vue';
import songCard from '@/components/songs/songCard.vue';

import songSkeleton from '@/components/songs/skeletons/song Skeleton.vue';
import songExtendedSkeleton from '@/components/songs/skeletons/songExtended Skeleton.vue';
import songCardSkeleton from '@/components/songs/skeletons/songCard Skeleton.vue';

import errorMessage from '@/components/containers/errorMessage.vue';
import songDropdown from './containers/songDropdown.vue';

export default
{
  name: 'playlist',
  components:
  {
    song, songExtended,songCard,
    songSkeleton, songExtendedSkeleton, songCardSkeleton,
    errorMessage, songDropdown
  },
  props:
  {
    playlist: { default: {} },
    maxDisplay: {default:0},
    type:{default:''},
    dynamicComponent: {default:"song"}
  },
  data()
  {
    return {
      counter:0,
      contextMenuX:0,
      contextMenuY:0,
      contextMenuSongID:'noid'
    }
  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: this.playlist, songIndex: songIndex});
    },
    openSongDropdown(event,id)
    {
      console.log(id);
      console.log(event);
      const target = event.target;

      this.contextMenuX=target.offsetLeft;
      this.contextMenuY=target.offsetTop;
      this.contextMenuSongID=id;
    },
  },
  computed:
  {
    current() { return this.$store.state.currentPlaylist.id===this.playlist.id; },
    loaded() { return this.counter == (this.maxDisplay == 0?this.playlist.songs.length: Math.min(this.maxDisplay, this.playlist.songs.length)); },
    getShortList() { return this.maxDisplay<1?this.playlist.songs:this.playlist.songs?.slice(0,this.maxDisplay); }
  }
}

</script>

<style>

.song-container
{
  overflow-y:auto;
  /* position: relative; */
}

.song-container .song.item:hover,
.song-container .song.item.active
{
  background-color:var(--selected-item-background-color);
}

.song-container .song:hover .shade,
.song-container .song.active .shade
{
  opacity:0.5;
}

.song-container .song:hover .cover-menu,
.song-container .song.card.active .cover-menu
{
  opacity:1.0;
}

.card .cover-wrapper:hover .shade
{
    opacity:0.5;
}

.card .cover-wrapper:hover .cover-menu
{
    opacity:1.0;
}

div:not(.song-container) > .song .cover-menu
{
  display:none;
}

</style>