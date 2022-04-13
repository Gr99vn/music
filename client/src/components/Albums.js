import "../styles/Albums.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import VerticalMenu from "./VerticalMenu";
import Album from "./Album";
import { useParams } from "react-router-dom";
import { PrivateContext } from "./Private";

const ALBUM_IDS = [
  '23O4F21GDWiGd33tFN3ZgI',
  '3AQgdwMNCiN7awXch5fAaG',
  '1kmyirVya5fRxdjsPFDM05',
  '6ymZBbRSmzAvoSGmwAFoxm',
  '4Mw9Gcu1LT7JaipXdwrq1Q',
];

function Albums() {
  console.log("albums re-render");
  const setIsAuthenticated = useContext(PrivateContext);
  const { albumId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [album, setAlbum] = useState({});

  useEffect(() => {
    async function fetchAlbum() {
      const { data} = await axios.get(`/api/albums/${albumId}`);
      if (data.success !== undefined && data.success === false) {
        setIsAuthenticated(false);
      } else {
        setAlbum(data);
      }
    }
    if (albumId) fetchAlbum();
  }, [albumId, setIsAuthenticated]);

  useEffect(() => {
    async function getAlbums(albumsIds) {
      setIsLoading(true);
      const { data } = await axios.get("/api/albums", {
        params: {
          ids: albumsIds.join(",")
        }
      });
      if (data.success !== undefined && data.success === false) {
        console.log("false");
        setIsLoading(false);
        setIsAuthenticated(false);
      } else {
        setAlbums(data);
        setIsLoading(false);
      }
    }
    getAlbums(ALBUM_IDS);
  }, [setIsAuthenticated]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="Albums">
        <VerticalMenu albums={albums} />
        <hr />
        {album && album.id && <Album album={album} />}
      </div>
    );
  }
}

export default Albums;