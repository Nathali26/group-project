import React, { useState, useEffect } from "react";
import axios from "axios";
import './Restaurant.css';

export default function Restaurant() {

  const [restaurant, setRestaurants] = useState([]);
  const [consult, setConsult] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = 'url("https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails?restaurantsId=Restaurant_Review-g304554-d8010527-Reviews-Saptami-Mumbai_Maharashtra&currencyCode=USD")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  const handleSearchRestaurants = async () => {
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
        const restaurantData = response.data.data;

        // Verifica si hotelData tiene la estructura correcta
        if (Array.isArray(hotelData)) {
          // Extract relevant information for each hotel
          const formattedHotels = restaurantData.map((hotel) => ({
            id: restaurant.id,
            title: restaurant.title,
            rating: restaurant.bubbleRating?.rating || null,
            provider: restaurant.provider,
            price: restaurant.priceForDisplay?.text || null,
            originalPrice: restaurant.strikethroughPrice?.text || null,
            externalUrl: restaurant.commerceInfo?.externalUrl || null,
          }));

          // Update state with the formatted hotel data
          setHotels(formattedHotels);
          // Log the complete hotel response for debugging
          console.log("Complete Restaurant Response:", response);

          // Log the extracted hotel details for debugging
          console.log("Restaurant Details:", formattedRestaurants);
        } else {
          console.error("Invalid hotelData structure:", restaurantData);
        }
      } else {
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {}, [restaurants]);

  return (
    <div className="restaurants-bg">
      <h1>Where would you like to eat?</h1>
      <div>
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <h3>{restaurant.title}</h3>
            <p>Rating: {restaurant.rating}</p>
            <p>Provider: {restaurant.provider}</p>
            <p>Price: {restaurant.price}</p>
            {restaurant.originalPrice && (
              <p>Original Price: {restaurant.originalPrice}</p>
            )}
            <a href={restaurant.externalUrl} target="_blank">
              Reserve Now, Pay Later
            </a>
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
        <button className="search-btn" type="button" onClick={handleSearchRestaurants}>
          Reserve Now
        </button>
      </form>
    </div>
  );
}