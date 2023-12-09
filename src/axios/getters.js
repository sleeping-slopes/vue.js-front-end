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

export async function postUser(email,password,login)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const postUserRes = await axios.post("http://localhost:5000/api/auth/signup",{ email:email, password:password, login:login});
      return postUserRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function logInUser(login,password)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const logInUserRes = await axios.post("http://localhost:5000/api/auth/login",{ login:login, password:password });
      return logInUserRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUserByToken()
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

export async function getUserUsername(login)
{
    try
    {

      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const userRes = await axios.get("http://localhost:5000/api/user/"+login+"/username");
      return userRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUserProfile(login)
{
    try
    {

      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const userRes = await axios.get("http://localhost:5000/api/user/"+login+"/profile");
      return userRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUserShortProfile(login)
{
    try
    {

      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const userRes = await axios.get("http://localhost:5000/api/user/"+login+"/shortprofile");
      return userRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUserLinks(login)
{
    try
    {

      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const userLinksRes = await axios.get("http://localhost:5000/api/user/"+login+"/links");
      return userLinksRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function getUserSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userSongsRes = await axios.get("http://localhost:5000/api/user/"+login+"/songs");
    return userSongsRes.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function getUserPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userPlaylists = await axios.get("http://localhost:5000/api/user/"+login+"/playlists");
    return userPlaylists.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function getUserLikedSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userLikedSongsRes = await axios.get("http://localhost:5000/api/user/"+login+"/likes/songs");
    return userLikedSongsRes.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function getUserLikedPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userLikedSongsRes = await axios.get("http://localhost:5000/api/user/"+login+"/likes/playlists");
    return userLikedSongsRes.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function getUserFollowers(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userFollowersRes = await axios.get("http://localhost:5000/api/user/"+login+"/followers");
    return userFollowersRes.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function getUserFollowing(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userFollowingRes = await axios.get("http://localhost:5000/api/user/"+login+"/following");
    return userFollowingRes.data.values;
  }
  catch(err)
  {
    console.log(err.response.data.values.message);
    return [];
  }
}

export async function likeSong(songID)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const likeSongRes = await axios.post("http://localhost:5000/api/songs/"+songID+"/action/like/post");
      return likeSongRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}

export async function dislikeSong(songID)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const dislikeSongRes = await axios.post("http://localhost:5000/api/songs/"+songID+"/action/like/delete");
      return dislikeSongRes.data.values;
    }
    catch(err)
    {
        return err.response.data.values;
    }
}