import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Flights.css";

import FlightResults from "./FlightResults";

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
  const EMPTY_FORM = {
    outboundDate: "",
    itineraryType: "",
    numAdults: "",
    returnDate: "",
  };
  const [flightParameters, setFlightParameters] = useState(EMPTY_FORM);
  const [cityOrigin, setCityOrigin] = useState("");
  const [cityDestination, setCityDestination] = useState("");
  /* const [cityName, setCityName] = useState('');  */ /* I can´t use the same state for both city origin and destination, cause it changes simultaneously both inputs as I write!!! */
  /* const [airportCodeOrigin, setAirportCodeOrigin] = useState("");
  const [airportCodeDestination, setAirportCodeDestination] = useState(""); I dont need these cause it´s not info that the user provides , it´s just the result of the fetching*/
  const [results, setResults] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFlightParameters({ ...flightParameters, [id]: value });
    if (id === "cityOrigin") {
      setCityOrigin(value);
    } else if (id === "cityDestination") {
      setCityDestination(value);
    }
  };
  const handleRadioChange = (e) => {
    setFlightParameters({
      ...flightParameters,
      itineraryType: e.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFlightParameters(EMPTY_FORM);
    setCityOrigin("");
    setCityDestination("");
    /* setAirportCodeOrigin("");
    setAirportCodeDestination(""); so I dont need them */
    setResults("");
    setError("");
    const originUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityOrigin}`;
    const destinationUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityDestination}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `52f456776emsh373fb71559d80c8p193cc0jsnb861ec37df67`,
        "X-RapidAPI-Host": `tripadvisor16.p.rapidapi.com`,
      },
    };
    try {
      // Wait for both fetch operations to complete
      const [searchedAirportCodeOrigin, searchedAirportCodeDestination] =
        await Promise.all([
          searchAirport(originUrl, "cityOrigin", options),
          searchAirport(destinationUrl, "cityDestination", options),
        ]);
      console.log(options);
      console.log("Origin Airport Code:", searchedAirportCodeOrigin);
      console.log("Destination Airport Code:", searchedAirportCodeDestination);
      /// !!!!!!!!!!!!!!!!!!!!!!
      const ticketUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${searchedAirportCodeOrigin}&destinationAirportCode=${searchedAirportCodeDestination}&date=${
        flightParameters.outboundDate
      }&itineraryType=${
        flightParameters.itineraryType
      }&sortOrder=DURATION&numAdults=${
        flightParameters.numAdults
      }&numSeniors=0&classOfService=ECONOMY${
        flightParameters.itineraryType === "ROUND_TRIP"
          ? `&returnDate=${flightParameters.returnDate}`
          : ""
      }&pageNumber=1&currencyCode=USD`; ///   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // Perform the new fetch using the obtained airport codes
      console.log(ticketUrl);
      const ticketResponse = await fetch(ticketUrl, options);
      if (!ticketResponse.ok) {
        throw new Error("Failed to fetch flight search data");
      }
      const result = await ticketResponse.json();
      setResults(result);
      setIsLoading(true);
      console.log(result);
    } catch (error) {
      setIsLoading(false);
      setError(`Something went wrong: ${error.message}`);
      console.error(error);
    }
  };
  async function searchAirport(url, cityId, options) {
    /* this cityId, it´s just a variable I can call it anything I want*/
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        //when you throw an error you will go to the catch block
        throw new Error("failed to fetch airport data");
      }
      const responseData = await response.json(); /* !!!!!!!! */
      // Log the cityId and data for debugging
      console.log(`City ID: ${cityId}`, responseData);
      if (!responseData.data || responseData.data.length === 0) {
        throw new Error("No airport data found");
      }
      // Extract the airportCode from the nested structure
      /* const newAirportCode = data.data[0]?.airportCode || '';  */ /* The optional chaining (?.) is used to handle cases where data or data[0] might be null or undefined.
|| '':  if newAirportCode is undefined (due to optional chaining) or if the extracted airportCode is falsy, it will default to an empty string (''). */
      let extractedAirportCode;
      if (
        responseData.data[0]?.children &&
        responseData.data[0]?.children[0]?.airportCode
      ) {
        extractedAirportCode = responseData.data[0].children[0].airportCode;
      } else {
        extractedAirportCode = responseData.data[0]?.airportCode;
      }
      if (!extractedAirportCode) {
        throw new Error("Airport code not found in response");
      }
      setIsLoading(true);
      console.log(extractedAirportCode);
      return extractedAirportCode;
    } catch (err) {
      setIsLoading(false);
      setError(`Failed to fetch airport data for ${cityId}: ${err.message}`); // superimportante to see the error for debugging !!!
      console.error(err); // superimportante
      throw err; // superimportante !!
    }
  }

  return (
    <>
      {" "}
      {/* here I can put just tags, not necessarily a <div> </div> */}
      {/*   here the form is one single parent, it doesn´t always have to be a <div></div>  */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itineraryTypeOneWay">One Way</label>
          <input
            id="itineraryTypeOneWay"
            type="radio"
            name="itineraryType"
            value="ONE_WAY"
            checked={flightParameters.itineraryType === "ONE_WAY"}
            onChange={handleRadioChange}
          />
          <label htmlFor="itineraryTypeRoundTrip">Round Trip</label>
          <input
            id="itineraryTypeRoundTrip"
            type="radio"
            name="itineraryType"
            value="ROUND_TRIP"
            checked={flightParameters.itineraryType === "ROUND_TRIP"}
            onChange={handleRadioChange}
          />
        </div>
        <label htmlFor="numAdults">Passengers</label>
        <input
          id="numAdults"
          type="number"
          placeholder="number of passengers"
          value={flightParameters.numAdults}
          onChange={handleChange}
        />
        <label htmlFor="cityOrigin">Where from</label>
        <input
          id="cityOrigin" /* each input should have a unique id, cause the id attribute should be unique within the HTML document, even if the values are the same. */
          name="cityOrigin"
          type="text"
          placeholder="Type city of origin..."
          value={cityOrigin}
          onChange={handleChange}
        />
        <label htmlFor="cityDestination">Where to</label>
        <input
          id="cityDestination"
          name="cityDestination"
          type="text"
          placeholder="Type city of destination..."
          value={cityDestination}
          onChange={handleChange}
        />
        <label htmlFor="outboundDate">Outbound</label>
        <input
          id="outboundDate"
          type="date"
          placeholder="YYYY-MM-DD"
          value={flightParameters.outboundDate}
          onChange={handleChange}
        />
        {flightParameters.itineraryType === "ROUND_TRIP" && (
          <div>
            <label htmlFor="returnDate">Return</label>
            <input
              id="returnDate"
              type="date"
              placeholder="YYYY-MM-DD"
              value={flightParameters.returnDate}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">Search</button>
      </form>
      {results && <FlightResults results={results} />}
      {/* Error message if there's an error */}
      {error && <p>{error}</p>}
      {/* Loading indicator */}
      {isLoading && <p>Loading...</p>}
    </>
  );
}

// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import "./Flights.css";
// /* import FlightResults from "./Results"; */

// export default function Flights() {
//   //I set the backgrounds here because I was having trouble setting different backgrounds for different components
//   useEffect(() => {
//     // Set the background image when the component mounts
//     document.body.style.backgroundImage =
//       'url("https://images.unsplash.com/photo-1606768666853-403c90a981ad?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
//     document.body.style.backgroundSize = "cover";
//     document.body.style.backgroundAttachment = "fixed";

//     // Cleanup function to reset the background when the component unmounts
//     return () => {
//       document.body.style.backgroundImage = "";
//       document.body.style.backgroundSize = "";
//       document.body.style.backgroundAttachment = "";
//     };
//   }, []);

//   const EMPTY_FORM = {
//     outboundDate: "",
//     itineraryType: "",
//     numAdults: "",
//     returnDate: "",
//   };

//   const [flightParameters, setFlightParameters] = useState(EMPTY_FORM);
//   const [cityOrigin, setCityOrigin] = useState("");
//   const [cityDestination, setCityDestination] = useState("");
//   /* const [cityName, setCityName] = useState('');  */ /* I can´t use the same state for both city origin and destination, cause it changes simultaneously both inputs as I write!!! */
//   /* const [airportCodeOrigin, setAirportCodeOrigin] = useState("");
//   const [airportCodeDestination, setAirportCodeDestination] = useState(""); I dont need these cause it´s not info that the user provides , it´s just the result of the fetching*/
//   const [results, setResults] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     setFlightParameters({ ...flightParameters, [id]: value });

//     if (id === "cityOrigin") {
//       setCityOrigin(value);
//     } else if (id === "cityDestination") {
//       setCityDestination(value);
//     }
//   };

//   const handleRadioChange = (e) => {
//     setFlightParameters({
//       ...flightParameters,
//       itineraryType: e.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setFlightParameters(EMPTY_FORM);
//     setCityOrigin("");
//     setCityDestination("");
//     /* setAirportCodeOrigin("");
//     setAirportCodeDestination(""); so I dont need them */
//     setResults("");
//     setError("");

//     const originUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityOrigin}`;
//     const destinationUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityDestination}`;

//     const options = {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": `52f456776emsh373fb71559d80c8p193cc0jsnb861ec37df67`,
//         "X-RapidAPI-Host": `tripadvisor16.p.rapidapi.com`,
//       },
//     };

//     try {
//       // Wait for both fetch operations to complete
//       const [searchedAirportCodeOrigin, searchedAirportCodeDestination] =
//         await Promise.all([
//           searchAirport(originUrl, "cityOrigin", options),
//           searchAirport(destinationUrl, "cityDestination", options),
//         ]);

//       console.log(options);
//       console.log("Origin Airport Code:", searchedAirportCodeOrigin);
//       console.log("Destination Airport Code:", searchedAirportCodeDestination);

//       /// !!!!!!!!!!!!!!!!!!!!!!
//       const ticketUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=${searchedAirportCodeOrigin}&destinationAirportCode=${searchedAirportCodeDestination}&date=${
//         flightParameters.outboundDate
//       }&itineraryType=${
//         flightParameters.itineraryType
//       }&sortOrder=DURATION&numAdults=${
//         flightParameters.numAdults
//       }&numSeniors=0&classOfService=ECONOMY${
//         flightParameters.itineraryType === "ROUND_TRIP"
//           ? `&returnDate=${flightParameters.returnDate}`
//           : ""
//       }&pageNumber=1&currencyCode=USD`; ///   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//       // Perform the new fetch using the obtained airport codes

//       console.log(ticketUrl);

//       const ticketResponse = await fetch(ticketUrl, options);

//       if (!ticketResponse.ok) {
//         throw new Error("Failed to fetch flight search data");
//       }

//       const result = await ticketResponse.json();
//       setResults(result);
//       setIsLoading(false);
//       console.log(result);
//     } catch (error) {
//       setIsLoading(false);
//       setError(`Something went wrong: ${error.message}`);
//       console.error(error);
//     }
//   };

//   async function searchAirport(url, cityId, options) {
//     /* this cityId, it´s just a variable I can call it anything I want*/

//     try {
//       setIsLoading(true);

//       const response = await fetch(url, options);
//       if (!response.ok) {
//         //when you throw an error you will go to the catch block
//         throw new Error("failed to fetch airport data");
//       }
//       const responseData = await response.json(); /* !!!!!!!! */
//       // Log the cityId and data for debugging
//       console.log(`City ID: ${cityId}`, responseData);

//       if (!responseData.data || responseData.data.length === 0) {
//         throw new Error("No airport data found");
//       }
//       // Extract the airportCode from the nested structure
//       /* const newAirportCode = data.data[0]?.airportCode || '';  */ /* The optional chaining (?.) is used to handle cases where data or data[0] might be null or undefined.
// || '':  if newAirportCode is undefined (due to optional chaining) or if the extracted airportCode is falsy, it will default to an empty string (''). */

//       let extractedAirportCode;
//       if (
//         responseData.data[0]?.children &&
//         responseData.data[0]?.children[0]?.airportCode
//       ) {
//         extractedAirportCode = responseData.data[0].children[0].airportCode;
//       } else {
//         extractedAirportCode = responseData.data[0]?.airportCode;
//       }
//       if (!extractedAirportCode) {
//         throw new Error("Airport code not found in response");
//       }
//       setIsLoading(false);
//       console.log(extractedAirportCode);
//       return extractedAirportCode;
//     } catch (err) {
//       setIsLoading(false);
//       setError(`Failed to fetch airport data for ${cityId}: ${err.message}`); // superimportante to see the error for debugging !!!
//       console.error(err); // superimportante
//       throw err; // superimportante !!
//     }
//   }

//   return (
//     <>
//       {" "}
//       {/* here I can put just tags, not necessarily a <div> </div> */}
//       {/*   here the form is one single parent, it doesn´t always have to be a <div></div>  */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="itineraryTypeOneWay">One Way</label>
//           <input
//             id="itineraryTypeOneWay"
//             type="radio"
//             name="itineraryType"
//             value="ONE_WAY"
//             checked={flightParameters.itineraryType === "ONE_WAY"}
//             onChange={handleRadioChange}
//           />
//           <label htmlFor="itineraryTypeRoundTrip">Round Trip</label>
//           <input
//             id="itineraryTypeRoundTrip"
//             type="radio"
//             name="itineraryType"
//             value="ROUND_TRIP"
//             checked={flightParameters.itineraryType === "ROUND_TRIP"}
//             onChange={handleRadioChange}
//           />
//         </div>

//         <label htmlFor="numAdults">Passengers</label>
//         <input
//           id="numAdults"
//           type="number"
//           placeholder="number of passengers"
//           value={flightParameters.numAdults}
//           onChange={handleChange}
//         />

//         <label htmlFor="cityOrigin">Where from</label>
//         <input
//           id="cityOrigin" /* each input should have a unique id, cause the id attribute should be unique within the HTML document, even if the values are the same. */
//           name="cityOrigin"
//           type="text"
//           placeholder="Type city of origin..."
//           value={cityOrigin}
//           onChange={handleChange}
//         />

//         <label htmlFor="cityDestination">Where to</label>
//         <input
//           id="cityDestination"
//           name="cityDestination"
//           type="text"
//           placeholder="Type city of destination..."
//           value={cityDestination}
//           onChange={handleChange}
//         />

//         <label htmlFor="outboundDate">Outbound</label>
//         <input
//           id="outboundDate"
//           type="date"
//           placeholder="YYYY-MM-DD"
//           value={flightParameters.outboundDate}
//           onChange={handleChange}
//         />

//         {flightParameters.itineraryType === "ROUND_TRIP" && (
//           <div>
//             <label htmlFor="returnDate">Return</label>
//             <input
//               id="returnDate"
//               type="date"
//               placeholder="YYYY-MM-DD"
//               value={flightParameters.returnDate}
//               onChange={handleChange}
//             />
//           </div>
//         )}

//         <button type="submit">Search</button>
//       </form>
//       {results && (
//         <div>
//           <h2>Flight Search Results</h2>
//           {/* Render the flight search results here */}
//           {results.data.flights.map((flight, index) => (
//             <div key={index}>
//               <p>Flight {index + 1}</p>
//               {/* Map over each segment within the flight */}
//               {flight.segments.map((segment, segmentIndex) => (
//                 <div key={segmentIndex}>
//                   {/* Display details for each segment */}
//                   <p>Departure: {segment.legs[0].departureDateTime}</p>
//                   <p>Arrival: {segment.legs[0].arrivalDateTime}</p>
//                   <p>Airline: {segment.legs[0].marketingCarrier.displayName}</p>
//                   {/* Add more details as needed */}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//       {/* Error message if there's an error */}
//       {error && <p>{error}</p>}
//       {/* Loading indicator */}
//       {isLoading && <p>Loading...</p>}
//     </>
//   );
// }
