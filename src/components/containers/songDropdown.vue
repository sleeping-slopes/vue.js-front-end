

<template>
    <div class="context-menu" :style="'right: calc(100% - '+ (this.x) +'px); top:'+ this.y +'px;'">
      <button class="button button-context h6 icon-text">
        <span class="bi bi-suit-heart-fill"></span><span>{{songID}}</span>
      </button>
      <button class="button button-context h6 icon-text" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistNext',this.songID)">
        <span class="bi bi-suit-heart-fill"></span><span>Play next</span>
      </button>
      <button class="button button-context h6 icon-text" v-on:click="this.$store.dispatch('addSongToCurrentPlaylistEnd',this.songID)">
        <span class="bi bi-suit-heart-fill"></span><span>Add to current playlist</span>
      </button>
      <router-link class="button button-context h6 icon-text" :to="{ name: 'Song', params: { id: this.songID }}">
        <span class="bi bi-suit-heart-fill"></span><span>Song page</span>
      </router-link>
    </div>
</template>

  <script>

export default
{
  name: 'dropdown',
  data()
  {
      return{
          isDropped: false
      }
  },
  props:
  {
      x: {default:0},
      y: {default:0},
      songID: {default:'noid'}
  },
  methods:
  {
      dropIt()
      {
        this.isDropped = !this.isDropped
      },
      addToCurrentPlaylistNext()
      {
        this.$store.dispatch('addSongToCurrentPlaylistNext',this.id);
      },
      addToCurrentPlaylistEnd()
      {
        this.$store.dispatch('addSongToCurrentPlaylistEnd',this.id);
      }
  }
}

</script>

<style scoped>


.context-menu
{
  position:absolute;
  background-color: var(--panel-background-color);
  display:flex;
  flex-direction: column;
  overflow:hidden;
  border-radius: 5px;
  border:1px solid var(--panel-border-color);
  box-sizing: border-box;
  width:min-content;
  z-index:1;
  box-shadow: 0 0 15px 1px rgba(0,0,0,.2);
}

.button-context
{
  padding: 3px 5px 3px 5px;
  border:none;
  border-bottom:1px solid var(--panel-border-color);
  color: var(--text-color-primary);
  background-color:transparent;
  width:100%;
  justify-content: flex-start;
}

.button-context:hover
{
  background-color: var(--selected-item-background-color);
}

</style>