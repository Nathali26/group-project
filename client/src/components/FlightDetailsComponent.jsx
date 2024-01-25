import React from 'react';
import { useState } from 'react';
import  Dropdown  from 'react-bootstrap/Dropdown';


/* const EMPTY_FORM = {
    date: '',
    itineraryType: '',
    numAdults: "",
    numSeniors: "",
    returnDate:""
  } */

export default function FlightDetailsComponent() {

   /*  const [flightParameters, setFlightParameters] = useState(EMPTY_FORM);

    function handleSubmit(event) {
        event.preventDefault();
        props.getFlightDetailsCb(flightParameters);
        setFlightParameters(EMPTY_FORM)
      }

      function handleChange(event) {
        let {date,itineraryType,numAdults,numAdultsValue,numSeniors,numSeniorsValue,returnDate} = event.target;
        setFlightParameters();
      } */


  return (
    <div>
        <label htmlFor='numAdults'>number of adults</label>
        {/* <input
          id='numAdults'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          /> */}
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="itineraryType">itineraryType</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}
