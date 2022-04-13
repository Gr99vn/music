import './App.css';
import Register from './components/Register';
import { Link, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import { createContext, Fragment, useEffect, useState } from 'react';
import Album from './components/Album';
import Albums from './components/Albums';
import Private from './components/Private';
import { USER } from './Constant';
import axios from 'axios';

export const UserContext = createContext();


function App() {
  console.log("app re-render");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem(USER)));

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/csrf-token");
      axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <div className="brand">
          <Link to="/" className="brandLogo" children={<span>Music</span>} />
        </div>
        <nav>
          <div className='navbar'>
            <div className='navItem'>
              <Link to="/albums" children="Albums" />
            </div>
            <div className="userDropdown navItem">
              <div className="dropdownBtn">
                <div className="greeting">
                  <p>Hi{`, ${user?.firstName ?? "Amonymous"}`}</p>
                </div>
              </div>
              <div className="dropdownContent">
                {!user ?
                  <Fragment>
                    <Link to="/login">
                      Login
                    </Link>
                    <Link to="/register" children="Register" />
                  </Fragment> :
                  <Link to="/logout" children="Logout" />
                }
              </div>
            </div>
          </div>
        </nav>
      </div>
      <hr />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Logout />} />
        <Route path="albums" element={<Private children={<Albums />} />} >
          <Route path=":albumId" element={<Private children={<Album />} />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
