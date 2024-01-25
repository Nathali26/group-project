import React, { useState, useEffect } from "react";
import "./Favourites.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trashcan icon

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
     // Set the background image when the component mounts
     document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
     document.body.style.backgroundSize = 'cover';
     document.body.style.backgroundAttachment = 'fixed';
 
     // Cleanup function to reset the background when the component unmounts
     return () => {
       document.body.style.backgroundImage = '';
       document.body.style.backgroundSize = '';
       document.body.style.backgroundAttachment = '';
     };

    fetchFavourites();
  }, []); // Fetch favourites on component mount

  const fetchFavourites = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/favourites");
      setFavourites(response.data);
    } catch (err) {
      console.error("Error fetching favourites:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/favourites/${id}`);
      fetchFavourites(); // Fetch the updated favourites list
    } catch (err) {
      console.error("Error deleting favourite:", err.response.data);
    }
  };

  // const handleBackToResults = () => {
  //   navigate("/results");
  // };

  return (
    <div className="my-favs-container">
      <h1 className="my-favs-title">My Favourites</h1>
      <div className="my-favs-list">
        {favourites.map((fav) => (
          <div key={fav.id} className="fav-item">
            {fav.name}
            <button className="delete-button" onClick={() => handleDelete(fav.id)}>
            <FontAwesomeIcon icon={faTrash} /> {/* Display trashcan icon */}
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={handleBackToResults} className="back-to-results-button">
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
      </button> */}
    </div>
  );
}