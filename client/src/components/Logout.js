import axios from "axios";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App";
import { USER } from "../Constant";

function Logout() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      localStorage.removeItem(USER);
      setUser(null);
      axios.get("/api/auth/logout");
    }
  }, [user, navigate, setUser]);

  return null;
}

export default Logout;