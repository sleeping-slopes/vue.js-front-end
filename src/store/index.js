import { createStore } from 'vuex'

export default createStore({
  state: {
    //
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') || '{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') ||'-1'),
    recentListened: JSON.parse(localStorage.getItem('recentListened') ||'[]'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
<<<<<<< Updated upstream
=======
    shuffle: JSON.parse(localStorage.getItem('shuffle') || 'false' ),
    authJWT: JSON.parse(localStorage.getItem('authJWT') || 'null' ),
>>>>>>> Stashed changes
    isPlaying: false,
  },
  getters:
  {
<<<<<<< Updated upstream
    getCurrentSongPos(state)
=======
    getCurrentPlaylist(state)
    {
      return JSON.stringify(state.currentPlaylist.songs);
    },
    getCurrentPlaylistSongPos(state)
>>>>>>> Stashed changes
    {
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return state.currentPlaylist.songs[state.currentSongIndex].songPos;
      return -1;
    },
    getCurrentSongPlaylistPos(state)
    {
<<<<<<< Updated upstream
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return JSON.stringify({playlist: state.currentPlaylist.playlistID, songPos:state.currentPlaylist.songs[state.currentSongIndex].songPos});
      return -1;
    },
    getCurrentSongSrc(state)
    {
      if (state.currentPlaylist && state.currentPlaylist.songs && state.currentPlaylist.songs.length &&  state.currentSongIndex>=0)
      return state.currentPlaylist.songs[state.currentSongIndex].audio;
      return -1;
=======
      if (state.currentPlaylist.songs)
      return state.currentPlaylist.songs[state.currentSongIndex].id;
    },
    getJWT(state)
    {
      return state.authJWT;
>>>>>>> Stashed changes
    }
  },
  mutations:
  {
    setCurrentPlaylistAndSong(state,playlistSong)
    {

<<<<<<< Updated upstream
      state.currentSongIndex=JSON.parse(playlistSong).songIndex;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

      state.currentPlaylist={playlistID:JSON.parse(playlistSong).playlist.playlistID, songs:JSON.parse(playlistSong).playlist.songs};
      localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));
=======
        state.currentSongIndex=JSON.parse(playlistSong).songIndex;
        localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

        const found = state.recentListened.findIndex((song) => song.id == state.currentPlaylist.songs[state.currentSongIndex].id);
        if (found!=-1) state.recentListened.splice(found,1);

        state.recentListened.unshift(state.currentPlaylist.songs[state.currentSongIndex]);

        if (state.recentListened.length>15) state.recentListened.pop();

        localStorage.setItem('recentListened', JSON.stringify(state.recentListened));
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
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


      localStorage.setItem('authJWT', JSON.stringify("test"));
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
    }
  },
  modules: {
  }
})
