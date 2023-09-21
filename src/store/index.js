import { createStore } from 'vuex'


export default createStore({
  state: {
    // currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    // currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') || '-1'),
    currentPlaylist: JSON.parse('{}'),

    currentSongIndex: JSON.parse('-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    isPlaying: false,
    shuffle: false
  },
  getters:
  {
    getCurrentPlaylistSongPos(state)
    {
      return JSON.stringify({playlist: state.currentPlaylist.playlistID, songPos:state.currentSongIndex});
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
      this.state.shuffle=!this.state.shuffle;
      if (this.state.shuffle)
      for (let i = state.currentPlaylist.songs.length - 1; i > 0; i--)
      {
        let j = Math.floor(Math.random() * (i + 1));
        if (i!==state.currentSongIndex && j!==state.currentSongIndex)
        [state.currentPlaylist.songs[i], state.currentPlaylist.songs[j]] = [state.currentPlaylist.songs[j], state.currentPlaylist.songs[i]];
      }
      else
      {
        state.currentPlaylist.songs.sort((a,b)=>{return a.pos-b.pos});
      }
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
