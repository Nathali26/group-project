import React from 'react';
import { useState } from 'react';

export default function Flights({onSearch}) {
  const [cityName, setCityName] = useState('');
  const [airportCode, setAirportCode]= useState([])
  const [error, setError] = useState('');   /* a state to save all of the errors */
  const [isLoading , setIsloading] = useState(false)

  const handleChange = (event)=>{
    const value = event.target.value;
    setCityName(value)

  };
const handleSubmit = (event)=>{
  event.preventDefault();
  searchAirport();
  onSearch(cityName);
  setCityName('');
}

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights';    /* ??????? */
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '693a320c7amshf8a3f0479327cbap12dca4jsn254f4f98016a',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	},
  params: {query: 'Athens'},   /* ???????? */
};
async function searchAirport(name) {
  setIsloading(true)
    setAirportCode(null)
    setError('');
  try {
    const response = await fetch(url, options);    /* ?????? */
    const result = await response.text();
    console.log(airportCode);
    setAirportCode(airportCode);
  } catch (error) {
    console.error(error);
  } }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="airport">Where from</label>
      <input id="airport"
              type='text'
              placeholder='Type city name...'
              value = {airportCode}
              onChange = {handleChange} />
      <button type='submit'>Search</button>
    </form>
  )
}


