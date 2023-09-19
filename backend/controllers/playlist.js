import { getAllPlaylists } from "../models/playlistModel.js"
export const showAllPlaylists = (req, res)=>
{
    getAllPlaylists((err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getPlaylist } from "../models/playlistModel.js"
export const showPlaylist = (req, res)=>
{
    getPlaylist(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getPlaylistArtists } from "../models/playlistModel.js"
export const showPlaylistArtists = (req, res)=>
{
    getPlaylistArtists(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getAllSongs } from "../models/playlistModel.js"
export const showAllSongs = (req, res)=>
{
    getAllSongs((err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getSong } from "../models/playlistModel.js"
export const showSong = (req, res)=>
{
    getSong(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getSongArtists } from "../models/playlistModel.js"
export const showSongArtists = (req, res)=>
{
    getSongArtists(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getPlaylistSongs } from "../models/playlistModel.js"
export const showPlaylistSongs = (req, res)=>
{
    getPlaylistSongs(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};

import { getArtist } from "../models/playlistModel.js"
export const showArtist = (req, res)=>
{
    getArtist(req.params.id, (err,results) =>
    {
        if (err) {res.send(err); return;} res.json(results);
    });
};