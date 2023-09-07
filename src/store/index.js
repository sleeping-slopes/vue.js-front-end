import { createStore } from 'vuex'

export default createStore({
  state: {
    //
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') || '-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    isPlaying: false,
  },
  getters:
  {
    getCurrentSongPos(state)
    {
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return state.currentPlaylist.songs[state.currentSongIndex].songPos;
      return -1;
    },
    getCurrentSongPlaylistPos(state)
    {
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return JSON.stringify({playlist: state.currentPlaylist.playlistID, songPos:state.currentPlaylist.songs[state.currentSongIndex].songPos});
      return -1;
    },
    getCurrentSongSrc(state)
    {
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return state.currentPlaylist.songs[state.currentSongIndex].audio;
      return -1;
    }
  },
  mutations:
  {
    setCurrentPlaylistAndSong(state,playlistSong)
    {

      state.currentSongIndex=JSON.parse(playlistSong).songIndex;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

      state.currentPlaylist={playlistID:JSON.parse(playlistSong).playlist.playlistID, songs:JSON.parse(playlistSong).playlist.songs};
      localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));
    },
    shiftCurrentSong(state,shift)
    {
      state.currentSongIndex+=shift;
      if (state.currentSongIndex>=state.currentPlaylist.songs.length) state.currentSongIndex=0;
      if (state.currentSongIndex<0) state.currentSongIndex=state.currentPlaylist.songs.length-1;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
    },
    toggleTheme(state)
    {
      state.darkTheme=!state.darkTheme;
      localStorage.setItem('darkTheme', JSON.stringify(state.darkTheme));
    }
  },
  actions:
  {
    setCurrentPlaylistAndSong({commit}, playlistSong)
    {
      commit("setCurrentPlaylistAndSong",playlistSong);
    },
    shiftCurrentSong({commit}, shift)
    {
      commit("shiftCurrentSong", shift);
    },
    toggleTheme({commit})
    {
      commit("toggleTheme");
    }
  },
  modules: {
  }
})
