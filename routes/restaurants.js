var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/api/v1/restaurant/searchRestaurants", async (req, res) => {
    try {
      // Execute the SQL query to fetch data from the database
      const results = await db("SELECT * FROM restaurants");
      
      // Check if the results array is empty
      if (results.length === 0) {
        res.status(404).json({ message: "No restaurants found" });
      } else {
        // Send the data as a JSON response
        res.status(200).json(results);
      }
    } catch (err) {
      console.error("Error fetching restaurants:", err); // Log the error for debugging purposes
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

module.exports = router;
