import React, { useState, useEffect } from "react";
import axios from "axios";
import './Hotels.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the heart icon for favourites

export default function Hotels() {

  const [hotels, setHotels] = useState([]);
  const [consult, setConsult] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  const handleSearchHotels = async () => {
    try {
      // Aquí convertimos las fechas al formato YYYY-MM-DD
      const formattedCheckIn = new Date(checkIn).toISOString().split("T")[0];
      const formattedCheckOut = new Date(checkOut).toISOString().split("T")[0];

      //Add hotels to favourites list
      const handleAddToFavourites = async (hotel) => {
        try {
          await axios.post("http://localhost:4000/api/favourites", hotel);
        } catch (error) {
          console.error("Error adding to favourites:", error);
        }
      };

      const response = await axios.get("/api/searchLocation", {
  params: {
    query: consult,
    checkIn: formattedCheckIn,
    checkOut: formattedCheckOut,
        },
      });
      // Log the complete response for debugging
      console.log("Complete API Response:", response);

      // Verifica si la respuesta y la estructura de datos son las esperadas
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        // Extract data from the response
        const hotelData = response.data.data;

        // Verifica si hotelData tiene la estructura correcta
        if (Array.isArray(hotelData)) {
          // Extract relevant information for each hotel
          const formattedHotels = hotelData.map((hotel) => ({
            id: hotel.id,
            title: hotel.title,
            rating: hotel.bubbleRating?.rating || null,
            provider: hotel.provider,
            price: hotel.priceForDisplay?.text || null,
            originalPrice: hotel.strikethroughPrice?.text || null,
            externalUrl: hotel.commerceInfo?.externalUrl || null,
          }));

          // Update state with the formatted hotel data
          setHotels(formattedHotels);
          // Log the complete hotel response for debugging
          console.log("Complete Hotel Response:", response);

          // Log the extracted hotel details for debugging
          console.log("Hotel Details:", formattedHotels);
        } else {
          console.error("Invalid hotelData structure:", hotelData);
        }
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {}, [hotels]);

  return (
    <div className="hotels-bg">
      <h1>Where would you like to stay?</h1>
      <div>
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <h3>{hotel.title}</h3>
            <p>Rating: {hotel.rating}</p>
            <p>Provider: {hotel.provider}</p>
            <p>Price: {hotel.price}</p>
            {hotel.originalPrice && (
              <p>Original Price: {hotel.originalPrice}</p>
            )}
            <a href={hotel.externalUrl} target="_blank">
              Book Now
            </a>
            <button 
              onClick={() => handleAddToFavourites(hotel)}
              className="favourite-btn"
            >
              <FontAwesomeIcon icon={faHeart} /> {/* Heart icon */}
            </button>
          </div>
        ))}
      </div>

      <form className="form">
        <label className="label" htmlFor="query">Location:</label>
        <input
          type="text"
          id="query"
          name="query"
          value={consult}
          onChange={(e) => setConsult(e.target.value)}
        />

        <label className="label" htmlFor="checkIn">Check-in:</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label className="label" htmlFor="checkOut">Check-out:</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button className="search-btn" type="button" onClick={handleSearchHotels}>
          Search Hotels
        </button>
      </form>
    </div>
  );
}