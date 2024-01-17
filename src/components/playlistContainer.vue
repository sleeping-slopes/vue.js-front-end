<template>
  <errorMessage  v-if="this.playlists.error">
    <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
    <template v-slot:message>{{ this.playlists.error.message }}</template>
  </errorMessage>
    <ul class="playlist-container" v-else>
      <li v-for="(playlist) in getShortList ">
        <Transition name="fade">
          <component :is = "this.loaded?this.dynamicComponent:(this.dynamicComponent+'Skeleton')" :id="playlist.id"
            @loaded="this.counter++"
          />
        </Transition>
      </li>
    </ul>
  </template>

  <script>

  import playlistItem from '@/components/playlists/playlistItem.vue'
  import playlistCard from '@/components/playlists/playlistCard.vue'
  import playlistCarouselCard from '@/components/playlists/playlistCarouselCard.vue'
  import playlistExpansible from '@/components/playlists/playlistExpansible.vue'

  import playlistItemSkeleton from '@/components/playlists/skeletons/playlistItem Skeleton.vue'
  import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue'
  import playlistCarouselCardSkeleton from '@/components/playlists/skeletons/playlistCarouselCard Skeleton.vue'
  import playlistExpansibleSkeleton from '@/components/playlists/skeletons/playlistExpansible Skeleton.vue'

  import errorMessage from "@/components/containers/errorMessage.vue"

  export default
  {
    name: 'playlistContainer',
    components:
    {
        playlistItem, playlistCard, playlistCarouselCard, playlistExpansible,
        playlistItemSkeleton, playlistCardSkeleton, playlistCarouselCardSkeleton, playlistExpansibleSkeleton,
        errorMessage
    },
    props:
    {
      playlists: { default: {} },
      dynamicComponent: {default:"playlistExpansible"},
      maxDisplay: {default:0},
    },
    data()
    {
      return {
        counter:0
      }
    },
    computed:
    {
      loaded() { return this.counter==this.getShortList.length },
      getShortList() { return this.maxDisplay<1?this.playlists:this.playlists.slice(0,this.maxDisplay); }
    },
  }
  </script>

<style scoped>

.playlist-container
{
  position:relative;
}

</style>