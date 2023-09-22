import { createStore } from 'vuex'


export default createStore({
  state: {
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') || '-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    shuffle: JSON.parse(localStorage.getItem('shuffle') || 'false' ),
    // currentPlaylist: JSON.parse('{}'),
    // currentSongIndex: JSON.parse('-1'),
    isPlaying: false,
  },
  getters:
  {
    getCurrentPlaylistSongPos(state)
    {
      if (state.currentPlaylist.songs)
      return JSON.stringify({playlist: state.currentPlaylist.playlistID, songPos:state.currentPlaylist.songs[state.currentSongIndex].pos});
    },
    getCurrentSong(state)
    {
      if (state.currentPlaylist.songs)
      return state.currentPlaylist.songs[state.currentSongIndex];
    }
  },
  mutations:
  {
    async setCurrentPlaylistAndSong(state,playlistSong)
    {
        state.currentPlaylist={playlistID:JSON.parse(playlistSong).playlist.playlistID, songs:JSON.parse(playlistSong).playlist.songs};
        localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));

        state.currentSongIndex=JSON.parse(playlistSong).songIndex;
        localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
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
    },
    shuffle(state)
    {
      state.shuffle=!state.shuffle;
      if (state.shuffle)
      for (let i = state.currentPlaylist.songs.length - 1; i > 0; i--)
      {
        let j = Math.floor(Math.random() * (i + 1));
        if (i!==state.currentSongIndex && j!==state.currentSongIndex)
        [state.currentPlaylist.songs[i], state.currentPlaylist.songs[j]] = [state.currentPlaylist.songs[j], state.currentPlaylist.songs[i]];
      }
      else
      {
        state.currentSongIndex=state.currentPlaylist.songs[state.currentSongIndex].pos;
        state.currentPlaylist.songs.sort((a,b)=>{return a.pos-b.pos});
      }

      localStorage.setItem('shuffle', JSON.stringify(state.shuffle));
      localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
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
    shuffle({commit})
    {
      commit("shuffle");
    }
  },
  modules: {
  }
})
