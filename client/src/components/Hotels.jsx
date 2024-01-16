import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Hotel() {
  const [hoteles, setHoteles] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/search-location", {
          params: {
            query: consulta,
            checkIn: checkIn,
            checkOut: checkOut,
          },
        });

        setHoteles(response.data.data || []);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [consulta, checkIn, checkOut]);

  return (
    <div>
      <h1>Listado de Hoteles</h1>
      <ul>
        {hoteles.map((hotel, index) => (
          <li key={index}>
            <strong>{hotel.hotelName}</strong> - {hotel.address}, Rating:{" "}
            {hotel.rating}
          </li>
        ))}
      </ul>

      {/* Formulario en tu componente para enviar la consulta */}
      <form action="/search-location" method="get">
        <label htmlFor="query">Consulta:</label>
        <input
          type="text"
          id="query"
          name="query"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />

        <label htmlFor="checkIn">Check-in:</label>
        <input
          type="date"
          id="checkIn"
          name="checkIn"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label htmlFor="checkOut">Check-out:</label>
        <input
          type="date"
          id="checkOut"
          name="checkOut"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <button type="submit">Buscar Hoteles</button>
      </form>
    </div>
  );
}
