import db from "../config/database.js"

export const getAllPlaylists=(result)=>
{
    db.query("SELECT * FROM playlists", (err,results)=>
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
    db.query("SELECT * FROM view_playlist_songs WHERE playlistID=?",[id], (err,results)=>
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
    db.query("SELECT * FROM songs", (err,results)=>
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


// SELECT * FROM playlists
// INNER JOIN user_playlists ON user_playlists.playlistID = playlists.id
// WHERE user_playlists.userID=1

// SELECT * FROM view_user_playlists WHERE userID=0;
