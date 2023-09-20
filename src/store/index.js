import { createStore } from 'vuex'


export default createStore({
  state: {
    // currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    // currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') || '-1'),
    currentPlaylist: JSON.parse('{}'),

    currentSongIndex: JSON.parse('-1'),
    queue: JSON.parse('[]'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    isPlaying: false,
  },
  getters:
  {
    getCurrentPlaylistSongPos(state)
    {
      return JSON.stringify({playlist: state.currentPlaylist.playlistID, songPos:state.queue[state.currentSongIndex]});
    },
    getCurrentSong(state)
    {
      if (state.currentPlaylist.songs)
      return state.currentPlaylist.songs[state.queue[state.currentSongIndex]];
    }
  },
  mutations:
  {
    async setCurrentPlaylistAndSong(state,playlistSong)
    {
        state.currentPlaylist={playlistID:JSON.parse(playlistSong).playlist.playlistID, songs:JSON.parse(playlistSong).playlist.songs};
        localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));

        state.queue= [...Array(state.currentPlaylist.songs.length).keys()];
        localStorage.setItem('queue', JSON.stringify(state.queue));

        state.currentSongIndex=JSON.parse(playlistSong).songIndex;
        localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
    },
    shiftCurrentSong(state,shift)
    {
      state.currentSongIndex+=shift;
      if (state.currentSongIndex>=state.queue.length) state.currentSongIndex=0;
      if (state.currentSongIndex<0) state.currentSongIndex=state.queue.length-1;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
    },
    toggleTheme(state)
    {
      state.darkTheme=!state.darkTheme;
      localStorage.setItem('darkTheme', JSON.stringify(state.darkTheme));
    },
    shuffleSongs(state)
    {
      // for (let i = state.queue.length - 1; i > 0; i--) {
      //   let j = Math.floor(Math.random() * (i + 1));
      //   [state.queue[i], state.queue[j]] = [state.queue[j], state.queue[i]];
      // }
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
    },
    shuffleSongs({commit})
    {
      commit("shuffleSongs");
    }
  },
  modules: {
  }
})
