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

export async function getPlaylist(playlistID)
{
    try
    {
        const playlistDataRes = await axios.get("http://localhost:5000/api/playlists/"+playlistID);
        // if (playlistDataRes.data.status==404) alert(playlistDataRes.data.message);
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
    const songRes = await axios.get("http://localhost:5000/api/songs/"+id+"/audio");
    return songRes.data.values;
  }
  catch(err)
  {
    console.log(err);
  }
}
