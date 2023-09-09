<template>
  <div class="browser">

    <div style="display:flex;flex-direction: column; width:100%; overflow: hidden; gap:10px;">

      <div class="panel" style="flex-shrink:0; width:100%; height:max-content">
        <div class="panel-header">Playlists</div>
        <div class="panel-content">
          <playlistCarousel :playlists="playlists"/>
        </div>
      </div>

      <div class="panel" style="height:100%;">
        <div class="panel-header">Songs</div>
        <div class="panel-content">
        <playlist
          :playlistID="myAudio.playlistID"
          :songs="myAudio.songs"
        />
        </div>
      </div>

  </div>
    <div class = "panel sidebar-width" style="height:100%">
      <div class="panel-header">Recently played</div>
      <div class="panel-content">
      <playlist
          :playlistID="lastListened.playlistID"
          :songs="lastListened.songs"
        />
      </div>
    </div>
  </div>
</template>

<script>

import playlistCarousel from '@/components/playlistCarousel.vue'
import playlist from '@/components/playlist.vue'
import playlistModal from '@/components/playlistModal.vue'


export default {
  name: 'MyLibrary',
  components:
  {
    playlistCarousel,playlist,playlistModal
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
      ],
      myAudio:
      {
        playlistID:'myaudio',
        songs:
        [
          {
            songID: 0,
            songPos: 0,
            songArtist: 'Слава КПСС',
            songName: 'Горгород.fm',
            audio: "Слава КПСС - Горгород.fm.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 1,
            songPos: 1,
            songArtist: 'Слава КПСС',
            songName: 'Сон разума',
            audio: "Слава КПСС - Сон разума.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 2,
            songPos: 2,
            songArtist: 'Слава КПСС',
            songName: 'Девочка-милф',
            audio: "Слава КПСС - Девочка-милф.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 3,
            songPos: 3,
            songArtist: 'Слава КПСС',
            songName: 'Слово Мэра 2',
            audio: "Слава КПСС - Слово Мэра 2.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 4,
            songPos: 4,
            songArtist: 'Слава КПСС',
            songName: 'Радуга тяготения',
            audio: "Слава КПСС - Радуга тяготения.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 5,
            songPos: 5,
            songArtist: 'Слава КПСС',
            songName: 'ПСЖД',
            audio: "Слава КПСС - ПСЖД.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 6,
            songPos: 6,
            songArtist: 'Слава КПСС',
            songName: 'Конец Империи',
            audio: "Слава КПСС - Конец Империи.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 7,
            songPos: 7,
            songArtist: 'Слава КПСС',
            songName: 'Rave Эзотерика',
            audio: "Слава КПСС - Rave Эзотерика.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 8,
            songPos: 8,
            songArtist: 'Слава КПСС',
            songName: 'Я упал с луны',
            audio: "Слава КПСС - Я упал с луны.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 9,
            songPos: 9,
            songArtist: 'Слава КПСС',
            songName: 'На развалинах',
            audio: "Слава КПСС - На развалинах.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 10,
            songPos: 10,
            songArtist: 'Слава КПСС',
            songName: 'ОЙ ДА',
            audio: "Слава КПСС - ОЙ ДА.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 0,
            songPos: 11,
            songArtist: 'Слава КПСС',
            songName: 'Горгород.fm',
            audio: "Слава КПСС - Горгород.fm.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          }
        ]
      },
      lastListened:
      {
        playlistID:'lastListened',
        songs:
        [
          {
            songID: 0,
            songPos: 0,
            songArtist: 'Слава КПСС',
            songName: 'Горгород.fm',
            audio: "Слава КПСС - Горгород.fm.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 1,
            songPos: 1,
            songArtist: 'Слава КПСС',
            songName: 'Сон разума',
            audio: "Слава КПСС - Сон разума.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 2,
            songPos: 2,
            songArtist: 'Слава КПСС',
            songName: 'Девочка-милф',
            audio: "Слава КПСС - Девочка-милф.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 3,
            songPos: 3,
            songArtist: 'Слава КПСС',
            songName: 'Слово Мэра 2',
            audio: "Слава КПСС - Слово Мэра 2.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 4,
            songPos: 4,
            songArtist: 'Слава КПСС',
            songName: 'Радуга тяготения',
            audio: "Слава КПСС - Радуга тяготения.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 5,
            songPos: 5,
            songArtist: 'Слава КПСС',
            songName: 'ПСЖД',
            audio: "Слава КПСС - ПСЖД.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 6,
            songPos: 6,
            songArtist: 'Слава КПСС',
            songName: 'Конец Империи',
            audio: "Слава КПСС - Конец Империи.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 7,
            songPos: 7,
            songArtist: 'Слава КПСС',
            songName: 'Rave Эзотерика',
            audio: "Слава КПСС - Rave Эзотерика.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 8,
            songPos: 8,
            songArtist: 'Слава КПСС',
            songName: 'Я упал с луны',
            audio: "Слава КПСС - Я упал с луны.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 9,
            songPos: 9,
            songArtist: 'Слава КПСС',
            songName: 'На развалинах',
            audio: "Слава КПСС - На развалинах.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 10,
            songPos: 10,
            songArtist: 'Слава КПСС',
            songName: 'ОЙ ДА',
            audio: "Слава КПСС - ОЙ ДА.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 0,
            songPos: 11,
            songArtist: 'Слава КПСС',
            songName: 'Горгород.fm',
            audio: "Слава КПСС - Горгород.fm.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          }
        ]
      }
    }
  },
}
</script>

<style>

.browser
{
  width:100%;
  gap:10px;
  display:flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow:hidden;
  justify-content: center;
}
</style>