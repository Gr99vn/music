import express from "express";
import SpotifyClient from "../spotifyClient.js";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res) => {
    const albumIds = req.query.ids.split(",");
    const albums = await SpotifyClient.getAlbums(albumIds);
    res.status(200).json(albums);
  });

albumRouter.get("/:id", async (req, res) => {
  const albumId = req.params.id;
  const album = await SpotifyClient.getAlbum(albumId);
  res.status(200).json(album);
});

export default albumRouter;