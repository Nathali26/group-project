import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [consult, setConsult] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearchHotels = async () => {
    try {
      // Aquí convertimos las fechas al formato YYYY-MM-DD
      const formattedCheckIn = new Date(checkIn).toISOString().split("T")[0];
      const formattedCheckOut = new Date(checkOut).toISOString().split("T")[0];


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
    <div>
      <h1>Hotel List: </h1>
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
          </div>
        ))}
      </div>

      <form>
        <label htmlFor="query">Consult:</label>
        <input
          type="text"
          id="query"
          name="query"
          value={consult}
          onChange={(e) => setConsult(e.target.value)}
        />

        <label htmlFor="checkIn">Check-in:</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label htmlFor="checkOut">Check-out:</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button type="button" onClick={handleSearchHotels}>
          Search Hotels
        </button>
      </form>
    </div>
  );
}