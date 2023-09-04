import { createStore } from 'vuex'

export default createStore({
  state: {
    // localStorage.getItem('currentPlaylist') ||
    currentPlaylist: JSON.parse('{}'),
    currentSongIndex: JSON.parse('-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    isPlaying: false
  },
  getters:
  {
  },
  mutations:
  {
    setCurrentPlaylistAndSong(state,playlistSong)
    {
      if (state.currentPlaylist.playlistID===playlistSong.playlist.playlistID && state.currentSongIndex===playlistSong.songIndex)
      {
        state.isPlaying=!state.isPlaying;
        return;
      }

      if (state.currentPlaylist.playlistID!==playlistSong.playlist.playlistID)
      {
        state.currentPlaylist={playlistID:playlistSong.playlist.playlistID, songs:playlistSong.playlist.songs};
        localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));
      }

      state.currentSongIndex=playlistSong.songIndex;
      state.isPlaying=true;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
    },
    shiftCurrentSong(state,shift)
    {
      state.currentSongIndex+=shift;
      if (state.currentSongIndex>=state.currentPlaylist.songs.length) state.currentSongIndex=0;
      if (state.currentSongIndex<0) state.currentSongIndex=state.currentPlaylist.songs.length-1;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
      state.isPlaying=true;
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
