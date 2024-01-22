import React from 'react';
import { useState } from 'react';

export default function Flights({onSearch}) {
  const [airportCode, setairportCode] = useState('');
  const [results, setResults]= useState([])

  const handleChange = (event)=>{
    const value = event.target.value;
    setairportCode(value)

  };
const handleSubmit = (event)=>{
  event.preventDefault();
  searchFlights();
  onSearch(airportCode);
  setairportCode('');
}

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '693a320c7amshf8a3f0479327cbap12dca4jsn254f4f98016a',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	},
  params: {query: 'Athens'},
};
async function searchFlights() {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    setResults(result);
  } catch (error) {
    console.error(error);
  } }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="airport">City</label>
      <input id="airport"
              type='text'
              placeholder='city'
              value = {city}
              onChange = {handleChange} />
      <button type='submit'>Search</button>
    </form>
  )
}


