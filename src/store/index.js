import { createStore } from 'vuex'


export default createStore({
  state: {
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') ||'{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') ||'-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    shuffle: JSON.parse(localStorage.getItem('shuffle') ||'false'),
    authJWT: JSON.parse(localStorage.getItem('authJWT') || 'null' ),
    isPlaying: false,
  },
  getters:
  {
    getCurrentPlaylistSongPos(state)
    {
      if (state.currentPlaylist.songs)
      return JSON.stringify({playlistID: state.currentPlaylist.id, songPos:state.currentPlaylist.songs[state.currentSongIndex].pos});
    },
    getCurrentSong(state)
    {
      if (state.currentPlaylist.songs)
      return state.currentPlaylist.songs[state.currentSongIndex].id;
    }
  },
  mutations:
  {
    setCurrentPlaylistAndSong(state,playlistSong)
    {
      state.isPlaying=false;

      if (JSON.stringify(JSON.parse(playlistSong).playlist) !== JSON.stringify(state.currentPlaylist)) state.shuffle=false;

      state.currentPlaylist=JSON.parse(playlistSong).playlist;
      localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));

      state.currentSongIndex=JSON.parse(playlistSong).songIndex;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

      setTimeout(()=>{state.isPlaying=true}, 0);
    },

    shiftCurrentSong(state,shift)
    {
      state.isPlaying=false;

      state.currentSongIndex+=shift;
      if (state.currentSongIndex>=state.currentPlaylist.songs.length) state.currentSongIndex=0;
      if (state.currentSongIndex<0) state.currentSongIndex=state.currentPlaylist.songs.length-1;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

      setTimeout(()=>{state.isPlaying=true}, 0);
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
    },
    logIn(state,authJWT)
    {
      state.authJWT=authJWT;
      localStorage.setItem('authJWT', JSON.stringify(state.authJWT));
    },
    logOut(state)
    {
      state.authJWT=null;
      localStorage.setItem('authJWT', JSON.stringify(state.authJWT));
    },
    togglePlayingState(state)
    {
      state.isPlaying=!state.isPlaying;
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
    },
    logIn({commit},authJWT)
    {
      commit("logIn",authJWT);
    },
    logOut({commit})
    {
      commit("logOut");
    },
    togglePlayingState({commit})
    {
      commit("togglePlayingState");
    }
  },
  modules: {
  }
})
