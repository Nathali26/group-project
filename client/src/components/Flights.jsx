import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Flights.css";
export default function Flights() {
  //I set the backgrounds here because I was having trouble setting different backgrounds for different components
  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1606768666853-403c90a981ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    // Cleanup function to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);
  const [cityOrigin, setCityOrigin] = useState("");
  const [cityDestination, setCityDestination] = useState("");
  /* const [cityName, setCityName] = useState('');  */ /* I can´t use the same state for both city origin and destination, cause it changes simultaneously both inputs as I write online!!! */
  const [airportCodeOrigin, setAirportCodeOrigin] = useState("");
  const [airportCodeDestination, setAirportCodeDestination] = useState("");
  const [error, setError] =
    useState(""); /* a state to save all of the errors */
  const [isLoading, setIsloading] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    if (event.target.id === "cityOrigin") {
      setCityOrigin(value);
    } else if (event.target.id === "cityDestination") {
      setCityDestination(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsloading(true);
    setAirportCodeOrigin("");
    setAirportCodeDestination("");
    setError("");
    // Fetch for cityOrigin
    const originUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityOrigin}`;
    const originOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6eafd6dacamsh9595106e7e22e75p1d3894jsn14bcd3ec4338",
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
      },
    };
    searchAirport(originUrl, "cityOrigin", originOptions);
    setCityOrigin("");
    // Fetch for cityDestination
    const destinationUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityDestination}`;
    const destinationOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6eafd6dacamsh9595106e7e22e75p1d3894jsn14bcd3ec4338",
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
      },
    };
    /* params: {query: `${cityName}`},  when I had the same URL for both*/
    searchAirport(destinationUrl, "cityDestination", destinationOptions);
    setCityDestination("");
  };
  async function searchAirport(url, cityId, options) {
    /* this cityId, it´s just a variable I can call it anything I want*/
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        //when you throw an error you will go to the catch block
        throw new Error();
      }
      const data = await response.json(); /* !!!!!!!! */
      // Log the cityId and data for debugging
      console.log(`City ID: ${cityId}`, data);
      setIsloading(false);
      // Extract the airportCode from the nested structure
      /* const newAirportCode = data.data[0]?.airportCode || '';  */ /* The optional chaining (?.) is used to handle cases where data or data[0] might be null or undefined.
|| '':  if newAirportCode is undefined (due to optional chaining) or if the extracted airportCode is falsy, it will default to an empty string (''). */
      if (cityId === "cityOrigin") {
        setAirportCodeOrigin([
          data.data[0]?.children[0]?.airportCode ?? data.data[0]?.airportCode,
        ]); /* double data, cause I call the WHOLE THING data  !!!!! */
      } else if (cityId === "cityDestination") {
        setAirportCodeDestination([
          data.data[0]?.children[0]?.airportCode ?? data.data[0]?.airportCode,
        ]);
      }
    } catch (err) {
      setIsloading(false);
      setError(`something went wrong: ${err}`);
      console.error(error);
    }
  }
  return (
    <>
      {" "}
      {/* here I can put just tags, not necessarily a <div> </div> */}
      {/*   here the form is one single parent, it doesn´t always have to be a <div></div>  */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Where from</label>
        <input
          id="cityOrigin" /* each input should have a unique id, cause the id attribute should be unique within the HTML document, even if the values are the same. */
          type="text"
          placeholder="Type city of origin..."
          value={airportCodeOrigin || cityOrigin}
          onChange={handleChange}
        />
        <label htmlFor="city">Where to</label>
        <input
          id="cityDestination"
          type="text"
          placeholder="Type city of destination..."
          value={airportCodeDestination || cityDestination}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
