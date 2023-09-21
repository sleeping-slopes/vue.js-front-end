import axios from "axios";

export async function getPlaylists()
{
    try
    {
        const playlistsRes = await axios.get("http://localhost:5000/playlists");
        return playlistsRes.data;
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
        const playlistDataRes = await axios.get("http://localhost:5000/playlists/"+playlistID);

        const playlistArtistsRes = await axios.get("http://localhost:5000/playlists/"+playlistID+"/artists");
        const playlistArtists = playlistArtistsRes.data;
        for (let i = 0;i<playlistArtists.length;i++)
        {
            if (!playlistArtists[i].artistName && playlistArtists[i].artistID)
            {
                const artistRes = await axios.get("http://localhost:5000/artists/"+playlistArtists[i].artistID);
                playlistArtists[i].artistName = artistRes.data[0].name;
            }
            if (!playlistArtists[i].artistName && !playlistArtists[i].artistID)
            {
                playlistArtists[i].artistName="unknown";
            }
        }
        return {data:playlistDataRes.data[0],artists: playlistArtists};
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
        const playlistsSongsRes = await axios.get("http://localhost:5000/playlists/"+playlistID+"/songs");
        const songsInfo = [];
        for (let i = 0;i<playlistsSongsRes.data.length;i++)
        {
            const songDataRes = await axios.get("http://localhost:5000/songs/"+playlistsSongsRes.data[i].songID);

            const songArtistsRes = await axios.get("http://localhost:5000/songs/"+playlistsSongsRes.data[i].songID+"/artists");
            const songArtists = songArtistsRes.data;
            for (let j = 0;j<songArtists.length;j++)
            {
                if (!songArtists[j].artistName && songArtists[j].artistID)
                {
                    const artistRes = await axios.get("http://localhost:5000/artists/"+songArtists[j].artistID);
                    songArtists[j].artistName = artistRes.data[0].name;
                }
                if (!songArtists[j].artistName && !songArtists[j].artistID)
                {
                    songArtists[j].artistName="unknown";
                }
            }
            songsInfo[i]= {data:songDataRes.data[0],artists: songArtists,pos:i};
        }
        return songsInfo;
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
    const songsRes = await axios.get("http://localhost:5000/songs");
    const songsInfo = [];
    for (let i = 0;i<songsRes.data.length;i++)
    {
        const songDataRes = await axios.get("http://localhost:5000/songs/"+songsRes.data[i].songID);

        const songArtistsRes = await axios.get("http://localhost:5000/songs/"+songsRes.data[i].songID+"/artists");
        const songArtists = songArtistsRes.data;
        for (let j = 0;j<songArtists.length;j++)
        {
            if (!songArtists[j].artistName && songArtists[j].artistID)
            {
                const artistRes = await axios.get("http://localhost:5000/artists/"+songArtists[j].artistID);
                songArtists[j].artistName = artistRes.data[0].name;
            }
            if (!songArtists[j].artistName && !songArtists[j].artistID)
            {
                songArtists[j].artistName="unknown";
            }
        }
        songsInfo[i]= {data:songDataRes.data[0],artists: songArtists,pos:i};
    }
    return songsInfo;
  }
  catch(err)
  {
    console.log(err);
  }
}