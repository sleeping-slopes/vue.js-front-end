<template>
  <errorMessage  v-if="this.playlists.error">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>{{ this.playlists.error.message }}</template>
  </errorMessage>
    <ul class="playlist-container" v-else>
      <li v-for="(playlist) in this.playlists">
        <Transition name="fade">
          <component :is = "this.loaded?this.dynamicComponent:(this.dynamicComponent+'Skeleton')" :id="playlist.id"
          @loaded="this.counter++"/>
        </Transition>
      </li>
    </ul>
  </template>

  <script>

  import playlistCard from '@/components/playlists/playlistCard.vue'
  import playlistCarouselCard from '@/components/playlists/playlistCarouselCard.vue'
  import playlistExpansible from '@/components/playlists/playlistExpansible.vue'

  import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue'
  import playlistCarouselCardSkeleton from '@/components/playlists/skeletons/playlistCarouselCard Skeleton.vue'
  import playlistExpansibleSkeleton from '@/components/playlists/skeletons/playlistExpansible Skeleton.vue'

  import errorMessage from "@/components/containers/errorMessage.vue"

  export default
  {
    name: 'playlistContainer',
    components:
    {
        playlistCard, playlistCarouselCard, playlistExpansible,
        playlistCardSkeleton, playlistCarouselCardSkeleton, playlistExpansibleSkeleton,
        errorMessage
    },
    props:
    {
      playlists: { default: {} },
      dynamicComponent: {default:"playlistExpansible"}
    },
    data()
    {
      return {
        counter:0
      }
    },
    computed:
    {
      loaded() { return this.counter==this.playlists.length },
    }
  }
  </script>

<style>
.playlist-container
{
  position:relative;
}
</style>