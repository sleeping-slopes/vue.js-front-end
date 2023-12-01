<template>
    <div class="column" style="width:100%;">
      <panel style="">
              <template v-slot:header>Songs</template>
              <template v-slot:menu>
                <button class="button-secondary">View all</button>
              </template>
              <template v-slot:content>
                <playlist
                  :id="this.$store.state.currentPlaylist.id"
                  :songs="this.$store.state.currentPlaylist.songs"
                />
              </template>
            </panel>
  </div>
</template>

  <script>

  import panel from '@/components/panel.vue';
  import playlist from '@/components/playlist.vue';


  export default {
    name: 'UserSongsView',
    components:
    {
      panel,playlist
    },
  }
  </script>

  <style>

  </style>