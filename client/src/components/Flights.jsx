import React from 'react';
import { useState } from 'react';

export default function Flights() {
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
  searchAirport(cityName); /* this refers to the name parameter of the searchAirport function */
  setCityName('');
}

const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${cityName}`;    /* Probably I can put directly here the param with {} , but with BACKTICKS*/
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '693a320c7amshf8a3f0479327cbap12dca4jsn254f4f98016a',
		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
	},
  /* params: {query: `${cityName}`},  */  
};
async function searchAirport(name) { /* this is called name, cause it´s just a variable */
  setIsloading(true)
    setAirportCode(null)
    setError('');
  try {
    const response = await fetch(url, options);   
    
    if(!response.ok){
      //when you throw an error you will go to the catch block
      throw new Error()
    }
    
    const data = await response.json();  /* !!!!!!!! */
    setIsloading(false) 
    setAirportCode(data.data[0].airportCode); /* double data, cause I call the WHOLE THING data  !!!!! */
    console.log(data);
  } catch (err) {
    setIsloading(false) 
    setError(`something went wrong: ${err}`)
    console.error(error);
  } }

  return (
    <>  {/* here I can put just tags, not necessarily a <div> </div> */}
    /* here the form is one single parent, it doesn´t always have to be a <div></div> */
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">Where from</label>
      <input id="city"
              type='text'
              placeholder='Type city name...'
              value = {cityName}
              onChange = {handleChange} />
      <button type='submit'>Search</button>
    </form>
    </>
  )
}


