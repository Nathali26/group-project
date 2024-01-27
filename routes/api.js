
// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// // Ruta para realizar la búsqueda de ubicación y hoteles en la API de TripAdvisor
// router.get("/searchLocation", async function (req, res, next) {
//   try {
//     const query = req.query.query || "search location";
//     // console.log("esto es", query);
//     const locationApiUrl =
//       "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation";

//     const locationParams = {
//       query: query,
//       limit: 1,
//     };

//     // Realiza la solicitud a la API de TripAdvisor para la búsqueda de ubicación
//     const locationResponse = await axios.get(locationApiUrl, {
//       params: locationParams,
//       headers: {
//         "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
//         "X-RapidAPI-Key": "0c1ec7c873msh14f30084fdd46dcp1a4aaejsnaf3c1fa88581",
//         "Content-Type": "application/json",
//       },
//     });

//     // console.log("esto es locationResponse", locationResponse);

//     // Verifica si hay datos en la respuesta de la búsqueda de ubicación
//     if (
//       locationResponse.data &&
//       locationResponse.data.data &&
//       locationResponse.data.data.length > 0
//     ) {
//       // Extrae el geoId de la respuesta de la búsqueda de ubicación
//       const resultObject = locationResponse.data.data[0].result_object;
//       console.log("esto es resul object" ,resultObject)
//       if (resultObject && resultObject.location_id) {
//         const geoId = resultObject.location_id;

//         // Luego, utiliza el geoId para realizar la búsqueda de hoteles
//         const hotelApiUrl =
//           "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels";

//         const checkIn = req.query.checkIn;
//         const checkOut = req.query.checkOut;

//         // Parámetros de la búsqueda de hoteles
//         const hotelParams = {
//           geoId: geoId,
//           checkIn: checkIn,
//           checkOut: checkOut,
//         };

//         // Realiza la solicitud a la API de TripAdvisor para la búsqueda de hoteles
//         const hotelResponse = await axios.get(hotelApiUrl, {
//           params: hotelParams,
//           headers: {
//             "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
//             "X-RapidAPI-Key":
//               "0c1ec7c873msh14f30084fdd46dcp1a4aaejsnaf3c1fa88581",
//             "Content-Type": "application/json",
//           },
//         });

//         // Envía la respuesta de la búsqueda de hoteles como respuesta a la solicitud HTTP
//         res.json(hotelResponse.data);
//         // console.log("API Response from TripAdvisor:", hotelResponse.data);
//       } else {
//         res
//           .status(404)
//           .send({ error: "Did not find result in that location." });
//       }
//     } else {
//       res.status(404).send({ error: "Did not find result in that location." });
//     }
//   } catch (error) {
//     // console.error("Error en la solicitud a la API de TripAdvisor:", error);
//     res
//       .status(500)
//       .json({ error: "Error en la solicitud a la API de TripAdvisor" });
//   }
// });



// // // Ruta para realizar la búsqueda de ubicación en la API de TripAdvisor
// // router.get("/searchLocation", async function (req, res, next) {
// //   try {
// //     const query = req.query.query || "search location";
// //     console.log("esto es", query);
// //     const locationApiUrl =
// //       "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation";

// //     const locationParams = {
// //       query: query,
// //       limit: 1,
// //     };

// //     // Realiza la solicitud a la API de TripAdvisor para la búsqueda de ubicación
// //     const locationPromise = axios.get(locationApiUrl, {
// //       params: locationParams,
// //       headers: {
// //         "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
// //         "X-RapidAPI-Key": "0c1ec7c873msh14f30084fdd46dcp1a4aaejsnaf3c1fa88581",
// //         "Content-Type": "application/json",
// //       },
// //     });

// //     // Realiza la solicitud para búsqueda de hoteles concurrentemente
// //     const [locationResponse] = await Promise.all([locationPromise]);
// //     console.log("esto es locationResponse", locationResponse);
// //     // Verifica si hay datos en la respuesta de la búsqueda de ubicación
// //     if (
// //       locationResponse.data &&
// //       locationResponse.data.data &&
// //       locationResponse.data.data.length > 0
// //     ) {
// //       // Extrae el geoId de la respuesta de la búsqueda de ubicación
// //       const resultObject = locationResponse.data.data[0].result_object;
// //       if (resultObject && resultObject.location_id) {
// //         const geoId = resultObject.location_id;

// //         // Redirige a la ruta de búsqueda de hoteles con el geoId
// //     res.redirect(`/api/searchHotels?geoId=${geoId}&checkIn=${req.query.checkIn}&checkOut=${req.query.checkOut}`);
   

// //         // Luego, utiliza el geoId para realizar la búsqueda de hoteles
// //         const hotelApiUrl =
// //           "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels";

// //         const checkIn = req.query.checkIn;
// //         const checkOut = req.query.checkOut;

// //         // Parámetros de la búsqueda de hoteles
// //         const hotelParams = {
// //           geoId: geoId,
// //           checkIn: checkIn,
// //           checkOut: checkOut,
// //         };

// //         // Realiza la solicitud a la API de TripAdvisor para la búsqueda de hoteles
// //         const hotelPromise = axios.get(hotelApiUrl, {
// //           params: hotelParams,
// //           headers: {
// //             "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
// //             "X-RapidAPI-Key":
// //               "0c1ec7c873msh14f30084fdd46dcp1a4aaejsnaf3c1fa88581",
// //             "Content-Type": "application/json",
// //           },
// //         });

// //         // Espera a que ambas solicitudes estén completas
// //         const [hotelResponse] = await Promise.all([hotelPromise]);

// //         // Envía la respuesta de la búsqueda de hoteles como respuesta a la solicitud HTTP
// //         res.json(hotelResponse.data);
// //         console.log("API Response from TripAdvisor:", locationResponse.data);
// //       } else {
// //         res
// //           .status(404)
// //           .send({ error: "Did not find result in that location." });
// //       }
// //     } else {
// //       res.status(404).send({ error: "Did not find result in that location." });
// //     }
// //   } catch (error) {
// //     console.error("Error en la solicitud a la API de TripAdvisor:", error);
// //     res
// //       .status(500)
// //       .json({ error: "Error en la solicitud a la API de TripAdvisor" });
// //   }
// // });

// module.exports = router;
