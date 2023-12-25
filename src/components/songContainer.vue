<template>
  <errorMessage  v-if="songs.length==0">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>No audio here yet</template>
  </errorMessage>
  <ul class = "song-container"  v-else>
    <Suspense>
      <template #default>
        <li v-for="(song,index) in getShortList">
          <component :is="dynamicComponent"
            :id = "song.id"
            :pos = "song.pos"
            :key = "song.id"
            @setCurrentSong="setCurrentPlaylistAndSong(index)"/>
        </li>
      </template>
      <template #fallback>
        <li v-for="(song) in getShortList">
          <component :is="dynamicComponent+'Skeleton'"></component>
        </li>
      </template>
    </Suspense>
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
    id: { default: "noid"},
    songs: {type: Array, default: []},
    maxDisplay: {default:0},
    dynamicComponent: {default:"song"}
  },

  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',JSON.stringify({playlist: {id:this.id,songs:this.songs}, songIndex: songIndex}));
    }
  },
  computed:
  {
    current() { return this.$store.state.currentPlaylist.id===this.id; },
    getShortList() { return this.maxDisplay<1?this.songs:this.songs.slice(0,this.maxDisplay); }
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
}

</style>