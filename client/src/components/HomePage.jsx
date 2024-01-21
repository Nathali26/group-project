import React from 'react'
import { Link } from "react-router-dom";
import './HomePage.css';
import Hotels from './Hotels';

export default function HomePage() {
  return (
    <div>
      <h1>Where are you headed next?</h1>
      <Link to="/hotels">
        <button>Hotels</button>
      </Link>
      <button>Flights</button>
      <button>Attractions</button>
      <button>Restaurants</button>
    </div>
  );
}