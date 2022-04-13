import "../styles/Album.css";
import {useNavigate} from "react-router-dom";
import { toHumanReadableDuration } from "../utils";

function Album({ album }) {
  const navigate = useNavigate();
  return (
    <div className="Album">
      <div className="header">
        <div className="albumImage">
          <img src={album.imageUrl} width="160px" height="160px" alt={album.name} />
        </div>
        <div className="albumInfo">
          <p>By {album.artist.name} - {album.tracks.length} songs.</p>
          <button className="btnClose" onClick={() => navigate("/albums")}>Close</button>
        </div>
      </div>
      <div className="tracks">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="textLeft trackName">Song</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {album.tracks.map(track => (
              <tr key={track.id} className="Track">
                <td className="textCenter">{track.trackNumber}</td>
                <td className="trackName">{track.name}</td>
                <td className="textCenter">{toHumanReadableDuration(track.durationMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Album;