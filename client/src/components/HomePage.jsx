import React from 'react'
import { Link } from "react-router-dom";
import './HomePage.css';
import Hotels from './Hotels';
import { Routes, Route } from 'react-router-dom';
import Flights from './Flights';


export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Where are you headed next?</h1>
      </div>
      <div>
        <Link to="/Hotels"><button>Hotels</button></Link>
        <Link to="/Flights"><button>Flights</button></Link>
         {/* <Link to = "/Attractions"><button>Attractions</button></Link>
        <Link to = "/Restaurants"><button>Restaurants</button></Link> */}
        <Routes>
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/Flights" element={<Flights />} />
          {/* <Route path = "/Attractions" element = {<Attractions />}/>
          <Route path = "/Restaurants" element = {<Restaurants />}/> */}
        </Routes>
      </div>
    </div>
  );
}

