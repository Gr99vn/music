import "../styles/Album.css";
import { toHumanReadableDuration } from "../utils";

function Album({ album }) {
  return (
    <div className="Album">
      <div className="header">
        <div className="albumImage">
          <img src={album.imageUrl} width="160px" height="160px" alt={album.name} />
        </div>
        <div className="albumInfo">
          <p><b>{album.name}</b></p>
          <p>{album.artist.name}</p>
        </div>
      </div>
      <div className="tracks">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="textLeft">Song</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {album.tracks.map(track => (
              <tr key={track.id} className="Track">
                <td className="trackName textCenter">{track.trackNumber}</td>
                <td className="trackName">{track.name}</td>
                <td className="trackName textCenter">{toHumanReadableDuration(track.durationMs)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Album;