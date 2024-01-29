import React, { useState, useEffect } from "react";
import axios from "axios";
import './Hotels.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the heart icon for favourites

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [consult, setConsult] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

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
      const formattedCheckIn = new Date(checkIn).toISOString().split("T")[0];
      const formattedCheckOut = new Date(checkOut).toISOString().split("T")[0];


      const locationResponse = await axios.get(
        "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",
        {
          params: {
            query: consult,
            limit: 1,
          },
          headers: {
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
            "X-RapidAPI-Key":
            "c7a075516cmsh8251f79600f7f70p1bd29ajsn386c966d5b91",
            "Content-Type": "application/json",
          },
        }
      );


      if (
        locationResponse.data &&
        locationResponse.data.data &&
        locationResponse.data.data.length > 0
      ) {
        
         const firstGeoId = locationResponse?.data?.data?.[0]?.geoId || null;



          console.log("el firstgeoId es este=" ,firstGeoId)

        if (firstGeoId) {
          const hotelApiUrl =
            "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels";

          const hotelParams = {
            geoId: firstGeoId,
            checkIn: formattedCheckIn,
            checkOut: formattedCheckOut,
          };

          const hotelResponse = await axios.get(hotelApiUrl, {
            params: hotelParams,
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key":
              "c7a075516cmsh8251f79600f7f70p1bd29ajsn386c966d5b91",
              "Content-Type": "application/json",
            },
          });

          if (
            hotelResponse.data &&
            hotelResponse.data.data &&
            hotelResponse.data.data.data &&
            Array.isArray(hotelResponse.data.data.data)
          ) {
            const hotelData = hotelResponse.data.data.data;

            if (hotelData.length > 0) {
              const formattedHotels = hotelData.map((hotel) => ({
                id: hotel.id,
                title: hotel.title,
                rating: hotel.bubbleRating?.rating || null,
                provider: hotel.provider,
                price: hotel.priceForDisplay?.text || null,
                originalPrice: hotel.strikethroughPrice?.text || null,
                externalUrl: hotel.commerceInfo?.externalUrl || null,
              }));

              setHotels(formattedHotels);
              console.log("Complete Hotel Response:", hotelResponse);
              console.log("Hotel Details:", formattedHotels);
            } else {
              console.error("No hotels found in the response");
            }
          } else {
            console.error("Invalid response structure:", hotelResponse.data);
          }
        } else {
          console.error("No geoId found in the response");
        }
      } else {
        console.error("No data found in the location response");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error("El error del catch es:", error);
    }
  };

  return (

    <div>
      <h1>Hotel List: </h1>


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
            <a
              href={hotel.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
