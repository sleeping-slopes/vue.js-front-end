import { createStore } from 'vuex'
import API from '@/axios/API';

export default createStore({
  state:
  {
    authJWT: JSON.parse(localStorage.getItem('authJWT') || 'null'),
    currentPlaylist: JSON.parse(localStorage.getItem('currentPlaylist') ||'{}'),
    currentSongIndex: JSON.parse(localStorage.getItem('currentSongIndex') ||'-1'),
    darkTheme: JSON.parse(localStorage.getItem('darkTheme') || 'false'),
    shuffle: JSON.parse(localStorage.getItem('shuffle') ||'false'),
    repeatMode: JSON.parse(localStorage.getItem('repeatMode') || '0'),
    volume: JSON.parse(localStorage.getItem('volume') || '0.75'),
    songHistory: JSON.parse(localStorage.getItem('songHistory') ||'[]'),
    isPlaying: false,
    loggedIn: false,
    songs:{}, //memory leak
    playlists:{}, //memory leak
  },
  getters:
  {
    getCurrentPlaylistSongPos(state)
    {

      if (state.currentPlaylist.songs)
      {
        return {playlistID: state.currentPlaylist.id, edited:state.currentPlaylist.edited, songPos:state.currentPlaylist.songs[state.currentSongIndex].pos};
      }

    },
    getCurrentSong(state)
    {
      if (state.currentPlaylist.songs)
      return state.currentPlaylist.songs[state.currentSongIndex].id;
    },
    getPlaylist: (state) => (id) => { return state.playlists[id] || {}; },
    getSong: (state) => (id) => { return state.songs[id] || {}; },
    getSongHistory(state) { return state.songHistory.map((song, index) => { return {id:song,pos:index} }); }
  },
  mutations:
  {
    setCurrentPlaylistAndSong(state,playlistSong)
    {
      state.isPlaying=false;
      if (JSON.stringify(playlistSong.playlist) !== JSON.stringify(state.currentPlaylist)) state.shuffle=false;

      state.currentPlaylist=playlistSong.playlist;
      localStorage.setItem('currentPlaylist', JSON.stringify(state.currentPlaylist));

      state.currentSongIndex=playlistSong.songIndex;
      localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));

      setTimeout(()=>{state.isPlaying=true}, 0);
    },
    toggleRepeatMode(state)
    {
      state.repeatMode = (state.repeatMode+1)%3;
      localStorage.setItem('repeatMode', JSON.stringify(state.repeatMode));
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
    playNextSong(state)
    {
      state.isPlaying=false;
      switch (state.repeatMode)
      {
        case 0:
          state.currentSongIndex++;
          if (state.currentSongIndex>=state.currentPlaylist.songs.length)
          {
            state.currentSongIndex=0;
            localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
          }
          else
          {
            localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
            setTimeout(()=>{state.isPlaying=true}, 0);
          }
          return;

        case 1:
          state.currentSongIndex++;
          if (state.currentSongIndex>=state.currentPlaylist.songs.length) state.currentSongIndex=0;
          localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
          setTimeout(()=>{state.isPlaying=true}, 0);
          return;

        case 2:
          localStorage.setItem('currentSongIndex', JSON.stringify(state.currentSongIndex));
          setTimeout(()=>{state.isPlaying=true}, 0);
          return;
      }
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
      // state.songs={}; //memory leak
      // state.playlsts={}; //memory leak
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
    addSongToCurrentPlaylistEnd(state,id)
    {
      if (!state.currentPlaylist.songs)
      {
        state.currentPlaylist = {id: Date.now(), songs: [{id:id,pos:0}], edited: Date.now() };
        state.currentSongIndex=0;
        state.isPlaying=true;
        return;
      }
      state.currentPlaylist.songs.push({id:id,pos:state.currentPlaylist.songs.length});
      state.currentPlaylist.edited=Date.now();
    },
    addSongToCurrentPlaylistNext(state,id)
    {
      if (!state.currentPlaylist.songs)
      {
        state.currentPlaylist = {id: Date.now(), songs: [{id:id,pos:0}], edited: Date.now() };
        state.currentSongIndex=0;
        state.isPlaying=true;
        return;
      }
      state.currentPlaylist.songs.splice(state.currentSongIndex+1,0,{id:id,pos:state.currentSongIndex+1});
      for (let i=state.currentSongIndex+2;i<state.currentPlaylist.songs.length;i++)
      {
        state.currentPlaylist.songs.pos++;
      }
      state.currentPlaylist.edited=Date.now();
    },
    clearCurrentPlaylist(state)
    {
      if (!state.currentPlaylist.songs) return;
      const currentSong = state.currentPlaylist.songs[state.currentSongIndex];
      state.currentPlaylist.songs = state.currentPlaylist.songs.filter( song=> { return song==currentSong});
      state.currentPlaylist.edited=Date.now();
      state.currentPlaylist.songs[0].pos = 0;
      state.currentSongIndex=0;
    },
    updateSongHistory(state)
    {
      if (!state.currentPlaylist.songs) return;

      const currentSong = state.currentPlaylist.songs[state.currentSongIndex]?.id;

      const found = state.songHistory.findIndex((song) => song == currentSong);
      if (found!=-1) state.songHistory.splice(found,1);

      state.songHistory.unshift(currentSong);

      if (state.songHistory.length>15) state.songHistory.pop();

      localStorage.setItem('songHistory', JSON.stringify(state.songHistory));
    }
  },
  actions:
  {
    setCurrentPlaylistAndSong({commit}, playlistSong)
    {
      commit("updateSongHistory");
      commit("setCurrentPlaylistAndSong",JSON.parse(JSON.stringify(playlistSong)));
    },
    toggleRepeatMode({commit})
    {
      commit("toggleRepeatMode");
    },

    shiftCurrentSong({commit}, shift)
    {
      commit("updateSongHistory");
      commit("shiftCurrentSong", shift);
    },
    playNextSong({commit})
    {
      commit("updateSongHistory");
      commit("playNextSong");
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
    clearCurrentPlaylist({commit})
    {
      commit("clearCurrentPlaylist");
    },
    addSongToCurrentPlaylistEnd({commit},id)
    {
      commit("addSongToCurrentPlaylistEnd",id);
    },
    addSongToCurrentPlaylistNext({commit},id)
    {
      commit("addSongToCurrentPlaylistNext",id);
    },
    async loadSong({commit},id)
    {
      // await new Promise(r => setTimeout(r, 1000+Math.random()*2000000));
      const song = await API.get('songs/'+id);
      commit("loadSong",song);
    },
    async loadPlaylist({commit},id)
    {
      // await new Promise(r => setTimeout(r, 1000+Math.random()*2000000));
      const playlist = await API.get('playlists/'+id);
      commit("loadPlaylist",playlist);
    }
  },
  modules: {
  }
})
