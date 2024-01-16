var express = require("express");
var router = express.Router();
var axios = require("axios");

// Ruta para realizar la búsqueda de ubicación en la API de TripAdvisor
router.get("/search-location", async function (req, res, next) {
  try {
    const query = req.query.query || "search location";
    const locationApiUrl =
      "https://tripadvisor1.p.rapidapi.com/locations/search";

    const locationParams = {
      query: query,
      limit: 1,
    };

    // Realiza la solicitud a la API de TripAdvisor para la búsqueda de ubicación
    const locationResponse = await axios.get(locationApiUrl, {
      params: locationParams,
      headers: {
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        "X-RapidAPI-Key": "14ee05df50msh14080db5aab6f76p1a85b5jsndeccc1a2d9df",
        "Content-Type": "application/json",
      },
    });

    // Extrae el geoId de la respuesta de la búsqueda de ubicación
    const geoId = locationResponse.data.data[0].result_object.location_id;

    // Luego, utiliza el geoId para realizar la búsqueda de hoteles
    const hotelApiUrl = "https://tripadvisor1.p.rapidapi.com/hotels/list";

    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;

    // Parámetros de la búsqueda de hoteles
    const hotelParams = {
      geoId: geoId,
      checkIn: checkIn,
      checkOut: checkOut,
    };

    // Realiza la solicitud a la API de TripAdvisor para la búsqueda de hoteles
    const hotelResponse = await axios.get(hotelApiUrl, {
      params: hotelParams,
      headers: {
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        "X-RapidAPI-Key": "14ee05df50msh14080db5aab6f76p1a85b5jsndeccc1a2d9df",
        "Content-Type": "application/json",
      },
    });

    // Envía la respuesta de la búsqueda de hoteles como respuesta a la solicitud HTTP
    res.send(hotelResponse.data);
  } catch (error) {
    // Manejo de errores si la solicitud a la API falla
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
