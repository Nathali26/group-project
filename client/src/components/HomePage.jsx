import React from 'react'
import './HomePage.css';
import Hotels from './Hotels';

export default function HomePage() {
  return (
    <div>
      <h1>Where are you headed next?</h1>
      <button>Hotels</button>
      <button>Flights</button>
      <button>Attractions</button>
      <button>Restaurants</button>
    </div>
  )
}