<template>
  <div class="panel" style="flex-shrink:0; width:100%">
    <div class="panel-name">Playlists</div>
    <div class="playlist-carousel">
      <playlistCard v-for="(playlist) in playlists"
        :playlistID="playlist.playlistID"
        :cover="playlist.cover"
        :playlistName="playlist.playlistName"
        :playlistArtist="playlist.playlistArtist"
      />
    </div>
  </div>
  <div class="panel" style="height:100%;">
    <div class="panel-name">Songs</div>
    <playlist
        :playlistID="myAudio.playlistID"
        :songs="myAudio.songs"
      />
  </div>
</template>

<script>

import playlistCard from '@/components/playlistCard.vue'
import playlist from '@/components/playlist.vue'

export default {
  name: 'MyLibrary',
  components:
  {
    playlistCard,playlist
  },
  data()
  {
    return {
      playlists:
      [
        {
          playlistName:'Горгород',
          playlistArtist:'Oxxxymiron',
          cover: 'gorgorod.jpg',
          playlistID: '0'
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
      ],
      myAudio:
      {
        playlistID:'myaudio',
        songs:
        [
          {
            songID: 0,
            songArtist: 'Слава КПСС',
            songName: 'Горгород.fm',
            audio: "Слава КПСС - Горгород.fm.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 1,
            songArtist: 'Слава КПСС',
            songName: 'Сон разума',
            audio: "Слава КПСС - Сон разума.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 2,
            songArtist: 'Слава КПСС',
            songName: 'Девочка-милф',
            audio: "Слава КПСС - Девочка-милф.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 3,
            songArtist: 'Слава КПСС',
            songName: 'Слово Мэра 2',
            audio: "Слава КПСС - Слово Мэра 2.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 4,
            songArtist: 'Слава КПСС',
            songName: 'Радуга тяготения',
            audio: "Слава КПСС - Радуга тяготения.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 5,
            songArtist: 'Слава КПСС',
            songName: 'ПСЖД',
            audio: "Слава КПСС - ПСЖД.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 6,
            songArtist: 'Слава КПСС',
            songName: 'Конец Империи',
            audio: "Слава КПСС - Конец Империи.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 7,
            songArtist: 'Слава КПСС',
            songName: 'Rave Эзотерика',
            audio: "Слава КПСС - Rave Эзотерика.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 8,
            songArtist: 'Слава КПСС',
            songName: 'Я упал с луны',
            audio: "Слава КПСС - Я упал с луны.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 9,
            songArtist: 'Слава КПСС',
            songName: 'На развалинах',
            audio: "Слава КПСС - На развалинах.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
          {
            songID: 10,
            songArtist: 'Слава КПСС',
            songName: 'ОЙ ДА',
            audio: "Слава КПСС - ОЙ ДА.mp3",
            cover: 'gorgorod2.jpg',
            songDuration: 122
          },
        ]
      }
    }
  },
}
</script>

<style>

.panel-name
{
  padding-left:5px;
  display:flex;
  height:48px;
  align-items: center;
  color:var(--text-color-primary);
  font-family: "Kanit semibold", sans-serif;
  font-size:18px;
  white-space: nowrap;
  flex-shrink: 0;
}

.playlist-carousel
{
  display:flex;
  gap:10px;
  padding:5px;
}
</style>