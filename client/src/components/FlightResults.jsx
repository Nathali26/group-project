import React from "react";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Import the heart icon for favourites

export default function FlightResults({ results }) {
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

  const [flightSegments, setFlightSegments] = useState(
    results.data.flights.segments
  );
  console.log("this is flightSegments", flightSegments);

  const deleteCard = (segmentToDelete) => {
    // flightSegments.filter((segment) => segment.id !== segmentToDelete.id);
    console.log(deleteCard);
  };
  // id of the current segment is equal to the id of the segmentToDelete, the expression evaluates to false. In this case, the current segment is filtered out from the array

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
                          <button onClick={() => deleteCard(segment)}>
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
