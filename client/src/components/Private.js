import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Logout from "./Logout";

export const PrivateContext = createContext();

function Private({ children }) {
  console.log("private");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function doAuthentication() {
      const {data} = await axios.get("/api/auth/verify-token");
      if (!data.success) {
        setIsAuthenticated(false);
      }
    }
    doAuthentication();
  }, []);

  if (isAuthenticated) {
    return <PrivateContext.Provider value={setIsAuthenticated}>
      {children}
    </PrivateContext.Provider>;
  } else {
    return <Logout />
  }
}

export default Private;