<template>
  <div class="browser">
      <div class="panel" style="flex-shrink:0; width:100%; height:max-content">
        <div class="panel-header">Playlists</div>
        <div class="panel-content">
          <playlistCarousel :playlists="playlists"/>
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
          playlistCover: '807 + 1.jpg',
          playlistID: '0'
        },
        {
          playlistName:'Born to Die',
          playlistArtist:'Lana Del Rey',
          playlistCover: 'Born to Die.png',
          playlistID: '1'
        },
        {
          playlistName:'TESTING',
          playlistArtist:'A$AP Rocky',
          playlistCover: 'TESTING.png',
          playlistID: '2'
        },
        {
          playlistName:'IGOR',
          playlistArtist:'Tyler, the Creator',
          playlistCover: 'IGOR.jpg',
          playlistID: '3'
        },
        {
          playlistName:'Flower boy',
          playlistArtist:'Tyler, the Creator',
          playlistCover: 'Flower boy.jpg',
          playlistID: '4'
        },
        {
          playlistName:'Sweet Dreams',
          playlistArtist:'Boulevard Depo',
          playlistCover: 'Sweet Dreams.png',
          playlistID: '5'
        },
        {
          playlistName:'Warlord',
          playlistArtist:'Yung Lean',
          playlistCover: 'WARLORD.jpg',
          playlistID: '6'
        },
        {
          playlistName:'WILD EA$T',
          playlistArtist:'SALUKI',
          playlistCover: 'WILD EAST.png',
          playlistID: '7'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          playlistCover: 'gorgorod.jpg',
          playlistID: '8'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          playlistCover: 'gorgorod2.jpg',
          playlistID: '9'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          playlistCover: 'gorgorod.jpg',
          playlistID: '10'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          playlistCover: 'gorgorod2.jpg',
          playlistID: '11'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          playlistCover: 'gorgorod.jpg',
          playlistID: '12'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          playlistCover: 'gorgorod2.jpg',
          playlistID: '13'
        },
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          playlistCover: 'gorgorod.jpg',
          playlistID: '14'
        },
        {
          playlistName:'Горгород 2',
          playlistArtist:'Слава КПСС',
          playlistCover: 'gorgorod2.jpg',
          playlistID: '15'
        }
      ]
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