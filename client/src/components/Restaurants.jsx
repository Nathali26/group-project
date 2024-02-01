import React, { useState, useEffect } from "react";
import axios from "axios";
import './Restaurants.css';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [consult, setConsult] = useState('');
  const [book, setBook] = useState("");

  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&f[…]3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed'
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  const handleChange = (e) => {
    setConsult(e.target.value)
    console.log(consult)
  }

  const handleSearchRestaurants = async () => {
    // try {
      const options = {
        method: 'GET',
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation",
        params: {
          query: consult
        },
        headers: {
          'X-RapidAPI-Key': 'cdcabfdec4msh89bf2d949a25620p174ac3jsn573ad325aef4',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      }
    // }
  // } else {
  //   console.error("Invalid response structure:", response.data);
  // }
  


      const response = await axios.request(options);
      console.log("i got here");
      console.log(response);
    
      // if (response.data && response.data.data && Array.isArray(response.data.data)) {
       const restaurantData = response.data.data[0];
       console.log(restaurantData.locationId);

       let locationId = restaurantData.locationId
         

      //  try {
        const restaurantResponse = {
          method: 'GET',
          url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
          params: {
            locationId: locationId
          },
          headers: {
            'X-RapidAPI-Key': 'cdcabfdec4msh89bf2d949a25620p174ac3jsn573ad325aef4',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        };
      // }catch (error) {
      //   console.error("Error", error);
      // }
      const second = await axios.request(restaurantResponse);
      console.log("the second api request worked");
      console.log(second);
      console.log(second.data.data.data[0])
    
      //  if (second.data && second.data.data && Array.isArray(second.data.data)) {
        const restaurant = second.data.data.data[0];
       console.log(restaurant);

        const formattedRestaurants = [{
           id: restaurant.locationId,
           title: restaurant.name,
          rating: restaurant.averageRating|| null,
          price: restaurant.priceTag|| null,
        }];
        console.log("i got here");
        setRestaurants(formattedRestaurants);
    //  }
    } 
  
  
  
  
  return (
    <div>
    <div className="restaurants-bg">
      <h1 className="restaurants">Where would you like to eat?</h1>
      <div>
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <h3>{restaurant.title}</h3>
            <p>Rating: {restaurant.rating}</p>

            <p>Price: {restaurant.price}</p>

              Reserve Now, Pay Later
      
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
        
          onChange={handleChange}

          // onChange={(e) =>{ 
          //   console.log(e.target.value)
          //   // setConsult(`${e.target.value}`)
          //   setConsult(e.target.value)
          //   console.log(consult)
          // } 
        // }
        />

        <label className="label" htmlFor="book">Book:</label>
        <input
          type="date"
          id="book"
          name="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        />
        <button className="search-btn" type="button" onClick={handleSearchRestaurants}>
          Reserve Now
        </button>
      </form>
    </div>
    </div>
  );
        }
