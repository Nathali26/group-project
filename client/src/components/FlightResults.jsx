import React from "react";

export default function FlightResults({ results }) {
  return (
    <div>
      {results && (
        <div>
          <h2>Flight Search Results</h2>
          {/* Render the flight search results here */}
          {results.data.flights.map((flight, index) => (
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
                    flight.segments[segmentIndex - 1].legs[0].arrivalDateTime ||
                  segment.legs[0].marketingCarrier.displayName !==
                    flight.segments[segmentIndex - 1].legs[0].marketingCarrier
                      .displayName ? (
                    <div className="card mb-3" key={segmentIndex}>
                      <div className="card-body">
                        <p className="card-text">
                          Departure airport: {segment.legs[0].originStationCode}
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
                        <button onClick={() => deleteCb(segment.legs[0].id)}>
                          delete
                        </button>
                        <button onClick={() => addCb(segment.legs[0].id)}>
                          add
                        </button>
                        {/* Add more details as needed */}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
