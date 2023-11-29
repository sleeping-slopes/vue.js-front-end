import axios from "axios";
import store from '@/store/index.js'


export async function getPlaylists()
{
    try
    {
        axios.defaults.headers.common['Authorization'] = store.state.authJWT;
        const playlistsRes = await axios.get("http://localhost:5000/api/playlists");
        return playlistsRes.data.values;
    }
    catch(err)
    {
        console.log(err);
    }
}

export async function getPlaylist(playlistID)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const playlistDataRes = await axios.get("http://localhost:5000/api/playlists/"+playlistID);
      return playlistDataRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getPlaylistSongs(id)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const playlistsSongsRes = await axios.get("http://localhost:5000/api/playlists/"+id+"/songs");
      return playlistsSongsRes.data.values;
    }
    catch(err)
    {
      console.log(err);
    }
}

export async function getSongs()
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songsRes = await axios.get("http://localhost:5000/api/songs");
    return songsRes.data.values;
  }
  catch(err)
  {
    console.log(err);
  }
}

export async function getSong(id)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songRes = await axios.get("http://localhost:5000/api/songs/"+id);
    return songRes.data.values;
  }
  catch(err)
  {
    console.log(err);
  }
}

export async function getAudio(id)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songRes = await axios.get("http://localhost:5000/api/songs/"+id+"/audio");
    return songRes.data.values;
  }
  catch(err)
  {
    console.log(err);
  }
}

export async function postUser(email,password,username)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const postUserRes = await axios.post("http://localhost:5000/api/auth/signup",{ email:email, password:password, username:username});
      return postUserRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function logInUser(username,password)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const logInUserRes = await axios.post("http://localhost:5000/api/auth/login",{ username:username, password:password });
      return logInUserRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUser()
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const userRes = await axios.get("http://localhost:5000/api/user");
      return userRes.data;
    }
    catch(err)
    {
        return err.response.data;
    }
}

export async function getUserPlaylists()
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const playlistsRes = await axios.get("http://localhost:5000/api/user/playlists");
      return playlistsRes.data.values;
    }
    catch(err)
    {
        console.log(err.response.data.values.message);
        return [];
    }
}

export async function getUserSongs()
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songsRes = await axios.get("http://localhost:5000/api/user/songs");
    const songsInfo = [];
    for (let i = 0;i<songsRes.data.values.length;i++)
    {
        songsInfo[i]= {id:songsRes.data.values[i].id,pos:i};
    }
    return songsInfo;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}
