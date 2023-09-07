

<template>
    <div class="panel" style="width:600px;">
              <div class="playlist-header">
        <img src='@/assets/covers/WARLORD.jpg' style="width:128px;height:128px;border-radius:10px; overflow:hidden">
        <div class="playlist-info">
            <div class="song-info-name">Yung Lean</div>
            <div class="song-info-artist">Warlord</div>
        </div>
      </div>
    <div class="panel-content" style="max-height:630px">
      <playlist
        :playlistID="this.$store.state.currentPlaylist.playlistID"
        :songs="this.$store.state.currentPlaylist.songs"
      />
    </div>
  </div>
</template>

<script>

import playlist from "@/components/playlist.vue"

export default {
  name: 'playlistModal',
  components: {playlist},
  computed:
  {

  },
  methods:
  {

  },
  props:
  {

  }
}
</script>

<style>

.playlist-header
{
    padding:5px;
    display:flex;
    gap:10px;
    box-sizing: border-box;
}

.playlist-info
{
    display:flex;
    flex-direction: column;
}

</style>

