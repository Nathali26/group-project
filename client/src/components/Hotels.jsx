import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hotels.css";
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
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
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
              "52f456776emsh373fb71559d80c8p193cc0jsnb861ec37df67",
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

        console.log("el firstgeoId es este=", firstGeoId);

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
                "593a26352cmsha2f8cbf6fd0cc89p14919djsn5a1d27b6cebd",
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
                price: hotel.priceForDisplay,
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

  const handleAddToFavourites = async (hotel) => {
    try {
      await axios.post("http://localhost:4000/api/favourites_list", {
        title: hotel.title,
        rating: hotel.rating,
        provider: hotel.provider,
        price: hotel.priceForDisplay,
        externalUrl: hotel.commerceInfo?.externalUrl,
      });
      console.log("Hotel added to favourites successfully");
    } catch (err) {
      console.error("Error adding to favourites:", err);
    }
  };

  return (
    <div>
      <h1>Hotel List: </h1>

      <form className="form">
        <label className="label" htmlFor="query">
          Location:
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={consult}
          onChange={(e) => setConsult(e.target.value)}
        />

        <label className="label" htmlFor="checkIn">
          Check-in:
        </label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label className="label" htmlFor="checkOut">
          Check-out:
        </label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button
          className="search-btn"
          type="button"
          onClick={handleSearchHotels}
        >
          Search Hotels
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="card"
            style={{ width: "18rem", marginBottom: "20px" }}
          >
            <div className="card-body" style={{ color: "#000000" }}>
              <h5 className="card-title">{hotel.title}</h5>
              <p className="card-text">Rating: {hotel.rating}</p>
              <p className="card-text">Provider: {hotel.provider}</p>
              <p className="card-text">Price: {hotel.price}</p>
              <a
                href={hotel.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#132743",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Book Now
              </a>
              <button
                onClick={() => handleAddToFavourites(hotel)}
                className="favourite-btn"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
