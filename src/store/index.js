import { createStore } from 'vuex'
import API from '@/axios/API';

export default createStore({
  state:
  {
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') ||'{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') ||'-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false' ),
    shuffle: JSON.parse(localStorage.getItem('shuffle') ||'false'),
    authJWT: JSON.parse(localStorage.getItem('authJWT') || 'null' ),
    volume: JSON.parse(localStorage.getItem('volume') || '0.75' ),
    isPlaying: false,
    loggedIn: false,
    songs:{},
    playlists:{}, //memory leak
    songHistory: JSON.parse(localStorage.getItem('songHistory') ||'[]'),
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
    },
    getPlaylist: (state) => (id) => {
      return state.playlists[id] || {};
    },
    getSong: (state) => (id) => {
      return state.songs[id] || {};
    },
    getSongHistory(state)
    {
      return state.songHistory.map((song, index) => { return {id:song,pos:index} });
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
      state.loggedIn=true;
      localStorage.setItem('authJWT', JSON.stringify(state.authJWT));
    },
    logOut(state)
    {
      state.authJWT=null;
      state.loggedIn=false;
      localStorage.setItem('authJWT', JSON.stringify(state.authJWT));
    },
    togglePlayingState(state)
    {
      state.isPlaying=!state.isPlaying;
    },
    loadSong(state,song)
    {
      state.songs[song.id]=song;
    },
    loadPlaylist(state,playlist)
    {
      state.playlists[playlist.id]=playlist;
    },
    setVolume(state,volume)
    {
      state.volume=volume;
      localStorage.setItem('volume', JSON.stringify(state.volume));
    },
    clearSongHistory(state)
    {
      state.songHistory=[];
      localStorage.setItem('songHistory', JSON.stringify(state.songHistory));
    },
    updateSongHistory(state)
    {
      const currentSong = state.currentPlaylist.songs[state.currentSongIndex].id;
      const found = state.songHistory.findIndex((song) => song == currentSong);
      if (found!=-1) state.songHistory.splice(found,1);

      state.songHistory.unshift(currentSong);

      if (state.songHistory.length>15) state.songHistory.pop();

      localStorage.setItem('songHistory', JSON.stringify(state.songHistory));
    },
  },
  actions:
  {
    setCurrentPlaylistAndSong({commit}, playlistSong)
    {
      commit("setCurrentPlaylistAndSong",playlistSong);
      commit("updateSongHistory");
    },
    shiftCurrentSong({commit}, shift)
    {
      commit("shiftCurrentSong", shift);
      commit("updateSongHistory");
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
    },
    setVolume({commit},volume)
    {
      commit("setVolume",volume);
    },
    clearSongHistory({commit})
    {
      commit("clearSongHistory");
    },
    async loadSong({commit},id)
    {
      const song = await API.get('songs/'+id);
      commit("loadSong",song);
    },
    async loadPlaylist({commit},id)
    {
      const playlist = await API.get('playlists/'+id);
      commit("loadPlaylist",playlist);
    }
  },
  modules: {
  }
})
