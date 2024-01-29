import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
/* import Login from './components/Login'; */
import samplelogo from './images/samplelogo.png';
import Hotels from './components/Hotels';
import Favourites from './components/Favourites';
import Flights from "./components/Flights";
import Attractions from './components/Attractions'
import Restaurants from './components/Restaurants'


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">Need a Name</Link> */}
          <img src={samplelogo} alt="Logo" width="108" height="98" />
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
            <ul className="navbar-nav">
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
                <Link className="nav-link" to="/Login">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="*" element={<HomePage />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/Favourites" element={<Favourites />} />
          <Route path="/Flights" element={<Flights />} />
          <Route path="/Attractions" element={<Attractions />} />
          <Route path="/Restaurants" element={<Restaurants />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
