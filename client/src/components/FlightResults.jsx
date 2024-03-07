import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the heart icon for favourites

export default function FlightResults({ results /* deleteCard */ }) {
  const [segmentsState, setSegmentsState] = useState([]); //  I ABSOLUTELY need to update the state or re-render the component to reflect the changes!!!!!!
  console.log(results.data.flights[0].segments);
  console.log(results);

  // Function to fetch data and update segmentsState
  const fetchData = () => {
    // Make API call or perform data fetching logic
    // Once you have the data, update segmentsState
    setSegmentsState(results.data.flights[0].segments);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleAddToFavourites = async (segment) => {
    const flightDetails = {
      title: `Flight: ${segment.legs[0].originStationCode} to ${segment.legs[0].destinationStationCode}`,
      departure: segment.legs[0].departureDateTime,
      arrival: segment.legs[0].arrivalDateTime,
      airline: segment.legs[0].marketingCarrier.displayName,
      // Add other details as needed
    };

    try {
      await axios.post(
        "http://localhost:4000/api/favourites_list",
        flightDetails
      );
      console.log("Flight added to favourites successfully");
    } catch (err) {
      console.error("Error adding to favourites:", err);
    }
  };
  // console.log(results.data.flights[0].segments);
  const deleteCard = (segmentIndex) => {
    const updatedSegments = segmentsState.filter(
      (_, index) => index !== segmentIndex
    );
    setSegmentsState(updatedSegments);
  }; // _ indicates that a parameter is intentionally ignored or not used within a function. To filter by index, you would typically use the second argument

  // if you are at the index x, delete the segment y of the index x

  /*  const deleteCard = (segmentIndex) => {
    const updatedSegments = [...segmentsState];
    updatedSegments.splice(segmentIndex, 1);
    setSegmentsState(updatedSegments);
  }; */

  return (
    <div>
      {results && (
        <div>
          <h2>Flight Search Results</h2>
          {/* Render the flight search results here */}
          {results.data.flights.map((flight, index) => {
            // find the lowest price for each flight option
            const lowestPrice = Math.min.apply(
              null,
              flight.purchaseLinks.map((link) => link.totalPricePerPassenger)
            );
            const lowestTotalPrice = Math.min.apply(
              null,
              flight.purchaseLinks.map((link) => link.totalPrice)
            );
            const lowestPriceUrl = flight.purchaseLinks.map((link) => link.url);

            return (
              // the index of each flight within the results.data.flights array.
              <div className="card mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">Option {index + 1}</h5>
                  {/* Map over each segment within the flight */}
                  {flight.segments.map((segment, segmentIndex) =>
                    segmentIndex === 0 ||
                    segment.legs[0].departureDateTime !==
                      flight.segments[segmentIndex - 1].legs[0]
                        .departureDateTime ||
                    segment.legs[0].arrivalDateTime !==
                      flight.segments[segmentIndex - 1].legs[0]
                        .arrivalDateTime ||
                    segment.legs[0].marketingCarrier.displayName !==
                      flight.segments[segmentIndex - 1].legs[0].marketingCarrier
                        .displayName ? (
                      <div className="card mb-3" key={segmentIndex}>
                        <div className="card-body">
                          <p className="card-text">
                            Departure airport:{" "}
                            {segment.legs[0].originStationCode}
                          </p>
                          <p className="card-text">
                            Landing Airport:{" "}
                            {segment.legs[0].destinationStationCode}
                          </p>
                          <p className="card-text">
                            Arrival: {segment.legs[0].arrivalDateTime}
                          </p>
                          <p className="card-text">
                            Airline:{" "}
                            {segment.legs[0].marketingCarrier.displayName}
                          </p>
                          <p className="card-text">
                            Per passenger: {lowestPrice}
                          </p>
                          <p className="card-text">
                            Lowest total price: {lowestTotalPrice}
                          </p>
                          <button onClick={() => deleteCard(segmentIndex)}>
                            delete
                          </button>
                          <button
                            onClick={() => handleAddToFavourites(segment)}
                            className="favourite-btn"
                          >
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        </div>
                      </div>
                    ) : null
                  )}
                  {/* Add the Book buttons for each purchase link */}
                  {/* {flight.purchaseLinks.map((purchaseLink, purchaseIndex) => (
                    <div key={`purchase_${purchaseIndex}`}>
                      <a
                        href={purchaseLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Book
                      </a>
                    </div>
                  ))} */}
                  <div>
                    <a
                      href={lowestPriceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Book
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Sure, let's break down this code:

<div className="card mb-3" key={index}>: This line creates a Bootstrap card element with some margin (mb-3 class) and assigns a unique key index to it. The index variable is likely coming from the map function's index parameter.
<div className="card-body">: This line creates the body of the Bootstrap card.
<h5 className="card-title">Option {index + 1}</h5>: This line creates a card title with the text "Option" followed by the index incremented by 1 (index + 1). This is inside a level 5 heading (<h5>).
{flight.segments.map((segment, segmentIndex) => ...)}: This line iterates over each segment in the flight.segments array using the map function. For each segment, it executes the provided function, which returns JSX (HTML-like syntax).
Inside the map function:

segmentIndex === 0: This condition checks if the current segment is the first one in the array.
segment.legs[0].departureDateTime !== flight.segments[segmentIndex - 1].legs[0].departureDateTime: This condition checks if the departure date and time of the current segment are different from the previous segment's departure date and time.
segment.legs[0].arrivalDateTime !== flight.segments[segmentIndex - 1].legs[0].arrivalDateTime: This condition checks if the arrival date and time of the current segment are different from the previous segment's arrival date and time.
segment.legs[0].marketingCarrier.displayName !== flight.segments[segmentIndex - 1].legs[0].marketingCarrier.displayName: This condition checks if the marketing carrier's display name of the current segment is different from the previous segment's marketing carrier's display name.
If any of these conditions are true, it renders a new card with the details of the current segment inside it. */
