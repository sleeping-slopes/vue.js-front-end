import axios from "axios";


export async function getPlaylists()
{
    try
    {
        const playlistsRes = await axios.get("http://localhost:5000/api/playlists");
        return playlistsRes.data.values;
    }
    catch(err)
    {
        console.log(err);
    }
}

export async function getPlaylistData(playlistID)
{
    try
    {
        const playlistDataRes = await axios.get("http://localhost:5000/api/playlists/"+playlistID);
        return playlistDataRes.data.values;
    }
    catch(err)
    {
        console.log(err);
    }
}

export async function getPlaylistSongs(playlistID)
{
    try
    {
        const playlistsSongsRes = await axios.get("http://localhost:5000/api/playlists/"+playlistID+"/songs");
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
        const songsRes = await axios.get("http://localhost:5000/api/songs");
        const songsInfo = [];
        for (let i = 0;i<songsRes.data.values.length;i++)
        {
            songsInfo[i]={id:songsRes.data.values[i].id,pos:i};
        }
        return songsInfo;
    }
    catch(err)
    {
        console.log(err);
    }
}

export async function getSongData(songID)
{
    try
    {
        const songDataRes = await axios.get("http://localhost:5000/api/songs/"+songID);
        return songDataRes.data.values;
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