<template>
    <errorMessage  v-if="playlists.length==0">
      <template v-slot:errorIcon><span class="bi bi-music-note-list"></span></template>
      <template v-slot:message>No playlists here yet</template>
    </errorMessage>
    <ul class="playlist-container" v-else>
        <Suspense>
          <template #default>
            <li v-for="(playlist) in this.playlists">
              <component :is="dynamicComponent" :id="playlist.id"/>
            </li>
          </template>
          <template #fallback>
            <li v-for="(playlist) in this.playlists">
              <component :is="dynamicComponent+'Skeleton'"/>
            </li>
          </template>
        </Suspense>
    </ul>
  </template>

  <script>

  import playlistCard from '@/components/playlists/playlistCard.vue'
  import playlistCarouselCard from '@/components/playlists/playlistExpansible.vue'
  import playlistExpansible from '@/components/playlists/playlistExpansible.vue'

  import playlistCardSkeleton from '@/components/playlists/skeletons/playlistCard Skeleton.vue'
  import playlistCarouselCardSkeleton from '@/components/playlists/skeletons/playlistCarouselCard Skeleton.vue'
  import playlistExpansibleSkeleton from '@/components/playlists/skeletons/playlistExpansible Skeleton.vue'

  import errorMessage from "@/components/containers/errorMessage.vue"

  export default
  {
    name: 'carousel',
    components:
    {
        playlistCard, playlistCarouselCard, playlistExpansible,
        playlistCardSkeleton, playlistCarouselCardSkeleton, playlistExpansibleSkeleton,
        errorMessage
    },
    props:
    {
      playlists: {type:Array,default:[]},
      dynamicComponent: {default:"playlistExpansible"}
    }
  }
  </script>
