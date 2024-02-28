

<template>
    <div class="song-context-menu" :style="'right: calc(100% - '+ (this.x) +'px); top:'+ this.y +'px;'">
      <button class="button icon-text" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistNext',this.song.id)">
        <span class="accent-text bi bi-music-note-list"></span><span>Play next</span>
      </button>
      <button class="button icon-text" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistEnd',this.song.id)">
        <span class="accent-text bi bi-music-note-list"></span><span>Add to current playlist</span>
      </button>
      <router-link class="button icon-text" :to="{ name: 'Song', params: { id: this.song.id }}">
        <span class="accent-text bi bi-globe"></span><span>Song page</span>
      </router-link>
    </div>
</template>

  <script>

export default
{
  name: 'dropdown',
  props:
  {
    song: { default: undefined },
    x: { default: 0 },
    y: { default: 0 }
  },
  mounted()
  {
    document.addEventListener('click', this.close);
  },
  beforeUnmount()
  {
    document.removeEventListener('click', this.close);
  },
  methods:
  {
    close()
    {
      this.$emit('hideSongDropdown');
    }
  }
}

</script>

<style scoped>

.song-context-menu
{
  position:absolute;
  background-color: var(--panel-background-color);
  display:flex;
  flex-direction: column;
  border-radius: 5px;
  border:1px solid var(--panel-border-color);
  box-sizing: border-box;
  width:min-content;
  z-index:1;
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
}

</style>