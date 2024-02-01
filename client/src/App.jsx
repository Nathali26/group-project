import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Ensure this path is correct
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import samplelogo from "./images/samplelogo.png";
import appname2 from "./images/appname2.png";
import Hotels from "./components/Hotels";
import Favourites from "./components/Favourites";
import Flights from "./components/Flights";
import Restaurants from "./components/Restaurants";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <img src={samplelogo} alt="Logo" width="108" height="98" />
          <img src={appname2} alt="Name" width="180" height="50" /> {/* Adjust the size as needed */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Favourites">
                  My Favourites
                </Link>
              </li>
              <li className="nav-item">
              {user ? (
                <Link className="nav-link" to="/" onClick={handleSignOut}>
                  Sign out
                </Link>
              ) : (
                <Link className="nav-link" to="/Login">
                  Sign in
                </Link>
              )}
             </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/Flights" element={<Flights />} />
          <Route path="/Restaurants" element={<Restaurants />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
