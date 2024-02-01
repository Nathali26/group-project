import React, { useState, useEffect } from "react";
import "./Favourites.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trashcan icon

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    console.log('Component mounted, fetching favourites...'); // This logs when the component mounts
    // Set the background image when the component mounts
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";

    fetchFavourites();

    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };

  }, []); // Fetch favourites on component mount

  const fetchFavourites = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/favourites_list");
      console.log("Fetched Favourites:", response.data);
      setFavourites(response.data);
    } catch (err) {
      console.error("Error fetching favourites:", err);
    }
  };  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/favourites_list/${id}`);
      fetchFavourites(); // Fetch the updated favourites list
    } catch (err) {
      console.error("Error deleting favourite:", err.response.data);
    }
  };

  // Function to determine if a favourite item is a flight, determines how to display it
  const isFlight = (fav) => {
    return fav.departure && fav.arrival && fav.airline;
  };

  return (
    <div className="my-favs-container mt-5">
      <h1 className="my-favs-title">My Favourites</h1>
      <div className="my-favs-list">
        {favourites.map((fav) => (
          <div key={fav.id} className="card mb-3" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{fav.title}</h5>
              {isFlight(fav) ? (
                // Render flight information
                <>
                  <p className="card-text">Departure: {fav.departure}</p>
                  <p className="card-text">Arrival: {fav.arrival}</p>
                  <p className="card-text">Airline: {fav.airline}</p>
                </>
              ) : (
                // Render hotel information
                <>
                  <p className="card-text">Rating: {fav.rating}</p>
                  <p className="card-text">Provider: {fav.provider}</p>
                </>
              )}
              <p className="card-text">Price: {fav.price}</p>
              {fav.originalPrice && <p className="card-text">Original Price: {fav.originalPrice}</p>}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(fav.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

