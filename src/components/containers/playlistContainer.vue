<template>
  <template v-if="this.playlists">
    <errorMessage  v-if="this.playlists.error">
      <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
      <template v-slot:message>{{ this.playlists.error.message }}</template>
    </errorMessage>
      <ul class="container" :class="type" v-else>
        <li v-for="(playlist) in getShortList ">
            <component :is = "this.dynamicComponent" :id="playlist.id"
              @loaded="this.counter++"
            />
        </li>
      </ul>
  </template>
  <div class="loader-wrapper" v-else>
    <div class="loader"></div>
  </div>
</template>

<script>

import playlistItem from '@/components/playlists/playlistItem.vue'
import playlistCard from '@/components/playlists/playlistCard.vue'
import playlistCarouselCard from '@/components/playlists/playlistCarouselCard.vue'
import playlistExpansible from '@/components/playlists/playlistExpansible.vue'

import errorMessage from "@/components/containers/errorMessage.vue"

export default
{
  name: 'playlistContainer',
  components:
  {
      playlistItem, playlistCard, playlistCarouselCard, playlistExpansible,
      errorMessage
  },
  props:
  {
    playlists: { default: undefined },
    maxDisplay: { default: 0 },
    type: { default: '' },
    dynamicComponent: { default: "playlistExpansible" }
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