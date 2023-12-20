import axios from "axios";
import store from '@/store/index.js'


export async function getPlaylists()
{
    try
    {
        axios.defaults.headers.common['Authorization'] = store.state.authJWT;
        const playlistsRes = await axios.get("http://192.168.100.7:5000/api/playlists");
        return playlistsRes.data.values;
    }
    catch(err)
    {
      return ({"error":{"status":err.response.status,"message":err.response.data.values}});
    }
}

export async function getPlaylist(playlistID)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const playlistDataRes = await axios.get("http://192.168.100.7:5000/api/playlists/"+playlistID);
      return playlistDataRes.data.values;
    }
    catch(err)
    {
      return ({"error":{"status":err.response.status,"message":err.response.data.values}});
    }
}

export async function getPlaylistSongs(id)
{
    try
    {
      axios.defaults.headers.common['Authorization'] = store.state.authJWT;
      const playlistSongsRes = await axios.get("http://192.168.100.7:5000/api/playlists/"+id+"/songs");
      return playlistSongsRes.data.values;
    }
    catch(err)
    {
      return ({"error":{"status":err.response.status,"message":err.response.data.values}});
    }
}

export async function getSongs()
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songsRes = await axios.get("http://192.168.100.7:5000/api/songs");
    return songsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getSong(id)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songDataRes = await axios.get("http://192.168.100.7:5000/api/songs/"+id);
    return songDataRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getAudio(id)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songAudioRes = await axios.get("http://192.168.100.7:5000/api/songs/"+id+"/audio");
    return songAudioRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function postUser(email,password,login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const postUserRes = await axios.post("http://192.168.100.7:5000/api/auth/signup",{ email:email, password:password, login:login});
    return postUserRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function logInUser(login,password)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const logInUserRes = await axios.post("http://192.168.100.7:5000/api/auth/login",{ login:login, password:password });
    return logInUserRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserByToken()
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userByTokenRes = await axios.get("http://192.168.100.7:5000/api/me");
    return userByTokenRes.data;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserUsername(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/username");
    return userRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUser(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/profile");
    return userRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserLinks(login)
{
  try
  {

    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userLinksRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/links");
    return userLinksRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserAllSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userSongsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/songs");
    return userSongsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserCreatedSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userSongsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/songs/created");
    return userSongsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserCreatedPopularSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userSongsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/songs/created/popular");
    return userSongsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserLikedSongs(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userSongsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/songs/liked");
    return userSongsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserAllPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userPlaylistsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/playlists");
    return userPlaylistsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserCreatedPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userPlaylistsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/playlists/created");
    return userPlaylistsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserCreatedPopularPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userPlaylistsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/playlists/created/popular");
    return userPlaylistsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserLikedPlaylists(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userPlaylistsRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/playlists/liked");
    return userPlaylistsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserFollowers(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userFollowersRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/followers");
    return userFollowersRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getUserFollowing(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const userFollowingRes = await axios.get("http://192.168.100.7:5000/api/users/"+login+"/following");
    return userFollowingRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function postLikeSong(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const postLikeSongRes = await axios.post("http://192.168.100.7:5000/api/songs/"+songID+"/action/like/post");
    return postLikeSongRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function deleteLikeSong(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const deleteLikeSongRes = await axios.post("http://192.168.100.7:5000/api/songs/"+songID+"/action/like/delete");
    return deleteLikeSongRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function postLikePlaylist(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const postLikePlaylistRes = await axios.post("http://192.168.100.7:5000/api/playlists/"+songID+"/action/like/post");
    return postLikePlaylistRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function deleteLikePlaylist(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const deleteLikePlaylistRes = await axios.post("http://192.168.100.7:5000/api/playlists/"+songID+"/action/like/delete");
    return deleteLikePlaylistRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getSongLikedUsers(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songLikedUsersRes = await axios.get("http://192.168.100.7:5000/api/songs/"+songID+"/likes");
    return songLikedUsersRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function getSongPlaylists(songID)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const songPlaylistsRes = await axios.get("http://192.168.100.7:5000/api/songs/"+songID+"/playlists");
    return songPlaylistsRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function postFollowUser(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const postLikePlaylistRes = await axios.post("http://192.168.100.7:5000/api/users/"+login+"/action/follow/post");
    return postLikePlaylistRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}

export async function deleteFollowUser(login)
{
  try
  {
    axios.defaults.headers.common['Authorization'] = store.state.authJWT;
    const deleteLikePlaylistRes = await axios.post("http://192.168.100.7:5000/api/users/"+login+"/action/follow/delete");
    return deleteLikePlaylistRes.data.values;
  }
  catch(err)
  {
    return ({"error":{"status":err.response.status,"message":err.response.data.values}});
  }
}