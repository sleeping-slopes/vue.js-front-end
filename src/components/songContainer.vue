<template>
  <errorMessage  v-if="this.playlist.error">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>{{ this.playlist.error.message }}</template>
  </errorMessage>
  <ul class = "song-container" v-else>
    <li v-for="(song,index) in getShortList">
      <Transition name="fade">
        <component :is = "this.loaded?this.dynamicComponent:(this.dynamicComponent+'Skeleton')"
        :id = "song.id" :pos = "song.pos" :key = "song.id"
          @setCurrentSong="setCurrentPlaylistAndSong(index)"
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

export default
{
  name: 'playlist',
  components:
  {
    song, songExtended,songCard,
    songSkeleton, songExtendedSkeleton, songCardSkeleton,
    errorMessage
  },
  props:
  {
    playlist: { default: {} },
    maxDisplay: {default:0},
    dynamicComponent: {default:"song"}
  },
  data()
  {
    return {
      counter:0
    }
  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: this.playlist, songIndex: songIndex}));
    }
  },
  computed:
  {
    current() { return this.$store.state.currentPlaylist.id===this.playlist.id; },
    loaded() { return this.counter==this.playlist.songs.length },
    getShortList() { return this.maxDisplay<1?this.playlist.songs:this.playlist.songs.slice(0,this.maxDisplay); }
  }
}

</script>

<style>

.hidden-scroll
{
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hidden-scroll::-webkit-scrollbar
{
    display: none;
}

.song-container
{
  overflow-y:scroll;
  position:relative;
}

.fade-enter-active,
.fade-leave-active
{
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to
{
  position:absolute;
  opacity: 0;
  width:100%;
}

</style>