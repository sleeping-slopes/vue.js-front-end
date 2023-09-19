import express from "express";
const router = express.Router();

import { showAllPlaylists } from "../controllers/playlist.js";
import { showPlaylist } from "../controllers/playlist.js";
import { showPlaylistSongs } from "../controllers/playlist.js";
import { showPlaylistArtists } from "../controllers/playlist.js";

import { showAllSongs } from "../controllers/playlist.js";
import { showSong } from "../controllers/playlist.js";
import { showSongArtists } from "../controllers/playlist.js";

import { showArtist } from "../controllers/playlist.js";


router.get("/playlists", showAllPlaylists);
router.get("/playlists/:id", showPlaylist);
router.get("/playlists/:id/songs", showPlaylistSongs);
router.get("/playlists/:id/artists", showPlaylistArtists);

router.get("/songs", showAllSongs);
router.get("/songs/:id", showSong);
router.get("/songs/:id/artists", showSongArtists);

router.get("/artists/:id", showArtist);

export default router;