import "../styles/VerticalMenu.css";
import { NavLink} from "react-router-dom";

function VerticalMenu({ albums }) {
  let menuItems;
  if (albums.length > 0) {
    menuItems = albums.map(album => (
      <NavLink
        key={album.id}
        to={`/albums/${album.id}`}

        className="MenuItem"
        children={album.name}
      />
    ));
  }
  return (
    <div className="VerticalMenu">
      <h3 className="title">Albums</h3>
      {menuItems}
    </div>
  );
}

export default VerticalMenu;