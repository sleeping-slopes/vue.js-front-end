

<template>
  <div class="modal-shade">
    <div class="modal">

      <div class="panel" style="width:600px;">
        <div class="playlist-header">
          <img src='@/assets/covers/WARLORD.jpg' style="width:128px;height:128px;border-radius:10px; overflow:hidden">
          <div class="playlist-info">
            <div class="playlist-info-name">Warlord</div>
            <div class="playlist-info-artist">Yung Lean</div>
            <div class="playlist-button-row">
              <button class="testbtn bi bi-plus-lg">Add to my library</button>
            </div>
          </div>
        </div>
        <div class="panel-content" style="max-height:630px">
          <playlist
            :playlistID="this.$store.state.currentPlaylist.playlistID"
            :songs="this.$store.state.currentPlaylist.songs"
          />
        </div>
      </div>
      <button class="bi bi-x modal-close-button"/>
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

.modal-shade
{
  position:fixed;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;

  display:flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
}

.modal
{
  position:relative;
  display:flex;

}

.modal-close-button
{
  position:absolute;
  left:100%;
  top:0;
  font-size:48px;
  padding:0px;
  margin:0px;
  background-color: transparent;
  color:white;
  border:none;
}

.testbtn
{
  background:none;
  border:none;
  font-size:18px;
  font-family: "Kanit regular", sans-serif;
  cursor:pointer;
  color:var(--text-color-secondary);
  padding:0px;
  /* background-color:blue; */
  transition:all 0.2s;
  white-space: nowrap;
}

.testbtn:hover
{
  color:var(--text-color-primary);

}

.playlist-header
{
    padding:5px;
    display:flex;
    box-sizing: border-box;
    border-bottom: 2px solid var(--panel-border-color);
}

.playlist-info
{
  padding:10px;

  display:flex;
  flex-direction: column;
  position:relative;

}

.playlist-info-name
{
  /* background-color:yellow; */
  font-size:24px;
  font-family: "Kanit semibold", sans-serif;
  color: var(--text-color-primary);
}

.playlist-info-artist
{
  /* background-color:blue; */
  font-size:16px;
  font-family: "Kanit regular", sans-serif;
  color: var(--text-color-secondary);
}

.playlist-button-row
{
  display:flex;
  height:100%;
  align-items:flex-end;
}

</style>

