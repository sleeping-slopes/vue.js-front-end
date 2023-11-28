<template>
  <div class="app" v-bind:class="{'dark': this.$store.state.darkTheme}">
    <div class="window">
      <navbar/>
      <div class = "main" >
        <panel class = "sidebar-width" style="height:100%">
          <template v-slot:header>Current playlist</template>
          <template v-slot:menu>
            <button class="round-button small bi bi-shuffle"
              v-bind:style="this.$store.state.shuffle?{'color':'cornflowerblue'}:{}"
              v-on:click = "this.$store.dispatch('shuffle')">
            </button>
          </template>
          <template v-slot:content>
            <playlist
              :id="this.$store.state.currentPlaylist.id"
              :songs="this.$store.state.currentPlaylist.songs"
            />
        </template>
        </panel>
        <div class="browser">
          <router-view/>
        </div>
      </div>
      <player/>
    </div>
  </div>
</template>

<script>

import navbar from "@/components/navbar.vue"
import panel from "@/components/panel.vue"
import playlist from "@/components/playlist.vue"
import playlistModal from "@/components/playlistModal.vue"
import player from "@/components/player.vue"

export default
{
  name: 'app',
  components:
  {
    navbar,panel,playlist,playlistModal,player
  }
}

</script>

<style>

.app
{
  height:100%;
  width:100%;
  background-color: var(--main-background-color);
  position:relative;

  display:flex;
  justify-content: center;
}

.window
{
  display:flex;
  flex-direction:column;
  gap:10px;
  width:90%;
  height:100%;
  padding:10px;
  box-sizing: border-box;

  min-width:min-content;
}

.main
{
  height:100%;
  display:flex;
  flex-direction: row;
  gap:10px;
  overflow:hidden;
}

.browser
{
  width:100%;
  height:100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  gap:10px;
}

.display-none
{
  display:none;
}

.button-link
{
  color: var(--text-color-primary);
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor:pointer;
  text-decoration: underline;
}

.button-link:active
{
  color: var(--text-color-secondary);
}


</style>