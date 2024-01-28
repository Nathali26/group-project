import React from 'react'
import './HomePage.css';
import Hotels from './Hotels';
import Flights from './Flights';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  
  //I set the backgrounds here because I was having trouble setting different backgrounds for different components
  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1531761535209-180857e963b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);
    return (
    <div className='homepage-bg'>
      <h1>Where are you headed next?</h1>
      <div>
        <Link to="/Hotels"><button>Hotels</button></Link>
        <Link to="/Flights"><button>Flights</button></Link>
        <Link to = "/Attractions"><button>Attractions</button></Link>
        <Link to = "/Restaurants"><button>Restaurants</button></Link>
        <Routes>
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/Flights" element={<Flights />} /> 
          {/* <Route path = "/Attractions" element = {<Attractions />}/>
          <Route path = "/Restaurants" element = {<Restaurants />}/> */}
       </Routes> 
      </div>
    </div>
  );
};

