<template>
  <template v-if="this.playlist">
    <errorMessage  v-if="this.playlist.error">
      <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
      <template v-slot:message>{{ this.playlist.error.message }}</template>
    </errorMessage>
    <ul class = "container" :class="type" ref="list" v-else>
      <songDropdown v-if="this.contextMenuSong"
        :song="this.contextMenuSong" :x="this.contextMenuX" :y="this.contextMenuY"
        @hideSongDropdown="this.contextMenuSong=undefined"
      />
      <li v-for="(song,index) in getShortList">
        <component :is = "this.dynamicComponent"
          :class="{ 'active': JSON.stringify(this.contextMenuSong) == JSON.stringify({id:song.id,pos:song.pos}) }"
          :id = "song.id" :pos = "song.pos" :key = "song.id"
          @setCurrentSong="setCurrentPlaylistAndSong(index)"
          @openSongDropdown="openSongDropdown"
          @loaded="this.counter++;"
        />
      </li>
    </ul>
  </template>
  <div class="loader-wrapper" v-else>
    <div class="loader"></div>
  </div>
</template>

<script>

import songItem from '@/components/songs/songItem.vue';
import songExtended from '@/components/songs/songExtended.vue';
import songCard from '@/components/songs/songCard.vue';
import songBanner from '@/components/songs/songBanner.vue';

import errorMessage from '@/components/containers/errorMessage.vue';
import songDropdown from '@/components/containers/songDropdown.vue';

export default
{
  name: 'playlist',
  components:
  {
    songItem, songExtended,songCard, songBanner,
    errorMessage, songDropdown
  },
  props:
  {
    playlist: { default: undefined },
    maxDisplay: { default: 0 },
    type: { default: '' },
    dynamicComponent: { default: "songItem" }
  },
  data()
  {
    return {
      counter:0,
      contextMenuX:0,
      contextMenuY:0,
      contextMenuSong: undefined,
    }
  },
  methods:
  {
    setCurrentPlaylistAndSong(songIndex)
    {
      this.$store.dispatch('setCurrentPlaylistAndSong',{playlist: this.playlist, songIndex: songIndex});
    },
    openSongDropdown(event,song)
    {
      const target = event.target;
      let el = target;
      let x = target.getBoundingClientRect().width;
      let y = target.getBoundingClientRect().height;
      while (el.offsetParent &&  el!=this.$refs.list)
      {
        x+=el.offsetLeft;
        y+=el.offsetTop;
        el=el.offsetParent;
      }

      this.contextMenuX=x;
      this.contextMenuY=y;
      this.contextMenuSong=song;
    },

  },
  computed:
  {
    current() { return this.$store.state.currentPlaylist.id===this.playlist.id; },
    loaded() { return this.counter == this.getShortList.length },
    getShortList() { return this.maxDisplay<1?this.playlist.songs:this.playlist.songs?.slice(0,this.maxDisplay); }
  }
}

</script>