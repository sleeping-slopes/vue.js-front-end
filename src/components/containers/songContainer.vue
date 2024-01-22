<template>
  <template v-if="this.playlist">
    <errorMessage  v-if="this.playlist.error">
      <template v-slot:errorIcon><span class="bi bi-music-note-beamed"></span></template>
      <template v-slot:message>{{ this.playlist.error.message }}</template>
    </errorMessage>
    <ul class = "song-container" :class="type" ref="list" v-else>
      <songDropdown v-if="this.contextMenuSong"
        :song="this.contextMenuSong" :x="this.contextMenuX" :y="this.contextMenuY"
        @hideSongDropdown="this.contextMenuSong=undefined"
      />
      <li v-for="(song,index) in getShortList">
        <component :is = "this.dynamicComponent"
          :class="{ 'active2': JSON.stringify(this.contextMenuSong) == JSON.stringify({id:song.id,pos:song.pos}) }"
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
        console.log(this.$refs.list);
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

<style>

.song-container
{
  overflow-y:auto;
  position:relative;
}

.song-container .song.item:hover,
.song-container .song.item.active,
.song-container .song.item.active2
{
  background-color:var(--selected-item-background-color);
}

.song-container .song.active2 #dropdownButton
{
  color: var(--accent-color);
  border-color: var(--accent-color);
}

.song-container .song:hover .shade,
.song-container .song.active .shade,
.song-container .song.active2 .shade,
.playlist-container .cover-wrapper:hover .shade
{
  opacity:0.5;
}

.song-container .song:hover .cover-menu,
.song-container .song.active2 .cover-menu,
.song-container .song.card.active .cover-menu,
.playlist-container .playlist.item .cover-wrapper:hover .cover-menu,
.playlist-container .playlist.card .cover-wrapper:hover .cover-menu
{
  opacity:1.0;
}

div:not(.song-container) > .song .cover-menu
{
  display:none;
}

.cover-menu
{
  position:absolute;
  opacity:0.0;
  transition: 0.2s all;
  color:var(--soft-white);
  display:flex;
  padding:10px;
  gap:20px;
  box-sizing: border-box;
}

.cover-menu.playlist-stats
{
  bottom:0px;
}

.cover-menu.song-options
{
  gap:10px;
  bottom:0px;
  right:0px;
}

.song.item .cover-menu { transition:none; }

.cover-menu > .button-round.filled { background-color:var(--soft-black); }

.cover-menu > .button-round:not(.toggled) { color:var(--soft-white); }

</style>