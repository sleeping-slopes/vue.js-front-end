import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') || '-1'),
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
    }
  },
  modules: {
  }
})
