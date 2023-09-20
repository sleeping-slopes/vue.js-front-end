import db from "../config/database.js"

export const getAllPlaylists=(result)=>
{
    db.query("SELECT id FROM playlists", (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getPlaylist=(id,result)=>
{
    db.query("SELECT * FROM playlists WHERE playlists.id=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getPlaylistArtists=(id,result)=>
{
    db.query("SELECT artistID, artistName FROM view_playlist_artists WHERE playlistID=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getSongArtists=(id,result)=>
{
    db.query("SELECT artistID, artistName FROM view_song_artists WHERE songID=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getPlaylistSongs=(id,result)=>
{
    db.query("SELECT songID FROM view_playlist_songs WHERE playlistID=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getAllSongs=(result)=>
{
    db.query("SELECT id as songID FROM songs", (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getSong=(id,result)=>
{
    db.query("SELECT * FROM songs WHERE songs.id=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}

export const getArtist=(id,result)=>
{
    db.query("SELECT * FROM artists WHERE artists.id=?",[id], (err,results)=>
    {
        if (err)
        {
            console.log(err);
            result(err,null);
            return;
        }
        result(null,results);
    });
}