import axios from "axios";
import qs from "qs";
import btoa from "btoa";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";
const ENCODED_CLIENT_CREDENTIALS = btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);

function parseAlbums(albums) {
  if (!albums) return albums;
  return albums.map(album => {
    return {
      id: album.id,
      name: album.name.split("(")[0]
    }
  });
}

function getFirstImageUrl(images) {
  return images && images[0] && images[0].url;
}

function parseArtist(artist) {
  return {
    id: artist.id,
    name: artist.name
  }
}

function parseTrack(track) {
  return {
    id: track.id,
    name: track.name,
    durationMs: track.duration_ms,
    trackNumber: track.track_number
  }
}

function parseAlbum(album) {
  return {
    id: album.id,
    name: album.name,
    imageUrl: getFirstImageUrl(album.images),
    artist: parseArtist(album.artists[0]),
    tracks: album.tracks.items && album.tracks.items.map(item => parseTrack(item)),
    year: album.release_date && album.release_date.slice(0, 4)
  }
}

const SpotifyClient = {
  token: "",
  async _getApiToken() {
    const data = { grant_type: "client_credentials" };
    try {
      const res = await axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), {
        headers: {
          "Authorization": `Basic ${ENCODED_CLIENT_CREDENTIALS}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      });
      this.token = res.data.access_token;
      return res.data.access_token;
    } catch (err) {
      return null;
    }
  },
  async _getWithToken(url, token) {
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async _get(url) {
    if (!this.token) {
      await this._getApiToken();
    }
    return this._getWithToken(url, this.token);
  },
  async getAlbums(albumIds) {
    const url = `${SPOTIFY_BASE_URL}/albums?ids=${albumIds.join(",")}`;
    const { albums } = await this._get(url);
    return parseAlbums(albums);
  },
  async getAlbum(albumId) {
    const url = `${SPOTIFY_BASE_URL}/albums/${albumId}`;
    const album = await this._get(url);
    return parseAlbum(album);
  }
}

export default SpotifyClient;