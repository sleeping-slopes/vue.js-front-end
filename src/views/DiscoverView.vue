<template>
  <div class="browser">
    <div style="display:flex;flex-direction: column; width:100%; overflow: hidden; gap:10px;">
      <div class="panel" style="flex-shrink:0; width:100%; height:max-content">
        <div class="panel-header">Playlists</div>
        <div class="panel-content">
          <playlistCarousel :playlists="playlists"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue'

export default {
  name: 'discover',
  components:
  {
    playlistCarousel
  },
  data()
  {
    return {
      playlists:
      [
        {
          playlistName:'807 + 1',
          playlistArtist:'808RUS',
          cover: '807 + 1.jpg',
          playlistID: '0'
        },
        {
          playlistName:'Born to Die',
          playlistArtist:'Lana Del Rey',
          cover: 'Born to Die.png',
          playlistID: '1'
        },
        {
          playlistName:'TESTING',
          playlistArtist:'A$AP Rocky',
          cover: 'TESTING.png',
          playlistID: '1'
        },
        {
          playlistName:'IGOR',
          playlistArtist:'Tyler, the Creator',
          cover: 'IGOR.jpg',
          playlistID: '1'
        },
        {
          playlistName:'Flower boy',
          playlistArtist:'Tyler, the Creator',
          cover: 'Flower boy.jpg',
          playlistID: '1'
        },
        {
          playlistName:'Sweet Dreams',
          playlistArtist:'Boulevard Depo',
          cover: 'Sweet Dreams.png',
          playlistID: '1'
        },
        {
          playlistName:'Warlord',
          playlistArtist:'Yung Lean',
          cover: 'WARLORD.jpg',
          playlistID: '1'
        },
        {
          playlistName:'WILD EA$T',
          playlistArtist:'SALUKI',
          cover: 'WILD EAST.png',
          playlistID: '1'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          cover: 'gorgorod.jpg',
          playlistID: '2'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          cover: 'gorgorod2.jpg',
          playlistID: '1'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          cover: 'gorgorod.jpg',
          playlistID: '2'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          cover: 'gorgorod2.jpg',
          playlistID: '1'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          cover: 'gorgorod.jpg',
          playlistID: '2'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          cover: 'gorgorod2.jpg',
          playlistID: '1'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          cover: 'gorgorod.jpg',
          playlistID: '2'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          cover: 'gorgorod2.jpg',
          playlistID: '1'
        }
      ],
    }
  },
}
</script>

<style>

/* .browser
{
  width:100%;
  gap:10px;
  display:flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow:hidden;
  justify-content: center;
} */
</style>